import productTypeRepo from "./productType.repo";

const displayProductType = async () => {
  try {
    const result = productTypeRepo.getAll();
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  displayProductType,
};
