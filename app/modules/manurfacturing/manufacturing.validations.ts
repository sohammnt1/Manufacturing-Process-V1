import { body } from "express-validator";
import validate from "../../utility/validate";

export const UpdateManufacturingValidator = [
  body("postMachiningWeight")
    .isString()
    .withMessage("Enter a postMachiningWeight"),
  body("furnaceId").isString().withMessage("Enter a valid furnaceId."),
  body("productId").isString().withMessage("Enter a valid productId"),
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId"),
  validate,
];

export const UpdatePOStatusValidator = [
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter a valid purchaseOrderId"),
  validate,
];
