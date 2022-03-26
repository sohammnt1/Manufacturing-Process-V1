import { Router, Request, Response, NextFunction } from "express";
import shiftService from "./shift.service";
import { ResponseHandler } from "../../utility/response";

const router = Router();

router.get('/display', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await shiftService.displayShift();
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});


export default router;