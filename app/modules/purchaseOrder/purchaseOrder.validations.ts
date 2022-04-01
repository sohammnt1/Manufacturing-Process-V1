import { body, param, query } from "express-validator";
import validate from "../../utility/validate";

export const CreatePurchaseOrderValidator = [
  body("customer_id").isString().withMessage("Enter a name"),
  body("product.*.productName")
    .isString()
    .withMessage("Enter a valid productName."),
  body("product.*.dimensions")
    .isString()
    .withMessage("Enter a valid dimensions."),
  body("product.*.quantity")
    .isFloat({ min: 1, max: 9999999999 })
    .withMessage("Enter a valid quantity."),
  body("product.*.price")
    .isFloat({ min: 1, max: 9999999999 })
    .withMessage("Enter a valid price."),
  body("product.*.material").isString().withMessage("Enter a valid material."),
  body("address").isString().withMessage("Enter a valid Department"),
  validate,
];

export const DisplayPurchaseOrderValidator = [
  query("status").isString().withMessage("Enter a valid status"),
  validate,
];

export const PurchaseOrderIdValidator = [
  param("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId"),
  validate,
];
