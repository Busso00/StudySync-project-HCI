'use strict';

const { editUserDAO, getUsersDAO, getUserByIdDAO } = require('../DAO/dao-users');

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdDAO(userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await getUsersDAO();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateResponse = await editUserDAO(userId, req.body);
        return res.status(200).json(updateResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};