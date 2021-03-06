import { Router, Request, Response, NextFunction } from "express";
import {
  CreatePurchaseOrderValidator,
  PurchaseOrderIdValidator,
} from "./purchaseOrder.validations";
import purchaseOrderService from "./purchaseOrder.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";

const router = Router();
// /purchaseorder

router.post(
  "/create",
  CreatePurchaseOrderValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      ////let _id= "623c8e17dad08e323f525347"
      const purchaseOrder = req.body;
      //purchaseOrder.assignedEmployee={Sales_Manager:_id}
      if (res.locals.user.role === employeeRoles.Sales_Manager) {
        purchaseOrder.assignedEmployee = { Sales_Manager: res.locals.user._id };
        // purchaseOrder.assignedEmployee.Sales_Manager=res.locals.user._id
      }
      const result = await purchaseOrderService.createPurchaseOrder(
        purchaseOrder
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/display",
  permit([
    employeeRoles.Admin,
    employeeRoles.Sales_Manager,
    employeeRoles.Storage_Keeper,
    employeeRoles.Accountant,
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const page = req.query.page as string;
      const itemsPerPage = req.query.itemsPerPage as string;
      const result = await purchaseOrderService.displayPurchaseOrders(
        status || "",
        +page,
        +itemsPerPage
      );

      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// EDIT USERS
router.put(
  "/edit",
  CreatePurchaseOrderValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  CreatePurchaseOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated_data = req.body;
      const result = await purchaseOrderService.editPurchaseOrder(updated_data);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// DELETE USERS
router.delete(
  "/delete/:purchaseOrderId",
  PurchaseOrderIdValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrderId = req.params.purchaseOrderId;
      const result = await purchaseOrderService.deletePurchaseOrder(
        purchaseOrderId
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/calculate/:purchaseOrderId",
  PurchaseOrderIdValidator,
  permit([employeeRoles.Admin, employeeRoles.Sales_Manager]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrderId = req.params.purchaseOrderId;
      const result = await purchaseOrderService.calculateTotal(purchaseOrderId);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
