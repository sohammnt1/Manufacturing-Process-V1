import purchaseOrderModel from "./manufacturing.schema";
import { IPurchaseOrder } from "./manufacturing.types";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

const create = (purchaseOrder: IPurchaseOrder) =>
  purchaseOrderModel.create(purchaseOrder);

const getAll = () => purchaseOrderModel.find();

const getOne = (purchaseOrderId: string) =>
  purchaseOrderModel.findOne({
    purchaseOrderId: new ObjectId(purchaseOrderId),
  });

const getbyStatus = (status: string) =>
  purchaseOrderModel.find({
    $and: [{ status: status }, { deleted: false }],
  });

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

const calculateTotal = (purchaseOrderId: ObjectId) =>
  purchaseOrderModel.aggregate([
    { $unwind: "$product" },
    { $match: { _id: purchaseOrderId } },
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

export default {
  create,
  getAll,
  getOne,
  update,
  getbyStatus,
  deleteOne,
  calculateTotal,
  calculateProductTotal,
};
