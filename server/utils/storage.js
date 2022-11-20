const keys = require("../config/keys");
const cloudinary = require("cloudinary").v2;

exports.bucketUpload = async (imagePath) => {
	let imageUrl = "";
	let imageKey = "";

	if (imagePath) {
		cloudinary.config({
			cloud_name: keys.cloudinary.cloud_name,
			api_key: keys.cloudinary.api_key,
			api_secret: keys.cloudinary.api_secret,
		});

		const params = {
			folder: "koraneaza_farms_images",
		};

		try {
			const bucketUpload = await cloudinary.uploader.upload(imagePath, params);
			imageUrl = bucketUpload.secure_url;
			imageKey = bucketUpload.public_id;
		} catch (error) {
			console.log("Error uploading to cloudinary bucket =>", error);
		}
	}

	return { imageUrl, imageKey };
};
