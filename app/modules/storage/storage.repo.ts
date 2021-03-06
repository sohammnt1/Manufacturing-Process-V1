import storageModel from "./storage.schema";
import { IStorage } from "./storage.types";
import { ObjectId } from "mongodb";

const create = (storage: IStorage) => storageModel.create(storage);

const getAll = (page: number, itemsPerPage: number) =>
  storageModel
    .find()
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

const getOne = (storageId: string) =>
  storageModel.findOne({ storageId: new ObjectId(storageId) });

const getByFilter = (filterQuery: any, page: number, itemsPerPage: number) =>
  storageModel
    .find({ $and: filterQuery })
    .populate("storageRackIds", "rackNumber")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

const update = (updated_data: IStorage) =>
  storageModel.updateOne(
    {
      _id: updated_data._id,
    },
    updated_data
  );

const deleteOne = (purchaseOrderId: string) =>
  storageModel.deleteMany({ purchaseOrderId: new ObjectId(purchaseOrderId) });

export default {
  create,
  getAll,
  getOne,
  update,
  getByFilter,
  deleteOne,
};
