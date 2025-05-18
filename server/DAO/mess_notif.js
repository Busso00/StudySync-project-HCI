'use strict';

const { db } = require('../db/index.js');

//send message or notification
exports.sendNotifMessUidDAO = (uid1, timestamp, data) => {
    return new Promise((resolve, reject) => {//id = 0 for messages
      const sql = 'INSERT INTO message (uid1, uid2, timestamp, type, text) VALUES (?, ?, ?, ?, ?)';
      const { uid2, type, text } = data;
      db.run(sql, [uid1, uid2, timestamp, type, text] , function (err) {
        if (err) {
            reject(err);
        } else {
            if (this.changes === 0) {
                resolve();
            } else {
                resolve({ message: 'Notification sent successfully.' });
            }
        }
        });
    });
};

//get notifications sended and received
exports.getNotifMessByUidDAO = (uid) => {
    return new Promise((resolve, reject) => {//id > 0 for notifications
        const sql = 'SELECT * FROM message WHERE uid1 = ? OR uid2 = ? ORDER BY timestamp';
        db.all(sql, [uid, uid], (err, u) => {
            if (err)
                reject(err);
            if (u == undefined)
                resolve({ error: 'Notif not found.' });
            else {
                resolve(u);
            }
        });
    });
};

//delete notification by priamry key (timestamp, uid)
exports.deleteNotifMessByUidDAO = (uid, timestamp) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM message WHERE uid1 = ? AND timestamp = ?`;
        db.run(sql, [uid, timestamp], function (err) {
            if (err) {
                reject(err);
            } else {
                if (this.changes === 0) {
                    resolve();
                } else {
                    resolve({ message: 'Notification deleted successfully.' });
                }
            }
        });
    });
};



