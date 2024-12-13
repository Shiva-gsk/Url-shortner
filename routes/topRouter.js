const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const shortid = require('shortid');
const Url = require('../models/urlSchema');

router.get('/:number', async (req, res) => {
    const { number } = req.params;

    try {
        const topUrls = await Url.find().sort({ hitCount: -1 }).limit(parseInt(number));
        res.json(topUrls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;