'use strict';

const { db } = require('../db/index.js');

exports.putMentorDAO = (uid, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO mentor (uid, mentorCourses, year ) VALUES (?, ?, ?)';
      const { courses, year } = data;
      db.run(sql, [uid, courses, year] , function (err) {
        if (err) {
            reject(err);
        } else {
            if (this.changes === 0) {
                resolve();
            } else {
                resolve({ message: 'Mentor added successfully.' });
            }
        }
        });
    });
};


exports.getMentorsDAO = (userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT M.*, U.* FROM MENTOR M JOIN USER U ON M.uid = U.id';
      db.all(sql, [], (err, rows) => {
        if (err)
          reject(err);
        else if (rows === undefined)
          resolve({ error: 'Mentor not found.' });
        else {
          resolve(rows.filter(r => r.mid !== userId));
        }
      });
    });
  };


  exports.postMentorDAO = (uid, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE mentor SET mentorCourses=?, year=? WHERE uid =?';
      const { courses, year } = data;
      db.run(sql, [courses, year, uid], function (err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            resolve({ message: 'No mentor found with the given uid.' });
          } else {
            resolve({ message: 'Mentor information updated successfully.' });
          }
        }
      });
    });
  };
  