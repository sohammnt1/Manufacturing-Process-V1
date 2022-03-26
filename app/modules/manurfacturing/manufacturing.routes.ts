import { Router, Request, Response, NextFunction } from "express";
import manufacturingService from "./manufacturing.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";
import { ObjectId } from "mongodb"

const router = Router();

router.get('/display', permit([employeeRoles.Admin,employeeRoles.Furnace_Operator]),async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await manufacturingService.displayPreProductionPO();
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});

// EDIT USERS
router.put('/editproduct', permit([employeeRoles.Admin,employeeRoles.Furnace_Operator]),async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let Furnace_Operator
        if(res.locals.user.role===employeeRoles.Furnace_Operator){
             Furnace_Operator=res.locals.user._id
             }
        let updated_data = req.body;
        let manufactured=true
        updated_data={Furnace_Operator,manufactured,...updated_data}
        const result = await manufacturingService.editProduct(updated_data);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

router.put('/updatestatus', permit([employeeRoles.Admin,employeeRoles.Furnace_Operator]),async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let purchaseOrderId=req.body.purchaseOrderId;
        let status="PostMachiningDone"
        const result = await manufacturingService.updateStatus(purchaseOrderId,status);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router;