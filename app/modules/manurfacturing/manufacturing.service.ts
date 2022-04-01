import purchaseOrderService from "../purchaseOrder/purchaseOrder.service";

const displayPreProductionPO = async () => {
  try {
    let result = await purchaseOrderService.getPreProductionPO();
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
    const result = await purchaseOrderService.editProduct(updated_data);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (purchaseOrderId: string, status: string) => {
  try {
    const result = await purchaseOrderService.updateStatus(
      purchaseOrderId,
      status
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  displayPreProductionPO,
  editProduct,
  updateStatus,
};
