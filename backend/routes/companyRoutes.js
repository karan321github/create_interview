const express = require("express");

const router = express.Router();

router.post("/api/signup", registerCompany);

module.exports = { router };
