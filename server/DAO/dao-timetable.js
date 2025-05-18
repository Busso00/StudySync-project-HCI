'use strict';

/* Data Access Object (DAO) module for accessing users data */

const { db } = require('../db/index.js');

exports.getTimetableDAO = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT timeslot FROM timeslots WHERE uid=?';
      db.get(sql, [id], (err, row) => {
        if (err)
          reject(err);
        else if (row === undefined)
          resolve({ error: 'Timetable not found.' });
        else {
          // By default, the local strategy looks for "username": 
          // for simplicity, instead of using "email", we create an object with that property.
          resolve(row);
        }
      });
    });
  };

exports.editTimetableDAO = (id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE timeslots SET timeslot=? WHERE uid = ?`;
        const time = JSON.stringify(data);
        console.log(time);
        db.run(sql, [""+time+"", id], function(err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve();
                } else {
                    resolve({ message: 'Timeslots updated successfully.' });
                }
            }
        });
    });
  };