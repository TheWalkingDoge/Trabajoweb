const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        title: 'Hi! We are winamp'
    })
});

module.exports = router;
