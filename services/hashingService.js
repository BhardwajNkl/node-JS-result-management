const bcrypt = require('bcrypt');
const saltRounds = 10;

/* hashPassword function:
1. It takes a plain text and returns it's hash by using the bcrypt module.
*/
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

/* isPasswordMatching function
1. This function takes a plain text and a hash and returns true if the hash is actually the has of the given text.
*/
async function isPasswordMatching(plainTextPassword, storedHash) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, storedHash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = { hashPassword, isPasswordMatching };