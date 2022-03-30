import customerRepo from "./customer.repo";
import { ICustomer } from "./customer.types";

const createCustomer = async (customer: ICustomer) => {
  try {
    const customerData = customer;
    const result = await customerRepo.create(customerData);
    return result;
  } catch (error) {
    throw error;
  }
};

const displayCustomers = async (customerId: string) => {
  try {
    let result;
    if (customerId) {
      result = customerRepo.getOne(customerId);
    } else {
      result = customerRepo.getAll();
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const editCustomer = async (updated_data: ICustomer) => {
  try {
    const result = await customerRepo.update(updated_data);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteCustomer = async (customerId: string) => {
  try {
    const result = await customerRepo.deleteOne(customerId);
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createCustomer,
  displayCustomers,
  editCustomer,
  deleteCustomer,
};
