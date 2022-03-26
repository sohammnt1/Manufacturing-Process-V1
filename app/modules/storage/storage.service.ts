import storageRepo from "./storage.repo";
import { generateToken } from "../../utility/jwt";
import { IStorage } from "./storage.types";
import deliveryService from "../delivery/delivery.service";
import { ObjectId } from "mongodb"
import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";
import customerService from "../customer/customer.service";

const displayPurchaseOrder = async () => {
    try {
        let status = "PostMachiningDone"
        let result = await purchaseOrderService.displayPurchaseOrders(status);
        return result;
    } catch (error) {
        throw error;
    }
}

const createStorage = async (storage: IStorage, storageKeeper: string) => {
    try {
        const result = await storageRepo.create(storage);
        const assignStorageKeeper = await purchaseOrderService.assignStorageKeeper(result.purchaseOrderId, storageKeeper);
        const updateStatus = await purchaseOrderService.updateStatus(result.purchaseOrderId, "Stored")
        return result

    } catch (error) {
        throw error;
    }
}

const displayStorages = async (filter: any) => {
    try {
        let filterQuery = []
        let result
        if (filter.storageRackIds) {
            filterQuery.push({ storageRackIds: { $in: filter.storageRackIds } })
        }

        if (filter.purchaseOrderId) {
            filterQuery.push({ purchaseOrderId: filter.purchaseOrderId })
        }
        result = storageRepo.getByFilter(filterQuery);
        return result;
    } catch (error) {
        throw error;
    }
}

const editStorage = async (updated_data: IStorage) => {
    try {
        const result = await storageRepo.update(updated_data);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteStorage = async (purchaseOrderId: any) => {
    try {
        const result = await storageRepo.deleteOne(purchaseOrderId);
        return result;
    } catch (error) {
        throw error;
    }
}

const outForDelivery = async (deliveryData: any) => {
    try {
        let purchaseOrderId = new ObjectId(deliveryData.purchaseOrderId)
        const deletePurchaseOrderID = await storageRepo.deleteOne(purchaseOrderId);
        const updateStatus = await purchaseOrderService.updateStatus(purchaseOrderId, "OutForDelivery")
        const assignDeliveryExecutive = await purchaseOrderService.assignDeliveryExecutive(purchaseOrderId, deliveryData.deliveryExecutiveId)
        const CustomerId = await purchaseOrderService.getPurchaseOrderById(purchaseOrderId)
        let customerDetails = await customerService.displayCustomers(CustomerId)
        customerDetails=customerDetails[0]
        let customerName = customerDetails.name;
        let customerContact = customerDetails.contact;
        let customerAddress = customerDetails.address;
        let customerEmail = customerDetails.email;
        deliveryData={...deliveryData,customerName,customerAddress,customerDetails,customerContact,customerEmail}
        const result = await deliveryService.createDelivery(deliveryData)

        //const updateStatus= await purchaseOrderService.updateStatus(purchaseOrderId,"OutForDelivery")
        
        return result;
} catch (error) {
    throw error;
}
}


export default {
    createStorage,
    displayStorages,
    editStorage,
    deleteStorage,
    outForDelivery,
    displayPurchaseOrder
}