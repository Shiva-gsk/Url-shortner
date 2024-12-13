const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const shortid = require('shortid');
const Url = require('../models/urlSchema');

router.get('/', async (req, res) => {
    const { url } = req.query;

    try {
        const urlDoc = await Url.findOne({ $or: [{ longUrl: url }, { shortUrl: url }] });
        if (!urlDoc) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({ longUrl: urlDoc.longUrl, shortUrl: urlDoc.shortUrl, hitCount: urlDoc.hitCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;