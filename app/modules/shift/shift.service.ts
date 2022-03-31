import shiftRepo from "./shift.repo";

const displayShift = async () => {
  try {
    const result = shiftRepo.getAll();
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  displayShift,
};
