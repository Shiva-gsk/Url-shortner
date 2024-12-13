const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const shortid = require('shortid');
const Url = require('../models/urlSchema');

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    // console.log(shortUrl)
    const fullShortUrl = `http://localhost:3000/${shortUrl}`;

    try {
        const urlDoc = await Url.findOne({ shortUrl: fullShortUrl });
        if (!urlDoc) {
            return res.status(404).json({ error: 'URL not found' });
        }

        urlDoc.hitCount += 1;
        await urlDoc.save();

        if (urlDoc.hitCount % 10 === 0) {
            return res.redirect('https://www.google.com');
        }

        res.redirect(urlDoc.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;