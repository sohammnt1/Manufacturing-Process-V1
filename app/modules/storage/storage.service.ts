import storageRepo from "./storage.repo";
import { IStorage } from "./storage.types";
import deliveryService from "../delivery/delivery.service";
import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";
import customerService from "../customer/customer.service";
import { IDelivery } from "../delivery/delivery.types";

const displayPurchaseOrder = async () => {
  try {
    let status = "PostMachiningDone";
    let result = await purchaseOrderService.displayPurchaseOrders(status);
    return result;
  } catch (error) {
    throw error;
  }
};

const createStorage = async (storage: IStorage, storageKeeper: string) => {
  try {
    const result = await storageRepo.create(storage);
    const assignStorageKeeper = await purchaseOrderService.assignStorageKeeper(
      result.purchaseOrderId,
      storageKeeper
    );
    const updateStatus = await purchaseOrderService.updateStatus(
      result.purchaseOrderId,
      "Stored"
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const displayStorages = async (filter: any) => {
  try {
    let filterQuery = [];
    let result;
    if (filter.storageRackIds) {
      filterQuery.push({ storageRackIds: { $in: filter.storageRackIds } });
    }

    if (filter.purchaseOrderId) {
      filterQuery.push({ purchaseOrderId: filter.purchaseOrderId });
    }
    if (filterQuery.length > 0) {
      result = storageRepo.getByFilter(filterQuery);
    } else {
      result = storageRepo.getAll();
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const editStorage = async (updated_data: IStorage) => {
  try {
    const result = await storageRepo.update(updated_data);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteStorage = async (purchaseOrderId: string) => {
  try {
    const result = await storageRepo.deleteOne(purchaseOrderId);
    return result;
  } catch (error) {
    throw error;
  }
};

const outForDelivery = async (deliveryData: IDelivery) => {
  try {
    //let purchaseOrderId = new ObjectId(deliveryData.purchaseOrderId);
    let purchaseOrderId = deliveryData.purchaseOrderId;
    const deletePurchaseOrderID = await storageRepo.deleteOne(purchaseOrderId);
    const updateStatus = await purchaseOrderService.updateStatus(
      purchaseOrderId,
      "OutForDelivery"
    );
    const assignDeliveryExecutive =
      await purchaseOrderService.assignDeliveryExecutive(
        purchaseOrderId,
        deliveryData.deliveryExecutiveId
      );
    const customerId = await purchaseOrderService.getPurchaseOrderById(
      purchaseOrderId
    );
    let customerName = customerId.customer_id.name;
    let customerContact = customerId.customer_id.contact;
    let customerAddress = customerId.customer_id.address;
    let customerEmail = customerId.customer_id.email;
    deliveryData = {
      ...deliveryData,
      customerName,
      customerAddress,
      customerContact,
      customerEmail,
    };
    const result = await deliveryService.createDelivery(deliveryData);
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createStorage,
  displayStorages,
  editStorage,
  deleteStorage,
  outForDelivery,
  displayPurchaseOrder,
};
