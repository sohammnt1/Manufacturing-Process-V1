import { employeeRoles } from "../../utility/db_constants";
import purchaseOrderRepo from "./purchaseOrder.repo";
import { IPurchaseOrder } from "./purchaseOrder.types";
import { ObjectId } from "mongodb"

const createPurchaseOrder = async (purchaseOrder: IPurchaseOrder) => {
    try {
        let result = await purchaseOrderRepo.create(purchaseOrder);
        const total = await purchaseOrderRepo.calculateTotal(result._id);
        const productTotal = await purchaseOrderRepo.calculateProductTotal(result._id)
        for (let i in productTotal) {
            result.product[i].productTotal = productTotal[i].productTotal
        }
        result.subtotal = total[0].subtotal
        result.gst = total[0].gst
        result.total = total[0].total
        await purchaseOrderRepo.update(result)
        return result
    } catch (error) {
        throw error;
    }
}

const displayPurchaseOrders = async (status: any) => {
    try {
        let result
        if (status) {
            result = purchaseOrderRepo.getbyStatus(status.trim());
        }
        else {
            result = purchaseOrderRepo.getAll();
        }
        return result;
    } catch (error) {
        throw error;
    }
}

const editPurchaseOrder = async (updated_data: IPurchaseOrder) => {
    try {
        const result = await purchaseOrderRepo.update(updated_data);
        return result;
    } catch (error) {
        throw error;
    }
}

const deletePurchaseOrder = async (purchaseOrderId: string) => {
    try {
        const result = await purchaseOrderRepo.deleteOne(purchaseOrderId);
        return result;
    } catch (error) {
        throw error;
    }
}

const calculateTotal = async (purchaseOrderId: any) => {
    try {
        purchaseOrderId = new ObjectId(purchaseOrderId)
        const result = await purchaseOrderRepo.calculateTotal(purchaseOrderId);
        return result;
    } catch (error) {
        throw error;
    }
}

const getPreProductionPO = async () => {
    try {
        const result = await purchaseOrderRepo.getPreProductionPO();
        return result;
    } catch (error) {
        throw error;
    }
}

const editProduct = async (updated_data: any) => {
    try {
        let result = await purchaseOrderRepo.editProduct(updated_data);
        let assignEmployee = await purchaseOrderRepo.assignfurnaceOperator(updated_data)
        return result;
    } catch (error) {
        throw error;
    }
}

const updateStatus = async (purchaseOrderId:any,status:string) => {
    try {
        const result = await purchaseOrderRepo.updateStatus(purchaseOrderId,status);
        return result;
    } catch (error) {
        throw error;
    }
}

const assignStorageKeeper = async (purchaseOrderID:any,storageKeeper: any) => {
    try {
        let result = await purchaseOrderRepo.assignStorageKeeper(purchaseOrderID,storageKeeper);
        return result;
    } catch (error) {
        throw error;
    }
}

const assignDeliveryExecutive = async (purchaseOrderID:any,deliveryExecutive: any) => {
    try {
        let result = await purchaseOrderRepo.assignDeliveryExecutive(purchaseOrderID,deliveryExecutive);
        return result;
    } catch (error) {
        throw error;
    }
}


const assignAccountant = async (purchaseOrderID:any,Accountant: any) => {
    try {
        let result = await purchaseOrderRepo.assignAccountant(purchaseOrderID,Accountant);
        return result;
    } catch (error) {
        throw error;
    }
}

const getTotalAmountbyStatus = async () => {
    try {
        const result = await purchaseOrderRepo.getTotalAmountbyStatus();
        return result;
    } catch (error) {
        throw error;
    }
}

const getPurchaseOrderById = async (purchaseOrderId:any) => {
    try {
        const result = await purchaseOrderRepo.getPurchaseOrderById(purchaseOrderId);
        return result;
    } catch (error) {
        throw error;
    }
}




export default {
    createPurchaseOrder,
    displayPurchaseOrders,
    editPurchaseOrder,
    deletePurchaseOrder,
    calculateTotal,
    getPreProductionPO,
    editProduct,
    updateStatus,
    assignStorageKeeper,
    assignDeliveryExecutive,
    assignAccountant,
    getTotalAmountbyStatus,
    getPurchaseOrderById
}