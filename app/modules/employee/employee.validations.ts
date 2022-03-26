import { body } from "express-validator";
import validate from "../../utility/validate";

export const CreateEmployeeValidator = [
    body("name").isString().withMessage("Enter a name"),
    body("email").isEmail().withMessage("Enter a valid email."),
    body("shift").isArray().withMessage("Enter a valid Department"),
    body("role").isString().withMessage("Enter a valid role"),
    validate
];

export const LoginEmployeeValidator = [
    body("employeeId").isString().withMessage("Enter a valid emp id."),
    body("password").isString().notEmpty().withMessage("Enter a vaid password."),
    validate
];