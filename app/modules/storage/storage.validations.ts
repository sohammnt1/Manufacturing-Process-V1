import { body, query } from "express-validator";
import validate from "../../utility/validate";

export const CreateStorageValidator = [
  body("storageRackIds").isArray().withMessage("Enter valid storageRackIds"),
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId."),
  //body("product").isString().withMessage("Enter a valid Department"),
  validate,
];

export const PurchaseOrderIdValidator = [
  query("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId"),
  validate,
];

export const OutForDeliveryValidator = [
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId"),
  validate,
  body("deliveryExecutiveId")
    .isString()
    .withMessage("Enter a valid deliveryExecutiveId"),
  validate,
];
