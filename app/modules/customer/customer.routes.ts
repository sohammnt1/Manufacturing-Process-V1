import { Router, Request, Response, NextFunction } from "express";
import {
  CreateCustomerValidator,
  DeleteCustomerValidator,
} from "./customer.validations";
import customerService from "./customer.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";

const router = Router();

//Create Customer
router.post(
  "/create",
  CreateCustomerValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = req.body;
      const result = await customerService.createCustomer(customer);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// DISPLAY Customer
router.get(
  "/display",
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = req.query.customerId as string;
      const page = req.query.page as string;
      const itemsPerPage = req.query.itemsPerPage as string;
      const result = await customerService.displayCustomers(
        customerId || "",
        +page,
        +itemsPerPage
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// EDIT Customer
router.put(
  "/edit",
  CreateCustomerValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated_data = req.body;
      const result = await customerService.editCustomer(updated_data);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// DELETE Customer
router.delete(
  "/delete/:customerId",
  DeleteCustomerValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = req.params.customerId;
      const result = await customerService.deleteCustomer(customerId);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
