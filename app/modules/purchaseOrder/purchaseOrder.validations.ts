import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreatePurchaseOrderValidator = [
    body("customer_id").isString().withMessage("Enter a name"),
    body("product").isArray().withMessage("Enter a valid email."),
    body("address").isString().withMessage("Enter a valid Department"),
    validate
];
