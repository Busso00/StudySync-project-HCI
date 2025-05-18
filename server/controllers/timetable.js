'use strict';

const { editTimetableDAO, getTimetableDAO } = require('../DAO/dao-timetable');


exports.getTimetable = async (req, res) => {
    try {
        const userId = req.params.id;
        const timetable = await getTimetableDAO(userId);
        return res.status(200).json(timetable);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};


exports.postTimetable = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateResponse = await editTimetableDAO(userId, req.body);
        return res.status(200).json(updateResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};