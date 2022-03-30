import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";
import accountsService from "./accounts.service";

const router = Router();

router.get(
  "/display",
  permit([employeeRoles.Admin, employeeRoles.Accountant]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const result = await accountsService.displayPurchaseOrders(status || "");
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

//  EDIT USERS
router.put(
  "/edit",
  permit([employeeRoles.Admin, employeeRoles.Accountant]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let updated_data = req.body;
      let Accountant;
      if (res.locals.user.role === employeeRoles.Accountant) {
        Accountant = res.locals.user._id;
      }
      // let Accountant="623c8ea6dad08e323f52534f";
      updated_data = { Accountant, ...updated_data };
      const result = await accountsService.editStatus(updated_data);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/amount",
  permit([employeeRoles.Admin, employeeRoles.Accountant]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await accountsService.getTotalAmountbyStatus();
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
