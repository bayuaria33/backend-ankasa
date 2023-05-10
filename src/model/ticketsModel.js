const Pool = require("./../config/dbconfig");

const insertTicket = (data) => {
  const {
    id,
    airlines_id,
    departure_city,
    arrival_city,
    departure_country,
    arrival_country,
    price,
    departure_date,
    arrival_date,
    transit,
    facilities,
    flight_class,
    gate,
    terminal,
  } = data;
  const query = `INSERT INTO tickets(id, airlines_id,  departure_city, arrival_city, departure_country , arrival_country , price , departure_date , arrival_date, transit , facilities , flight_class, gate, terminal, created_at) 
  VALUES('${id}','${airlines_id}','${departure_city}','${arrival_city}','${departure_country}','${arrival_country}','${price}','${departure_date}', '${arrival_date}', '${transit}','${facilities}', '${flight_class}',  '${gate}',  '${terminal}', NOW()::timestamp)`;
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

const updateTicket = (data) => {
  const {
    id,
    airlines_id,
    departure_city,
    arrival_city,
    departure_country,
    arrival_country,
    price,
    departure_date,
    arrival_date,
    transit,
    facilities,
    flight_class,
    gate,
    terminal,
  } = data;
  const query = `UPDATE tickets SET airlines_id='${airlines_id}', departure_city='${departure_city}' , arrival_city='${arrival_city}', departure_country='${departure_country}',arrival_country='${arrival_country}',price='${price}',departure_date='${departure_date}',arrival_date='${arrival_date}',transit='${transit}',facilities='${facilities}' WHERE id='${id}' `;
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

const getAllTickets = (data) => {
  let { searchBy, search, sortBy, sort, limit, offset } = data;
  const query = `SELECT t.id, air.airline_name as airline, air.photo as airline_photo, t.departure_city, t.departure_country, t.arrival_city, t.arrival_country, t.departure_date, t.arrival_date, t.transit, t.facilities, t.price, t.gate, t.terminal, t.flight_class, 
  to_char( t.departure_date, 'HH24:MI' ) AS departure_time,
  to_char( t.arrival_date, 'HH24:MI' ) AS arrival_time
    from tickets t
    INNER JOIN airlines as air ON t.airlines_id = air.id
    WHERE t.deleted_at IS NULL AND ${searchBy} ILIKE '%${search}%' ORDER BY t.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
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

const getTicketFilter = (data) => {
  let {
    sortBy,
    sort,
    limit,
    offset,
    t1,
    t2,
    p1,
    p2,
    transit,
    facilities,
    airlines_id,
    search,
  } = data;
  const query = `SELECT t.id, air.airline_name as airline, air.photo as airline_photo, t.departure_city, t.departure_country, t.arrival_city, t.arrival_country, t.departure_date, t.arrival_date, t.transit, t.facilities, t.price, t.gate, t.terminal, t.flight_class, 
  to_char( t.departure_date, 'HH24:MI' ) AS departure_time,
  to_char( t.arrival_date, 'HH24:MI' ) AS arrival_time
    from tickets t
    INNER JOIN airlines as air ON t.airlines_id = air.id
    WHERE (t.arrival_country ILIKE '%${search}%' OR t.arrival_city ILIKE '%${search}%') 
    AND EXTRACT(HOUR FROM departure_date) >= ${t1} AND EXTRACT(HOUR FROM departure_date) < ${t2} 
    AND t.price >= ${p1} AND t.price < ${p2} 
    AND t.transit ILIKE '%${transit}%'
    AND t.facilities > '${facilities}'
    AND t.airlines_id ILIKE '%${airlines_id}%'
    AND t.deleted_at IS NULL
    ORDER BY t.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
  console.log(query);
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

const getTicketById = (id) => {
  const query = `SELECT t.id, air.airline_name as airline, air.photo as airline_photo, t.departure_city, t.departure_country, t.arrival_city, t.arrival_country, t.departure_date, t.arrival_date, t.transit, t.facilities, t.price, t.gate, t.terminal, t.flight_class, 
  to_char( t.departure_date, 'HH24:MI' ) AS departure_time,
  to_char( t.arrival_date, 'HH24:MI' ) AS arrival_time
    from tickets t
    INNER JOIN airlines as air ON t.airlines_id = air.id
    WHERE t.id = '${id}' AND t.deleted_at IS NULL`;
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
const deleteTicket = (id) => {
  const query = `UPDATE ticket SET deleted_at = NOW()::timestamp WHERE id='${id}'`;
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
  insertTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  getTicketFilter,
};
