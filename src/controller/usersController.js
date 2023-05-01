const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const {
  createUser,
  findUser,
  checkOTP,
  verifyUser,
} = require("../model/usersModel");
const mailer = require("../middleware/email");

const { generateAccessToken } = require("../helpers/generateToken");

const UsersController = {
  registerUser: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.fullname) {
        next(
          res
            .status(404)
            .json({ status: 404, message: `Email / Password / Name missing` })
        );
        return;
      }
      let role = req.params.role;
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (users) {
        next(
          res.status(401).json({
            status: 404,
            message: `Email is registered, you may login`,
          })
        );
        return;
      }
      let id = uuidv4();
      let otp = Math.floor(100000 + Math.random() * 900000);
      let password = await argon2.hash(req.body.password);
      let data = {
        id,
        fullname: req.body.fullname,
        email: req.body.email,
        password: password,
        phone: req.body.phone,
        role,
        otp,
      };
      const result = createUser(data);
      if (result) {
        return res.status(201).json({
          status: 200,
          message: `Register Success`,
          data: data,
        });
      }
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },

  getOTPbyEmail: async (req, res, next) => {
    try {
      let email = req.body.email;
      if (!email) {
        res.status(404).json({ msg: "Please input email" });
      }
      let {
        rows: [users],
      } = await findUser(email);
      if (!users) {
        res
          .status(400)
          .json({ msg: `Failed get user. email ${email} doesn't exist` });
      }
      const data = {
        otp: users.otp,
        email: email,
      };
      try {
        let sendEmail = mailer(users.email, users.otp);
        if (sendEmail == "email not send") {
          res
            .status(404)
            .json({ status: 404, message: `Failed to send email` });
        } else {
          res
            .status(200)
            .json({ msg: "Email sent, check your email", data: data });
        }
      } catch (error) {
        res.status(400).json({
          where: `Error sending otp`,
          msg: error.message,
          data: error.data,
        });
      }
      // console.log(response);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },

  verifyEmailOTP: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.otp) {
        res
          .status(404)
          .json({ status: 404, message: `Please fill your email and OTP` });
      } else {
        let data = {
          email: req.body.email,
          otp: req.body.otp,
        };
        let result = await checkOTP(data);
        if (result.rows.length === 0) {
          res.status(404).json({
            status: 404,
            message: `OTP is incorrect, please check again`,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: `Confirm OTP success`,
            data: result.rows,
          });
        }
      }
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  },

  otpUser: async (req, res, next) => {
    try {
      let email = req.body.email;
      let otp = req.body.otp;

      if (!email || !otp) {
        return res
          .status(404)
          .json({ status: 404, message: `Please fill your email and OTP` });
      }

      let {
        rows: [users],
      } = await findUser(email);
      let id = users.id;
      if (!users) {
        return res
          .status(400)
          .json({ msg: `Failed get user. email ${email} doesn't exist` });
      }

      console.log(users.otp, otp);
      if (users.otp == otp) {
        let verif = await verifyUser(id);
        if (verif) {
          return res.status(200).json({
            status: 200,
            message: `User verified successfully`,
          });
        } else {
          return res.status(404).json({
            status: 404,
            message: `User verification failed`,
          });
        }
      } else {
        return res.status(404).json({
          status: 404,
          message: `Confirm OTP success`,
          data: result.rows,
        });
      }
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },

  login: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(404).json({
          status: 404,
          message: `Please fill your email and password`,
        });
      }

      //get users to check the data
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (!users) {
        return res
          .status(404)
          .json({ status: 404, message: `Email not found` });
      }
      let verifyPassword = await argon2.verify(
        users.password,
        req.body.password
      );
      if (!verifyPassword) {
        return res
          .status(404)
          .json({ status: 404, message: `Login failed, wrong password` });
      }
      let data = users;
      delete data.password;
      let accessToken = generateAccessToken(data);

      users.accessToken = accessToken;
      delete users.password;
      delete users.otp;
      if (!users.verified) {
        return res.status(404).json({
          status: 404,
          message: `Login failed, please verify your account`,
        });
      }
      return res.status(200).json({
        status: 200,
        message: `Login successful, welcome ${users.fullname}`,
        data: users,
      });
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  },
};

module.exports = UsersController;
