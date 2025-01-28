const express = require("express")
const router = express.Router()
const inventoryCtrl = require("../controllers/inventory.ctrl")

router.post('/inventory', inventoryCtrl.getCount)

module.exports = router