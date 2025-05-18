'use strict';

const { db } = require('../db/index.js');

//put in contact 2 users or user-teacher
exports.createUidsRelationshipDAO = (uid1, uid2, type) => {
    return new Promise((resolve, reject) => {//type = 0  for 2 user type = 1 -> uid1 student of uid2 
      const sql = 'INSERT INTO relationship (uid1, uid2, type) VALUES (?, ?, ?)';
      db.run(sql, [uid1, uid2, type] , function (err) {
        if (err) {
            reject(err);
        } else {
            if (this.changes === 0) {
                resolve();
            } else {
                resolve({ message: 'Relationship created successfully.' });
            }
        }
        });
    });
};

//delete contact between 2 users or user-teacher
exports.deleteUidsRelationshipDAO = (uid1, uid2) => {
    return new Promise((resolve, reject) => {//type = 0  for 2 user type = 1 -> uid1 student of uid2 
      const sql = 'DELETE FROM relationship WHERE ( uid1 = ? AND uid2 = ? ) OR ( uid1 = ? AND uid2 = ? )';
      db.run(sql, [uid1, uid2, uid2, uid1] , function (err) {
        if (err) {
            reject(err);
        } else {
            if (this.changes === 0) {
                resolve();
            } else {
                resolve({ message: 'Relationship deleted successfully.' });
            }
        }
        });
    });
};

exports.getRelationshipDAO = (uid1, uid2) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM relationship WHERE type = 0 AND ( uid1 = ? AND uid2 = ? ) OR ( uid1 = ? AND uid2 = ? )';
      db.all(sql, [uid1, uid2, uid2, uid1], (err, u) => {
        if (err)
          reject(err);
        if (u == undefined)
          resolve({error: 'Relationship not found.'}); 
        else {
          resolve(u);
        }
      });
    });
};

//get contact between 2 users or user-teacher
exports.getUidRelationshipDAO = (uid) => {
    console.log(uid);
    return new Promise((resolve, reject) => {//type = 0  for 2 user type = 1 -> uid1 student of uid2 
      const sql = 'SELECT * FROM relationship WHERE uid1 = ? OR uid2 = ?';
      db.all(sql, [uid, uid], (err, u) => {
        if (err)
          reject(err);
        if (u == undefined)
          resolve({error: 'Relationship not found.'}); 
        else {
          resolve(u);
        }
      });
    });
};

exports.getUserPairsDAO = (userId) => {
  return new Promise((resolve, reject) => {//type = 0  for 2 user type = 1 -> uid1 student of uid2 
    const sql = 'SELECT * FROM relationship WHERE type = 1 AND (uid1 = ? OR uid2 = ?);';
    db.all(sql, [userId, userId], (err, rows) => {
      if (err)
        reject(err);
      if (rows == undefined || rows.length == 0)
        resolve({error: 'Relationship not found.'}); 
      else {
        const userIds = rows.map(row => row.uid1 == userId ? row.uid2 : row.uid1);
        const usersSql = 'SELECT * FROM user WHERE id IN (?)';
        db.all(usersSql, userIds, (err, u) => {
          if (err)
            reject(err);
          if (u == undefined)
            resolve({error: 'Relationship not found.'}); 
          else {
            resolve(u);
          }
        });
      }
    });
  });
};