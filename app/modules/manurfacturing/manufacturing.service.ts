import { employeeRoles } from "../../utility/db_constants";
import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";
import { IPurchaseOrder } from "../purchaseOrder/purchaseOrder.types";
import { ObjectId } from "mongodb"



const displayPreProductionPO = async () => {
    try {
        let result = await purchaseOrderService.getPreProductionPO();
        return result;
    } catch (error) {
        throw error;
    }
}

const editProduct = async (updated_data: any) => {
    try {
        const result = await purchaseOrderService.editProduct(updated_data);
        return result;
    } catch (error) {
        throw error;
    }
}

const updateStatus = async (purchaseOrderId:ObjectId,status:string) => {
    try {
        const result = await purchaseOrderService.updateStatus(purchaseOrderId,status);
        return result;
    } catch (error) {
        throw error;
    }
}



export default {
    displayPreProductionPO,
    editProduct,
    updateStatus
}