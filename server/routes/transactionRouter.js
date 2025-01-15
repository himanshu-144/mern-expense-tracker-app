const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.post("/", addTransaction);

router.post("/getAllTransaction", getAllTransaction);

router.put("/:transactionId", editTransaction);

router.delete("/:transactionId", deleteTransaction);

module.exports = router