import storageRackRepo from "./storageRack.repo";

const displayStorageRack = async () => {
  try {
    const result = storageRackRepo.getAll();
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  displayStorageRack,
};
