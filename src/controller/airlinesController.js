const { v4: uuidv4 } = require("uuid");
const {
  getAllAirlines,
  getAirlinesById,
  insertAirline,
  updateAirline,
} = require("../model/airlinesModel");
const cloudinary = require("../config/uploadconfig");

const AirlineController = {
  getAll: async (req, res, next) => {
    try {
      const response = await getAllAirlines();
      return res
        .status(200)
        .json({ msg: `Success get all airlines`, data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message, data: error.data });
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await getAirlinesById(id);
      return res
        .status(200)
        .json({ msg: `Success get data airline ${id}`, data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message, data: error.data });
    }
  },

  insert: async (req, res, next) => {
    try {
      const id = uuidv4();
      const imageUrl = await cloudinary.uploader.upload(req.file.path, {
        folder: "ankasa_images",
      });
      const data = {
        id,
        airline_name: req.body.airline_name,
        photo: imageUrl.secure_url,
      };
      // console.log({ data });
      const response = await insertAirline(data);
      if (!response) {
        return res.status(401).json({ msg: "failed insert airline" });
      }
      return res.status(201).json({ msg: "success insert airline" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      let {
        rows: [airline],
      } = await getAirlinesById(id);
      // console.log({airline});
      if (!req.file) {
        req.body.photo = airline.photo;
      } else {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folder: "ankasa_images",
        });
        // console.log(imageUrl);
        req.body.photo = imageUrl;
      }
      const data = {
        id,
        airline_name: req.body.airline_name || airline.airline_name,
        photo: req.body.photo || airline.photo,
      };
      // console.log({data});
      const response = await updateAirline(data);
      if (!response) {
        return res.status(401).json({ msg: "failed update airline" });
      }
      return res.status(201).json({ msg: "success update airline" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
};
module.exports = AirlineController;
