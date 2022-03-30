import { employeeRoles } from "../../utility/db_constants";
import purchaseOrderRepo from "./purchaseOrder.repo";
import { IPurchaseOrder } from "./purchaseOrder.types";
import { ObjectId } from "mongodb";

const createPurchaseOrder = async (purchaseOrder: IPurchaseOrder) => {
  try {
    let result = await purchaseOrderRepo.create(purchaseOrder);
    const total = await purchaseOrderRepo.calculateTotal(result._id);
    const productTotal = await purchaseOrderRepo.calculateProductTotal(
      result._id
    );
    for (let i in productTotal) {
      result.product[i].productTotal = productTotal[i].productTotal;
    }
    result.subtotal = total[0].subtotal;
    result.gst = total[0].gst;
    result.total = total[0].total;
    await purchaseOrderRepo.update(result);
    return result;
  } catch (error) {
    throw error;
  }
};

const displayPurchaseOrders = async (status: string) => {
  try {
    let result;
    if (status) {
      result = purchaseOrderRepo.getbyStatus(status.trim());
    } else {
      result = purchaseOrderRepo.getAll();
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const editPurchaseOrder = async (updated_data: IPurchaseOrder) => {
  try {
    const result = await purchaseOrderRepo.update(updated_data);
    return result;
  } catch (error) {
    throw error;
  }
};

const deletePurchaseOrder = async (purchaseOrderId: string) => {
  try {
    const result = await purchaseOrderRepo.deleteOne(purchaseOrderId);
    return result;
  } catch (error) {
    throw error;
  }
};

const calculateTotal = async (purchaseOrderId: string) => {
  try {
    const result = await purchaseOrderRepo.calculateTotal(purchaseOrderId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getPreProductionPO = async () => {
  try {
    const result = await purchaseOrderRepo.getPreProductionPO();
    return result;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (updated_data: {
  productId: string;
  furnaceId: string;
  postMachiningWeight: number;
  manufactured: boolean;
  Furnace_Operator: string;
  purchaseOrderId: string;
}) => {
  try {
    let result = await purchaseOrderRepo.editProduct(updated_data);
    let assignEmployee = await purchaseOrderRepo.assignfurnaceOperator(
      updated_data
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const checkIfNotManufactured = async (purchaseOrderId: string) => {
  try {
    const result = await purchaseOrderRepo.checkIfNotManufactured(
      purchaseOrderId
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (purchaseOrderId: string, status: string) => {
  try {
    const notManufactured = await checkIfNotManufactured(purchaseOrderId);
    //console.log(notManufactured)
    if (notManufactured.length === 0) {
      const result = await purchaseOrderRepo.updateStatus(
        purchaseOrderId,
        status
      );
      return result;
    } else {
      throw "All Products are not manufactured ";
    }
  } catch (error) {
    throw error;
  }
};

const assignStorageKeeper = async (
  purchaseOrderID: string,
  storageKeeper: string
) => {
  try {
    let result = await purchaseOrderRepo.assignStorageKeeper(
      purchaseOrderID,
      storageKeeper
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const assignDeliveryExecutive = async (
  purchaseOrderID: string,
  deliveryExecutive: string
) => {
  try {
    let result = await purchaseOrderRepo.assignDeliveryExecutive(
      purchaseOrderID,
      deliveryExecutive
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const assignAccountant = async (
  purchaseOrderID: string,
  Accountant: string
) => {
  try {
    let result = await purchaseOrderRepo.assignAccountant(
      purchaseOrderID,
      Accountant
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const getTotalAmountbyStatus = async () => {
  try {
    const result = await purchaseOrderRepo.getTotalAmountbyStatus();
    return result;
  } catch (error) {
    throw error;
  }
};

const getPurchaseOrderById = async (purchaseOrderId: string) => {
  try {
    const result = await purchaseOrderRepo.getPurchaseOrderById(
      purchaseOrderId
    );
    return result;
  } catch (error) {
    throw error;
  }
};

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
  getPurchaseOrderById,
};
