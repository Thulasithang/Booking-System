// const pool = require("../dbConnection");
// const { pool, getClient } = require("../dbConnection");
const UserAccount = require("../models/userAccount");
const UserLoginInfo = require("../models/userLoginInfo");
const sequelize = require("../dbConfig");

const getUserByEmail = async (email) => {
  try {
    const result = await UserLoginInfo.findOne({ where: { email: email } });
    if (result) {
      console.log("result: ", result.dataValues);
      return result.dataValues; // User exists
    } else {
      console.log("result from else ", result);
      return null; // User does not exist
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-throw the error for the calling function to handle
  }
};

// const addNewUser = async (newUser, callback) => {
//   const poolClient = await pool.connect();
//   try {
//     await poolClient.query("BEGIN");
//     const createdUser = await poolClient.query(
//       `INSERT INTO user_account (user_name, gender, date_of_birth, mobile, role_id) VALUES ('${newUser.username}', '${newUser.gender}', '${newUser.date_of_birth}', '${newUser.mobile}', '${newUser.role_id}') RETURNING user_id`
//     );
//     console.log(
//       `INSERT INTO user_account (user_name, gender, date_of_birth, mobile, role_id) VALUES ('${newUser.username}', '${newUser.gender}', '${newUser.date_of_birth}', '${newUser.mobile}', '${newUser.role_id}') RETURNING user_id`
//     );

//     // Get the user_id of the newly created user. this will be used as the FK in login_info table
//     const userId = createdUser.rows[0].user_id;

//     await poolClient.query(
//       `INSERT INTO user_login_info (user_id, email, password_hash, password_salt) VALUES ('${userId}', '${newUser.email}', '${newUser.passwordHash}', '${newUser.passwordSalt}')`
//     );

//     await poolClient.query("COMMIT");
//     callback(null, createdUser.rows[0]);
//   } catch (err) {
//     await poolClient.query("ROLLBACK");
//     callback(err, null);
//   } finally {
//     poolClient.release();
//   }
// };

const addNewUser = async (newUser, callback) => {
  const t = await sequelize.transaction();
  console.log("newUser in addNewUser: ", newUser);
  try {
    const createdNewUser = await UserAccount.create(
      {
        user_name: newUser.username,
        gender: newUser.gender,
        date_of_birth: newUser.date_of_birth,
        mobile: newUser.mobile,
        role_id: newUser.role_id,
      },
      { transaction: t }
    );

    const userId = createdNewUser.user_id;
    console.log("userId: ", userId);
    await UserLoginInfo.create(
      {
        user_id: userId,
        email: newUser.email,
        password_hash: newUser.passwordHash,
        password_salt: newUser.passwordSalt,
      },
      { transaction: t }
    );
    console.log("createdNewUser: ", createdNewUser);
    await t.commit();

    callback(null, createdNewUser);
  } catch (error) {
    await t.rollback();

    callback(err, null);
  }
};

const updateLastLogin = async (userId, callback) => {
  await UserLoginInfo.update(
    { last_login: new Date() },
    { where: { user_id: userId }, returning: true, plain: true }
  )
    .then(async () => {
      const loggedInUser = await UserAccount.findOne({ where: { user_id: userId } });
      callback(null, loggedInUser.dataValues);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = { getUserByEmail, addNewUser, updateLastLogin };
