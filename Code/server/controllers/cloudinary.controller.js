const cloudinary = require("cloudinary");

// CLOUDINARY_CLOUD_NAME = diadnflif;
// CLOUDINARY_API_KEY = 456768945569489;
// CLOUDINARY_API_SECRET = OltVxAbEsIzf0Vo69FMV9WFGY2M;

// config
cloudinary.config({
  cloud_name: "diadnflif",
  api_key: "456768945569489",
  api_secret: "OltVxAbEsIzf0Vo69FMV9WFGY2M",
});

// req.files.file.path
exports.upload = async (req, res) => {
  console.log("cloudinary controller mein upload kai pass request agai  hai");
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });
    // console.log("cloudinary controller mein error hai");
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
    // console.log("cloudinary controller mein  response kai baderror hai");
  } catch (error) {
    console.log(error);
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("deleted image");
  });
};
