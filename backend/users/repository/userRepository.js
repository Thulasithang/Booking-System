// const pool = require("../dbConnection");
const { pool, getClient } = require("../dbConnection");

const getUserByEmail = async (email) => {
  const client = getClient();

  try {
    await client.connect();

    const result = await client.query(
      `SELECT * FROM user_login_info WHERE email = $1`,
      [email]
    );
      console.log(`SELECT * FROM user_login_info WHERE email = $1`,
      [email])
    if (result.rows.length > 0) {
      return true; // User exists
    } else {
      return false; // User does not exist
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-throw the error for the calling function to handle
  } finally {
    await client.end();
  }
};

const addNewUser = async (newUser, callback) => {
  const poolClient = await pool.connect();
  try {
    await poolClient.query("BEGIN");
    const createdUser = await poolClient.query(
      `INSERT INTO user_account (user_name, gender, date_of_birth, mobile, role_id) VALUES ('${newUser.username}', '${newUser.gender}', '${newUser.date_of_birth}', '${newUser.mobile}', '${newUser.role_id}') RETURNING user_id`
    );
    const userId = createdUser.rows[0].user_id;

    await poolClient.query(
      `INSERT INTO user_login_info (user_id, email, password_hash, password_salt) VALUES ('${userId}', '${newUser.email}', '${newUser.passwordHash}', '${newUser.passwordSalt}')`
    );

    await poolClient.query("COMMIT");
    callback(null, createdUser.rows[0]);    

  } catch (err) {
    await poolClient.query("ROLLBACK");
    callback(err, null);
  } finally {
    poolClient.release();
  }
};

module.exports = { getUserByEmail, addNewUser };

// `INSERT INTO user_login_info (email, password_hash, password_salt ) VALUES ('${newUser.email}', '${newUser.passwordHash}', '${newUser.passwordSalt}')`,
