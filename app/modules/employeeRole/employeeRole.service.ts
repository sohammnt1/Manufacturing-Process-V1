import employeeRoleRepo from "./employeeRole.repo";

const displayEmployeeRole = async () => {
    try {
        const result = employeeRoleRepo.getAll();
        return result;
    } catch (error) {
        throw error;
    }
}

export default {
    displayEmployeeRole,
   }