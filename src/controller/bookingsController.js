const { v4: uuidv4 } = require("uuid");
const { insertBooking, getBookingsByUser, getBookingsById } = require("../model/bookingsModel");
const BookingsController = {
  insert: async (req, res, next) => {
    try {
      const id = uuidv4();
      const { tickets_id, users_id, passengers, title } = req.body;
      const data = {
        id,
        tickets_id,
        users_id,
        passengers,
        title,
      };
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null || value === "") {
          // Return an error response if any field is missing
          return res.status(400).json({ error: `${key} is missing or empty` });
        }
      }

      const response = await insertBooking(data);
      if (!response) {
        return res.status(401).json({ msg: "failed insert booking" });
      }
      return res.status(201).json({ msg: "success insert booking" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const id = req.payload.id;
      console.log(id);
      const response = await getBookingsByUser(id);
      if (!response) {
        return res.status(401).json({ msg: "failed get booking" });
      }
      console.log({response});
      return res
        .status(201)
        .json({ msg: "success get booking", data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(id);
      const response = await getBookingsById(id);
      if (!response) {
        return res.status(401).json({ msg: "failed get booking" });
      }
      // console.log({response});
      return res
        .status(201)
        .json({ msg: "success get booking", data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = BookingsController;
