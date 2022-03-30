import storageModel from "./storage.schema";
import { IStorage } from "./storage.types";
import {ObjectId} from "mongodb";

const create = (storage: IStorage) => storageModel.create(storage);

const getAll = () => storageModel.find()

const getOne = (storageId: string) => storageModel.findOne({ storageId: storageId })

const getByFilter = (filterQuery: any) => storageModel.find({
    $and: filterQuery
}).populate("storageRackIds","rackNumber");

const update = (updated_data: IStorage) => storageModel.updateOne({
    _id : updated_data._id
}, updated_data);

const deleteOne = (purchaseOrderId: any) => storageModel.deleteMany(
    { purchaseOrderId: purchaseOrderId } 
);

export default {
    create,
    getAll,
    getOne,
    update,
    getByFilter,
    deleteOne
}