const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const shortid = require('shortid');
const Url = require('../models/urlSchema');

router.post('/', async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    try {
        let existingUrl = await Url.findOne({ longUrl });
        if (existingUrl) {
            return res.json({ shortUrl: existingUrl.shortUrl });
        }

        const shortUrl = `http://localhost:3000/${shortid.generate()}`;
        const newUrl = new Url({ longUrl, shortUrl, hitCount: 0,  createdAt: Date.now() });
        await newUrl.save();

        res.json({ shortUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;