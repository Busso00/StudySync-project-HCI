'use strict';

const { sendNotifMessUidDAO, getNotifMessByUidDAO, deleteNotifMessByUidDAO } = require('../DAO/mess_notif');


exports.getNotificationsMessages = async (req, res) => {
    try {
        const userId = req.params.id;
        const rel = await getNotifMessByUidDAO(userId);
        return res.status(200).json(rel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.deleteNotificationMessage = async (req, res) => {
    try {
        const userId = req.params.id;
        const timestamp = req.body.timestamp;
        const deleteResponse = await deleteNotifMessByUidDAO(userId, timestamp);
        return res.status(200).json(deleteResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.postNotificationMessage = async (req, res) => {
    try {
        const userId = req.params.id;
        const timestamp = req.body.timestamp;
        const data = req.body.data;
        const postResponse = await sendNotifMessUidDAO(userId, timestamp, data);
        return res.status(200).json(postResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

