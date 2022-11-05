"use strict";
const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.get("/products", ctrl.output.products);
router.get("/ingredient", ctrl.output.ingredient);
router.get("/inbound", ctrl.output.inbound);
router.get("/adjustment", ctrl.output.adjustment);
router.get("/stockLog", ctrl.output.stockLog);
router.get("/analysis", ctrl.output.analysis);
router.get("/setting", ctrl.output.setting);
router.get("/test",ctrl.output.test);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/cafe_register", ctrl.process.cafe_register);
router.post("/material_register", ctrl.process.material_register);
router.post("/product_register", ctrl.process.product_register);
router.post("/ingredient_register", ctrl.process.ingredient_register);
router.post("/stock_inbound", ctrl.process.stock_inbound);
router.post("/stock_modify", ctrl.process.stock_modify);
router.post("/material_modify", ctrl.process.material_modify);
router.post("/delete_product", ctrl.process.delete_product);

router.get("/logout", ctrl.process.logout)

module.exports = router; 