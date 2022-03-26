import { Router, Request, Response, NextFunction } from "express";
import { CreateEmployeeValidator, LoginEmployeeValidator } from "./employee.validations";
import employeeService from "./employee.service";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { employeeRoles } from "../../utility/db_constants";

const router = Router();

//Create Employee
router.post('/register', CreateEmployeeValidator, permit([employeeRoles.Admin]), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const employee= req.body;
        const result = await employeeService.createEmployee(employee);
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});



//Login Employee
router.post('/login', LoginEmployeeValidator, async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let { employeeId, password } = req.body;
        const result = await employeeService.authenticateEmployee(employeeId, password);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

// DISPLAY Employee BY ROLES
router.get('/display', permit([employeeRoles.Admin]),async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {role} = req.query;
        const result = await employeeService.displayEmployees(role);
        res.send(new ResponseHandler(result));
    } catch (error) {
        
        next(error);
    }
});

// EDIT Employee
router.put('/edit', CreateEmployeeValidator,permit([employeeRoles.Admin]), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated_data = req.body;
        const result = await employeeService.editEmployee(updated_data);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

// DELETE Employee
router.delete('/delete/:employeeId',permit([employeeRoles.Admin]), async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const employeeId = req.params.employeeId;
        const result = await employeeService.deleteEmployee(employeeId);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
});

export default router;