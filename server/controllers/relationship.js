'use strict';

const { getUidRelationshipDAO, createUidsRelationshipDAO, deleteUidsRelationshipDAO, getUserPairsDAO, getRelationshipDAO } = require('../DAO/relationship');

exports.getContacts = async (req, res) => {
    try {
        const userId = req.params.id;
        const rel = await getUidRelationshipDAO(userId);
        return res.status(200).json(rel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.getRelationship = async (req, res) => {
    try {
        const userId1 = req.params.srcId;
        const userId2 = req.params.targetId;
        const rel = await getRelationshipDAO(userId1, userId2);
        return res.status(200).json(rel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.getPairs = async (req, res) => {
    try {
        const userId = req.params.id;
        const rel = await getUserPairsDAO(userId);
        return res.status(200).json(rel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const userId1 = req.params.id;
        const userId2 = req.body.uid2;
        const deleteResponse = await deleteUidsRelationshipDAO(userId1, userId2);
        return res.status(200).json(deleteResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};

exports.postContact = async (req, res) => {
    try {
        const userId1 = req.params.id;
        const userId2 = req.body.uid2;
        const type = req.body.type;
        const postResponse = await createUidsRelationshipDAO(userId1, userId2, type);
        return res.status(200).json(postResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error })
    }
};
