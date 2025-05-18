'use strict';

const { putMentorDAO, getMentorsDAO, postMentorDAO } = require('../DAO/dao-mentor');

exports.getMentors = async (req, res) => {
    try {
        const userId = req.params.id;
        const rel = await getMentorsDAO(userId);
        return res.status(200).json(rel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.putMentor = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateResponse = await putMentorDAO(userId, req.body);
        return res.status(200).json(updateResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.postMentor = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateResponse = await postMentorDAO(userId, req.body);
        return res.status(200).json(updateResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};