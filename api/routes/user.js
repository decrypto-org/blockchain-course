const express = require('express')
const router = express.Router()

router.get(
  '/current',
  (req, res) => {
    const user = req.user
    res.json({ success: 200, user: user })
  }
)

module.exports = router
