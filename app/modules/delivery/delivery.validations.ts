import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreateDeliveryValidator = [
    body("deliveryExecutiveId").isString().withMessage("Enter a delivery Executive Id"),
    body("purchaseOrderId").isString().withMessage("Enter valid purchase order Ids."),
    validate
];
