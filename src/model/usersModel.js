const Pool = require("./../config/dbconfig");

const createUser = (data) => {
  const { id, fullname, email, password, phone, role, otp } = data;
  const query = `INSERT INTO users(id, fullname, email, password, role, otp) 
    VALUES('${id}','${fullname}', '${email}','${password}','${role}','${otp}')`;
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

const findUser = (email) => {
  let qry = `SELECT * FROM users WHERE email='${email}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findUserById = (id) => {
  let qry = `SELECT * FROM users WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const checkOTP = (data) => {
  const { email, otp } = data;
  let qry = `SELECT * FROM users WHERE email='${email}' AND otp = '${otp}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verifyUser = (id) => {
  let qry = `UPDATE users SET verified = true WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const changePassword = (data) => {
  const { email, password } = data;
  let qry = `UPDATE users SET password = '${password}' WHERE email='${email}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const updateUser = (id, data) => {
  let { fullname, email, photo, phone, city, country, postalcode } = data;
  let qry = `UPDATE users SET fullname='${fullname}',email='${email}',photo='${photo}',phone='${phone}', city='${city}',country='${country}', postalcode='${postalcode}' WHERE id='${id}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  checkOTP,
  verifyUser,
  changePassword,
  updateUser,
};
