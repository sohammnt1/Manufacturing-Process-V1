import { body, param } from "express-validator";
import validate from "../../utility/validate";

export const CreateCustomerValidator = [
  body("name").isString().withMessage("Enter a name"),
  body("email").isEmail().withMessage("Enter a valid email."),
  body("address").isString().withMessage("Enter a valid address"),
  body("contact").isNumeric().withMessage("Enter a valid contact number"),
  validate,
];

export const DeleteCustomerValidator = [
  param("customerId").isString().withMessage("Enter a valid customerId"),
  validate,
];
