import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreateDeliveryValidator = [
  body("deliveryExecutiveId")
    .isString()
    .withMessage("Enter a delivery Executive Id"),
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter valid purchase order Ids."),
  validate,
];

export const UpdateDeliveryValidator = [
  body("purchaseOrderId")
    .isString()
    .withMessage("Enter a delivery purchaseOrderId"),
  body("deliveryRemark").isString().withMessage("Enter valid delivery Remark."),
  body("deliveryStatus").isString().withMessage("Enter a delivery Status"),
  validate,
];
