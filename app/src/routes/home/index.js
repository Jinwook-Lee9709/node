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
router.get("/cafeLogin", ctrl.output.cafeLogin);
router.get("/cafeRegister", ctrl.output.cafeRegister);
router.get("/test",ctrl.output.test);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/cafe_register", ctrl.process.cafe_register);
router.post("/cafe_disconnect", ctrl.process.cafe_disconnect);
router.post("/cafe_register_by_code", ctrl.process.cafe_register_by_code);
router.post("/change_cafe_name", ctrl.process.change_cafe_name);
router.post("/material_register", ctrl.process.material_register);
router.post("/product_register", ctrl.process.product_register);
router.post("/ingredient_register", ctrl.process.ingredient_register);
router.post("/stock_inbound", ctrl.process.stock_inbound);
router.post("/stock_modify", ctrl.process.stock_modify);
router.post("/material_modify", ctrl.process.material_modify);
router.post("/delete_product", ctrl.process.delete_product);
router.post("/delete_material", ctrl.process.delete_material);
router.post("/sell_logging", ctrl.process.sell_logging);


router.get("/logout", ctrl.process.logout)

module.exports = router; 