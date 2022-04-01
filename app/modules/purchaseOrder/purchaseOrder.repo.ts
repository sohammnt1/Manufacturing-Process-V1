import purchaseOrderModel from "./purchaseOrder.schema";
import { IPurchaseOrder } from "./purchaseOrder.types";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

const create = (purchaseOrder: IPurchaseOrder) =>
  purchaseOrderModel.create(purchaseOrder);

const getAll = (page: number, itemsPerPage: number) =>
  purchaseOrderModel
    .find()
    .populate("assignedEmployee.Sales_Manager", "name")
    .populate("assignedEmployee.Furnace_Operator", "name")
    .populate("assignedEmployee.Storage_Keeper", "name")
    .populate("assignedEmployee.Delivery_Executive", "name")
    .populate("assignedEmployee.Accountant", "name")
    .populate("customer_id", "name")
    .populate("assignedEmployee.Sales_Manager", "name")
    .populate("product.furnaceId", "name")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

const getOne = (purchaseOrderId: string) =>
  purchaseOrderModel.findOne({
    purchaseOrderId: new ObjectId(purchaseOrderId),
  });

const getbyStatus = (status: string, page: number, itemsPerPage: number) =>
  purchaseOrderModel
    .find({
      $and: [{ status: status }, { deleted: false }],
    })
    .populate("assignedEmployee.Sales_Manager", "name")
    .populate("assignedEmployee.Furnace_Operator", "name")
    .populate("assignedEmployee.Storage_Keeper", "name")
    .populate("assignedEmployee.Delivery_Executive", "name")
    .populate("assignedEmployee.Accountant", "name")
    .populate("customer_id", "name")
    .populate("assignedEmployee.Sales_Manager", "name")
    .populate("product.furnaceId", "name")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

const getPurchaseOrderById = (purchaseOrderId: string) =>
  purchaseOrderModel
    .findOne({ _id: new ObjectId(purchaseOrderId) })
    .populate("customer_id");

const update = (updated_data: IPurchaseOrder) =>
  purchaseOrderModel.updateOne(
    {
      _id: updated_data._id,
    },
    updated_data
  );

const deleteOne = (purchaseOrderId: string) =>
  purchaseOrderModel.updateOne(
    { purchaseOrderId: purchaseOrderId },
    { deleted: true }
  );

const calculateTotal = (purchaseOrderId: string) =>
  purchaseOrderModel.aggregate([
    { $unwind: "$product" },
    { $match: { _id: new ObjectId(purchaseOrderId) } },
    {
      $project: {
        _id: 1,
        price: 1,
        quantity: 1,
        productTotal: { $multiply: ["$product.price", "$product.quantity"] },
      },
    },
    { $group: { _id: null, subtotal: { $sum: "$productTotal" } } },
    { $project: { subtotal: 1, gst: { $multiply: ["$subtotal", 0.18] } } },
    {
      $project: {
        productTotal: 1,
        subtotal: 1,
        gst: 1,
        total: { $sum: ["$subtotal", "$gst"] },
      },
    },
  ]);

const calculateProductTotal = (purchaseOrderId: ObjectId) =>
  purchaseOrderModel.aggregate([
    { $unwind: "$product" },
    { $match: { _id: purchaseOrderId } },
    {
      $project: {
        _id: "$product._id",
        quantity: 1,
        productTotal: { $multiply: ["$product.price", "$product.quantity"] },
      },
    },
  ]);

const getPreProductionPO = () =>
  purchaseOrderModel.aggregate([
    { $unwind: "$product" },
    {
      $match: {
        $and: [{ status: "PreProduction" }, { "product.manufactured": false }],
      },
    },
    {
      $project: {
        PurchaseOrderId: "$_id",
        ProductId: "$product._id",
        productName: "$product.productName",
        quantity: "$product.quantity",
        dimensions: "$product.dimensions",
        material: "$product.material",
        manufactured: "$product.manufactured",
      },
    },
  ]);

const editProduct = (updated_data: {
  productId: string;
  furnaceId: string;
  postMachiningWeight: number;
  manufactured: boolean;
  Furnace_Operator: string;
}) =>
  purchaseOrderModel.updateOne(
    { "product._id": new Types.ObjectId(updated_data.productId) },
    {
      $set: {
        "product.$.furnaceId": updated_data.furnaceId,
        "product.$.postMachiningWeight": updated_data.postMachiningWeight,
        "product.$.manufactured": updated_data.manufactured,
      },
    }
  );

const assignfurnaceOperator = (updated_data: {
  productId: string;
  furnaceId: string;
  postMachiningWeight: number;
  manufactured: boolean;
  Furnace_Operator: string;
  purchaseOrderId: string;
}) =>
  purchaseOrderModel.updateOne(
    { _id: new Types.ObjectId(updated_data.purchaseOrderId) },
    {
      $push: {
        "assignedEmployee.Furnace_Operator": updated_data.Furnace_Operator,
      },
    }
  );

const checkIfNotManufactured = (purchaseOrderId: string) =>
  purchaseOrderModel.aggregate([
    { $unwind: "$product" },
    {
      $match: {
        $and: [
          { status: "PreProduction" },
          { "product.manufactured": false },
          { _id: new ObjectId(purchaseOrderId) },
        ],
      },
    },
  ]);

const updateStatus = (purchaseOrderId: string, status: string) =>
  purchaseOrderModel.updateOne(
    { _id: new ObjectId(purchaseOrderId) },
    {
      $set: {
        status: status,
      },
    }
  );

const assignStorageKeeper = (purchaseOrderId: string, storageKeeper: string) =>
  purchaseOrderModel.updateOne(
    { _id: new Types.ObjectId(purchaseOrderId) },
    {
      $set: {
        "assignedEmployee.Storage_Keeper": storageKeeper,
      },
    }
  );

const assignDeliveryExecutive = (
  purchaseOrderId: string,
  deliveryExecutive: string
) =>
  purchaseOrderModel.updateOne(
    { _id: new ObjectId(purchaseOrderId) },
    {
      $set: {
        "assignedEmployee.Delivery_Executive": deliveryExecutive,
      },
    }
  );

const assignAccountant = (purchaseOrderId: string, Accountant: string) =>
  purchaseOrderModel.updateOne(
    { _id: new ObjectId(purchaseOrderId) },
    {
      $set: {
        "assignedEmployee.Accountant": Accountant,
      },
    }
  );

const getTotalAmountbyStatus = () =>
  purchaseOrderModel.aggregate([
    { $group: { _id: "$status", totalAmountbyStatus: { $sum: "$total" } } },
  ]);

export default {
  create,
  getAll,
  getOne,
  update,
  getbyStatus,
  deleteOne,
  calculateTotal,
  calculateProductTotal,
  getPreProductionPO,
  editProduct,
  assignfurnaceOperator,
  updateStatus,
  assignStorageKeeper,
  assignDeliveryExecutive,
  assignAccountant,
  getTotalAmountbyStatus,
  getPurchaseOrderById,
  checkIfNotManufactured,
};
