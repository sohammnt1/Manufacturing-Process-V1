import customerModel from "./customer.schema";
import { ICustomer } from "./customer.types";
import { ObjectId } from "mongodb";

const create = (customer: ICustomer) => customerModel.create(customer);

const getAll = (page: number, itemsPerPage: number) =>
  customerModel
    .find({ deleted: false })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage);

const getOne = (customerId: string) =>
  customerModel.findOne({ _id: new ObjectId(customerId) }, { deleted: false });

const update = (updated_data: ICustomer) =>
  customerModel.updateOne(
    {
      _id: updated_data._id,
    },
    updated_data
  );

const deleteOne = (customerId: string) =>
  customerModel.updateOne({ customerId: customerId }, { deleted: true });

export default {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
};
