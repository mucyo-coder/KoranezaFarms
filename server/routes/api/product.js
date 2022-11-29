const express = require("express");
const router = express.Router();
const multer = require("multer");
const Mongoose = require("mongoose");

// Bring in Models & Utils
const Product = require("../../models/product");
const Category = require("../../models/category");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const checkAuth = require("../../utils/auth");
const { bucketUpload } = require("../../utils/storage");
const {
	getStoreProductsQuery,
	getStoreProductsWishListQuery,
} = require("../../utils/queries");
const category = require("../../models/category");

const storage = multer.diskStorage({});
const upload = multer({ storage });

// fetch product slug api
router.get("/item/:slug", async (req, res) => {
	try {
		const slug = req.params.slug;

		const productDoc = await Product.findOne({ slug, isActive: true }).populate(
			{
				path: "category",
				select: "name isActive slug",
			},
		);

		const hasNoCategory =
			productDoc?.category === null || productDoc?.category?.isActive === false;

		if (!productDoc || hasNoCategory) {
			return res.status(404).json({
				message: "No product found.",
			});
		}

		res.status(200).json({
			product: productDoc,
		});
	} catch (error) {
		res.status(400).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

// fetch product name search api
router.get("/list/search/:name", async (req, res) => {
	try {
		const name = req.params.name;

		const productDoc = await Product.find(
			{ name: { $regex: new RegExp(name), $options: "is" }, isActive: true },
			{ name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 },
		);

		if (productDoc.length < 0) {
			return res.status(404).json({
				message: "No product found.",
			});
		}

		res.status(200).json({
			products: productDoc,
		});
	} catch (error) {
		res.status(400).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

// fetch store products by advanced filters api
router.get("/list", async (req, res) => {
	try {
		let {
			sortOrder,
			rating,
			max,
			min,
			category,
			page = 1,
			limit = 10,
		} = req.query;
		sortOrder = JSON.parse(sortOrder);

		const categoryFilter = category ? { category } : {};

		const userDoc = await checkAuth(req);
		const categoryDoc = await Category.findOne({
			slug: categoryFilter.category,
			isActive: true,
		});

		let queries = [];

		if (categoryDoc && categoryFilter !== category) {
			queries.push({
				$match: {
					"category._id": Mongoose.Types.ObjectId(categoryDoc._id),
				},
			});
		}

		const basicQuery = getStoreProductsQuery(min, max, rating, queries);

		let products = null;
		const productsCount = await Product.aggregate(basicQuery);
		const count = productsCount.length;
		const size = count > limit ? page - 1 : 0;
		const currentPage = count > limit ? Number(page) : 1;

		// paginate query
		const paginateQuery = [
			{ $sort: sortOrder },
			{ $skip: size * limit },
			{ $limit: limit * 1 },
		];

		if (userDoc) {
			const wishListQuery = getStoreProductsWishListQuery(userDoc.id).concat(
				basicQuery,
			);
			products = await Product.aggregate(wishListQuery.concat(paginateQuery));
		} else {
			products = await Product.aggregate(basicQuery.concat(paginateQuery));
		}

		res.status(200).json({
			products,
			totalPages: Math.ceil(count / limit),
			currentPage,
			count,
		});
	} catch (error) {
		console.log("error", error);
		res.status(400).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

router.get("/list/select", async (_req, res) => {
	try {
		const products = await Product.find({}, "name");

		res.status(200).json({
			products,
		});
	} catch (error) {
		res.status(400).json({
			error: "Your request could not be processed. Please try again.",
		});
	}
});

// add product api
router.post(
	"/add",
	auth,
	role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
	upload.single("image"),
	async (req, res) => {
		try {
			const sku = req.body.sku;
			const name = req.body.name;
			const description = req.body.description;
			const quantity = req.body.quantity;
			const price = req.body.price;
			const taxable = req.body.taxable;
			const isActive = req.body.isActive;
			const category = req.body.category;
			const imagePath = req.file.path;

			if (!sku) {
				return res.status(400).json({ error: "You must enter sku." });
			}

			if (!(description && name)) {
				return res
					.status(400)
					.json({ error: "You must enter description & name." });
			}

			if (!quantity) {
				return res.status(400).json({ error: "You must enter a quantity." });
			}

			if (!price) {
				return res.status(400).json({ error: "You must enter a price." });
			}

			const foundProduct = await Product.findOne({ sku });

			if (foundProduct) {
				return res.status(400).json({ error: "This sku is already in use." });
			}

			const { imageUrl, imageKey } = await bucketUpload(imagePath);

			const product = new Product({
				sku,
				name,
				description,
				quantity,
				price,
				taxable,
				isActive,
				category,
				imageUrl,
				imageKey,
			});

			const savedProduct = await product.save();

			res.status(200).json({
				success: true,
				message: "Product has been added successfully!",
				product: savedProduct,
			});
		} catch (error) {
			return res.status(400).json({
				error: "Your request could not be processed. Please try again.",
			});
		}
	},
);

// fetch product api
router.get(
	"/:id",
	auth,
	role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
	async (req, res) => {
		try {
			const productId = req.params.id;

			let productDoc = null;
			//Here they first check the categories created by the seller and then after get the products from that specific category of the seller

			if (req.user.merchant) {
				const categories = await category
					.find({
						merchant: req.user.merchant,
					})
					.populate("merchant", "_id");

				const categoryId = categories[0]["_id"];

				productDoc = await Product.findOne({ _id: productId })
					.populate({
						path: "category",
						select: "name",
					})
					.where("category", categoryId);
			} else {
				productDoc = await Product.findOne({ _id: productId }).populate({
					path: "category",
					select: "name",
				});
			}

			if (!productDoc) {
				return res.status(404).json({
					message: "No product found.",
				});
			}

			res.status(200).json({
				product: productDoc,
			});
		} catch (error) {
			res.status(400).json({
				error: "Your request could not be processed. Please try again.",
			});
		}
	},
);

router.put(
	"/:id",
	auth,
	role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
	async (req, res) => {
		try {
			const productId = req.params.id;
			const update = req.body.product;
			const query = { _id: productId };
			const { sku, slug } = req.body.product;

			const foundProduct = await Product.findOne({
				$or: [{ slug }, { sku }],
			});

			if (foundProduct && foundProduct._id !== productId) {
				return res
					.status(400)
					.json({ error: "Sku or slug is already in use." });
			}

			await Product.findOneAndUpdate(query, update, {
				new: true,
			});

			res.status(200).json({
				success: true,
				message: "Product has been updated successfully!",
			});
		} catch (error) {
			res.status(400).json({
				error: "Your request could not be processed. Please try again.",
			});
		}
	},
);

router.put(
	"/:id/active",
	auth,
	role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
	async (req, res) => {
		try {
			const productId = req.params.id;
			const update = req.body.product;
			const query = { _id: productId };

			await Product.findOneAndUpdate(query, update, {
				new: true,
			});

			res.status(200).json({
				success: true,
				message: "Product has been updated successfully!",
			});
		} catch (error) {
			res.status(400).json({
				error: "Your request could not be processed. Please try again.",
			});
		}
	},
);

router.delete(
	"/delete/:id",
	auth,
	role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
	async (req, res) => {
		try {
			const product = await Product.deleteOne({ _id: req.params.id });

			res.status(200).json({
				success: true,
				message: "Product has been deleted successfully!",
				product,
			});
		} catch (error) {
			res.status(400).json({
				error: "Your request could not be processed. Please try again.",
			});
		}
	},
);

module.exports = router;
