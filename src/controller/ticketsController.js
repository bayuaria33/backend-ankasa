const { v4: uuidv4 } = require("uuid");
const {
  insertTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../model/ticketsModel");

const TicketsController = {
  insert: async (req, res, next) => {
    try {
      const id = uuidv4();
      const data = {
        id,
        airlines_id: req.body.airlines_id,
        departure_city: req.body.departure_city,
        arrival_city: req.body.arrival_city,
        departure_country: req.body.departure_country,
        arrival_country: req.body.arrival_country,
        departure_date: req.body.departure_date,
        arrival_date: req.body.arrival_date,
        transit: req.body.transit,
        facilities: req.body.facilities,
        price: req.body.price,
      };

      // Check if any field is undefined or null
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null || value === "") {
          // Return an error response if any field is missing
          return res.status(400).json({ error: `${key} is missing or empty` });
        }
      }
      const response = await insertTicket(data);
      if (!response) {
        return res.status(401).json({ msg: "failed insert ticket" });
      }
      return res.status(201).json({ msg: "success insert ticket" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      let {
        rows: [ticket],
      } = await getTicketById(id);
      const data = {
        id,
        airlines_id: req.body.airlines_id || ticket.airlines_id,
        departure_city: req.body.departure_city || ticket.departure_city,
        arrival_city: req.body.arrival_city || ticket.arrival_city,
        departure_country:
          req.body.departure_country || ticket.departure_country,
        arrival_country: req.body.arrival_country || ticket.arrival_country,
        departure_date: req.body.departure_date || ticket.departure_date,
        arrival_date: req.body.arrival_date || ticket.arrival_date,
        transit: req.body.transit || ticket.airlines_id,
        facilities: req.body.facilities || ticket.airlines_id,
        price: req.body.price || ticket.airlines_id,
      };
      // Check if any field is undefined or null
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null || value === "") {
          // Return an error response if any field is missing
          return res.status(400).json({ error: `${key} is missing or empty` });
        }
      }
      const response = await updateTicket(data);
      if (!response) {
        return res.status(401).json({ msg: "failed update ticket" });
      }
      return res.status(201).json({ msg: "success update ticket" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getAll: async (req, res, next) => {
    try {
      const response = await getAllTickets();
      return res
        .status(200)
        .json({ msg: `Success get all Tickets`, data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message, data: error.data });
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await getTicketById(id);
      if (!response) {
        return res
          .status(400)
          .json({ msg: `ticket by id of ${id} does not exist` });
      }
      return res
        .status(200)
        .json({ msg: `Success get all Tickets`, data: response.rows });
    } catch (error) {
      return res.status(400).json({ msg: error.message, data: error.data });
    }
  },
  deleteTicket: async (req, res, next) => {
    try {
      let id = req.params.id;
      let {
        rows: [ticket],
      } = await getTicketById(id);
      if (!ticket) {
        return res
          .status(400)
          .json({ msg: `ticket by id of ${id} does not exist` });
      }

      let response = await deleteTicket(id);
      if (!response) {
        return res.status(400).json({ msg: `delete ticket failed` });
      }
      return res.status(200).json({ msg: `success delete ticket` });
    } catch (error) {
      return res.status(400).json({ msg: error.message, data: error.data });
    }
  },
};

module.exports = TicketsController;
