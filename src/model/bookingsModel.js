const Pool = require("./../config/dbconfig");
const insertBooking = (data) => {
  const { id, tickets_id, users_id, passengers, title } = data;
  const query = `INSERT INTO bookings(id, tickets_id, users_id, passengers, title, created_at) 
    VALUES('${id}','${tickets_id}','${users_id}','${passengers}', '${title}',NOW()::timestamp)`;
  return new Promise((resolve, reject) =>
    Pool.query(query, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

//TODO
const getBookingsByUser = (id) => {
  const query = `SELECT bookings.id , airlines.airline_name, airlines.photo, tickets.departure_country, tickets.arrival_country, tickets.departure_date, tickets.arrival_date
  FROM bookings
  JOIN tickets ON bookings.tickets_id = tickets.id
  JOIN airlines ON tickets.airlines_id = airlines.id WHERE bookings.users_id = '${id}'`;
  return new Promise((resolve, reject) =>
  Pool.query(query, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  })
);
};

const getBookingsById = (id) => {
  const query = `SELECT bookings.id , airlines.airline_name, airlines.photo, tickets.departure_country, tickets.arrival_country, tickets.departure_date, tickets.arrival_date
  FROM bookings
  JOIN tickets ON bookings.tickets_id = tickets.id
  JOIN airlines ON tickets.airlines_id = airlines.id WHERE bookings.id = '${id}'`;
  return new Promise((resolve, reject) =>
  Pool.query(query, (err, result) => {
    if (!err) {
      resolve(result);
    } else {
      reject(err);
    }
  })
);
};

module.exports = {
  insertBooking,
  getBookingsByUser,
  getBookingsById,
};