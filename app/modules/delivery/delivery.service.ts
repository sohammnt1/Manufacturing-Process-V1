import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";
import deliveryRepo from "./delivery.repo";
import { IDelivery } from "./delivery.types";

const createDelivery = async (delivery: IDelivery) => {
    try {
        const result = await deliveryRepo.create(delivery);
        return result
    } catch (error) {
        throw error;
    }
}

const displayDeliveries = async (id: any) => {
    try {
        let result = deliveryRepo.getbyId(id);
        return result;
    } catch (error) {
        throw error;
    }
}

// UPDATE paymentpending STATUS in PO and delivered in delivery
const attemptDelivery = async (updated_data: IDelivery) => {
    try {
        const result = await deliveryRepo.attemptDelivery(updated_data);
        const updateStatus = await purchaseOrderService.updateStatus(updated_data.purchaseOrderId,"PaymentPending")
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    createDelivery,
    displayDeliveries,
    attemptDelivery,
}