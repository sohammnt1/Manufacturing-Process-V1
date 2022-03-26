import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreateStorageValidator = [
    body("storageRackIds").isArray().withMessage("Enter valid storageRackIds"),
    body("purchaseOrderId").isString().withMessage("Enter a valid purchaseOrderId."),
    //body("product").isString().withMessage("Enter a valid Department"),
    validate
];

