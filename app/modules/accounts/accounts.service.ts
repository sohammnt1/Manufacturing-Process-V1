import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";

const displayPurchaseOrders = async (status: string) => {
  try {
    let result = purchaseOrderService.displayPurchaseOrders(status.trim());
    return result;
  } catch (error) {
    throw error;
  }
};

const editStatus = async (updated_data: {
  purchaseOrderId: string;
  status: string;
  Accountant: string;
}) => {
  try {
    const result = await purchaseOrderService.updateStatus(
      updated_data.purchaseOrderId,
      updated_data.status
    );
    const assignEmployee = await purchaseOrderService.assignAccountant(
      updated_data.purchaseOrderId,
      updated_data.Accountant
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const getTotalAmountbyStatus = async () => {
  try {
    let result = purchaseOrderService.getTotalAmountbyStatus();
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  displayPurchaseOrders,
  editStatus,
  getTotalAmountbyStatus,
  //deleteEmployee
};
