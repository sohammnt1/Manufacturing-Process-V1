import { Router, Request, Response, NextFunction } from "express";
import { CreateDeliveryValidator} from "./delivery.validations";
import deliveryService from "./delivery.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";

const router = Router();



// DISPLAY DElivery BY ID
router.get('/display',permit([employeeRoles.Admin,employeeRoles.Delivery_Executive]), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let id
        if(res.locals.user.role===employeeRoles.Delivery_Executive){
            id=res.locals.user._id
        }
        // const {id} = res.locals.users;
        // let id="623c8e90dad08e323f52534d"
        const result = await deliveryService.displayDeliveries(id);
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});


router.put('/attempt',permit([employeeRoles.Admin,employeeRoles.Delivery_Executive]), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated_data = req.body;
        const result = await deliveryService.attemptDelivery(updated_data);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router;