import { Route } from "./routes.types";
import EmployeeRouter from "../modules/employee/employee.routes";
import CustomerRouter from "../modules/customer/customer.routes";
import DeliveryRouter from "../modules/delivery/delivery.routes";
import AccountRouter from "../modules/accounts/accounts.routes";
import PurchaseOrderRouter from "../modules/purchaseOrder/purchaseOrder.routes";
import StorageRouter from "../modules/storage/storage.routes";
import ManufacturingRouter from "../modules/manurfacturing/manufacturing.routes"
import StorageRackRouter from "../modules/storageRack/storageRack.routes"
import ShiftRouter from "../modules/shift/shift.routes"
import ProductTypeRouter from "../modules/productType/productType.routes"
import EmployeeRoleRouter from "../modules/employeeRole/employeeRole.routes"
import FurnaceRouter from "../modules/furnace/furnace.routes"

export const routes = [
    new Route('/employee', EmployeeRouter),
    new Route('/customer', CustomerRouter),
    new Route('/delivery', DeliveryRouter),
    new Route('/manufacturing', ManufacturingRouter),
    new Route('/accounts', AccountRouter),
    new Route('/purchaseorder', PurchaseOrderRouter),
    new Route('/storage', StorageRouter),
    new Route('/storagerack', StorageRackRouter),
    new Route('/shift', ShiftRouter),
    new Route('/producttype', ProductTypeRouter),
    new Route('/employeerole', EmployeeRoleRouter),
    new Route('/furnace', FurnaceRouter),
];

export const excludedPaths = [
    { method: 'POST', route: '/employee/login' },
    { method: 'GET', route: '/storagerack/display' },
    { method: 'GET', route: '/employeerole/display' },
    { method: 'GET', route: '/producttype/display' },
    { method: 'GET', route: '/shift/display' },
    { method: 'GET', route: '/furnace/display' }
];