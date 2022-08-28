const express = require('express');
const playerBL = require('../BL/playerBL');
const router = express.Router();

/* Get All Players */
router.route('/').get(async (req, res) => {
    try {
        const players  = await playerBL.GetFromCache();
        return res.json(players);
    } catch (error) {
        return res.json(error.message); // message of error
    }
});

/* Add Msg */
router.route('/').post(async (req, res) => {
    try {
        const newMsg = req.body;
        const status = await playerBL.AddMsgToTxT(newMsg);
        console.log(status);
        return res.json(status);
    } catch (error) {
        console.log('not God !');
        return res.json(error.message); // message of error
    }
});

/* Change Time */
router.route('/').put(async (req,res) => {
    try {
        const NewTime = req.body;
        const status = await playerBL.ChangeTime(NewTime.time);
        return res.json(status);
    } catch (error) {
        return res.json(error.message); // message of error
    }
});

/* Delete Player */
router.route('/:id').delete(async (req,res) => {
    try {
        const { id } = req.params;

        const result = await playerBL.DeletePlayer(id);
        return res.json(result);
    } catch (error) {
        return res.json(error) // All the error
    }
});

module.exports = router;