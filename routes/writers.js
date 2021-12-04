const express = require('express');
const router = express.Router();
router.get('/', (req,res) => {
    res.send('writers')
})

module.exports = router;