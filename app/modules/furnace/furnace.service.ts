import furnaceRepo from "./furnace.repo";

const displayFurnace = async () => {
    try {
        const result = furnaceRepo.getAll();
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    displayFurnace,
   }