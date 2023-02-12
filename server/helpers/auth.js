import bcrypt from "bcrypt";

// Encrypt password when user register
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        // encrypt password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          // Return successfully hashed password
          resolve(hash);
        });
      }
    });
  });
};

// Compare password when user login
export const comparePassword = (loginPassword, hashedPassword) => {
  return bcrypt.compare(loginPassword, hashedPassword); // true or false
};
