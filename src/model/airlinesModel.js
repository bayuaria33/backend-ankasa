const Pool = require("./../config/dbconfig");

const getAllAirlines = () => {
  const query = `SELECT * from airlines`;
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

const getAirlinesById = (id) => {
    const query = `SELECT * from airlines where id='${id}'`;
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

const insertAirline = (data) => {
  const { id, airline_name, photo } = data;
  const query = `INSERT INTO airlines(id, airline_name,photo) 
      VALUES('${id}','${airline_name}','${photo}')`;
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

const updateAirline = (data) => {
  const { id, airline_name, photo } = data;
  const query = `UPDATE airlines SET airline_name='${airline_name}', photo='${photo}' where id='${id}'`;
  // console.log(query);
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
  getAllAirlines,
  getAirlinesById,
  insertAirline,
  updateAirline,
};
