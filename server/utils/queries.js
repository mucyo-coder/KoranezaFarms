const Mongoose = require("mongoose");

exports.getStoreProductsQuery = (min, max, rating, queries = []) => {
	rating = Number(rating || 0);
	max = Number(max || Infinity);
	min = Number(min || 0);

	const basicQuery = [
		{
			$lookup: {
				from: "categories",
				localField: "category",
				foreignField: "_id",
				as: "category",
			},
		},
		{
			$unwind: "$category",
		},
		{
			$match: {
				"category.isActive": true,
			},
		},
		{
			$lookup: {
				from: "reviews",
				localField: "_id",
				foreignField: "product",
				as: "reviews",
			},
		},
		{
			$addFields: {
				totalRatings: { $sum: "$reviews.rating" },
				totalReviews: { $size: "$reviews" },
				averageRating: {
					$cond: [
						{ $eq: [{ $size: "$reviews" }, 0] },
						0,
						{ $divide: [{ $sum: "$reviews.rating" }, { $size: "$reviews" }] },
					],
				},
			},
		},
		{
			$match: {
				isActive: true,
				price: { $gte: min, $lte: max },
				averageRating: { $gte: rating },
			},
		},
		...queries,
		{
			$project: {
				category: 0,
				reviews: 0,
			},
		},
	];

	return basicQuery;
};

exports.getStoreProductsWishListQuery = (userId) => {
	const wishListQuery = [
		{
			$lookup: {
				from: "wishlists",
				let: { product: "$_id" },
				pipeline: [
					{
						$match: {
							$and: [
								{ $expr: { $eq: ["$$product", "$product"] } },
								{ user: new Mongoose.Types.ObjectId(userId) },
							],
						},
					},
				],
				as: "isLiked",
			},
		},
		{
			$addFields: {
				isLiked: { $arrayElemAt: ["$isLiked.isLiked", 0] },
			},
		},
	];

	return wishListQuery;
};
