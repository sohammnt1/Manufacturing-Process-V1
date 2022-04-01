import { Router, Request, Response, NextFunction } from "express";
import {
  CreateStorageValidator,
  PurchaseOrderIdValidator,
  OutForDeliveryValidator,
} from "./storage.validations";
import storageService from "./storage.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";

const router = Router();

router.get(
  "/tobestored",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const itemsPerPage = req.query.itemsPerPage as string;
      const result = await storageService.displayPurchaseOrder(
        +page,
        +itemsPerPage
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  CreateStorageValidator,
  permit([employeeRoles.Admin, employeeRoles.Storage_Keeper]),
  CreateStorageValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let storageKeeper;
      if (res.locals.user.role === employeeRoles.Storage_Keeper) {
        storageKeeper = res.locals.user._id;
      }
      // let storageKeeper = "623945ae147217c8959381bf"
      const storage = req.body;
      const result = await storageService.createStorage(storage, storageKeeper);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// DISPLAY storage BY purchaseId or storage rack
router.get(
  "/display",
  permit([employeeRoles.Admin, employeeRoles.Storage_Keeper]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = req.query;
      const page = req.query.page as string;
      const itemsPerPage = req.query.itemsPerPage as string;
      const result = await storageService.displayStorages(
        filters,
        +page,
        +itemsPerPage
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/edit",
  CreateStorageValidator,
  permit([employeeRoles.Admin, employeeRoles.Storage_Keeper]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated_data = req.body;
      const result = await storageService.editStorage(updated_data);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// DELETE USERS
router.delete(
  "/delete",
  PurchaseOrderIdValidator,
  permit([employeeRoles.Admin, employeeRoles.Storage_Keeper]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrderId = req.query.purchaseOrderId as string;
      const result = await storageService.deleteStorage(purchaseOrderId);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

// update PO to out for delivery and delete from storage and add
router.post(
  "/out-for-delivery",
  OutForDeliveryValidator,
  permit([employeeRoles.Admin, employeeRoles.Storage_Keeper]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveryData = req.body;
      const result = await storageService.outForDelivery(deliveryData);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
