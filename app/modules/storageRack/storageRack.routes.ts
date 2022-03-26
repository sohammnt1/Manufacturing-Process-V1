import { Router, Request, Response, NextFunction } from "express";
import storageRackService from "./storageRack.service";
import { ResponseHandler } from "../../utility/response";

const router = Router();

router.get('/display', async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await storageRackService.displayStorageRack();
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});


export default router;