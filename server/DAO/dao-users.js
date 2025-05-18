'use strict';

/* Data Access Object (DAO) module for accessing users data */

const { db } = require('../db/index.js');
const crypto = require('crypto');

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email=?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      }
      else {
        const user = { id: row.id, username: row.email, name: row.name };

        // Check the hashes with an async call, this operation may be CPU-intensive (and we don't want to block the server)
        crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) { // WARN: it is 64 and not 32 (as in the week example) in the DB
          if (err) reject(err);
          if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) // WARN: it is hash and not password (as in the week example) in the DB
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};

exports.getUserByIdDAO = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        // By default, the local strategy looks for "username": 
        // for simplicity, instead of using "email", we create an object with that property.
        resolve(row);
      }
    });
  });
};

exports.getUsersDAO = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

exports.editUserDAO = (id, data) => {
  return new Promise((resolve, reject) => {
      const sql = `UPDATE user SET name = ?, sex = ?, university = ?, email = ?, degree = ?, major = ?, course = ?, language = ?, phoneNumber = ? WHERE id = ?`;

      const { name, sex, university, email, degree, major, course, language, phoneNumber } = data;

      db.run(sql, [name, sex, university, email, degree, major, course, language, phoneNumber, id], function(err) {
          if (err) {
              reject(err);
          } else {
              if (this.changes === 0) {
                  resolve();
              } else {
                  resolve({ message: 'User updated successfully.' });
              }
          }
      });
  });
};