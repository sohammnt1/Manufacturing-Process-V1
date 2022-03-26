
import { Schema, model, Types } from "mongoose";


class employeeRoleSchema extends Schema {
    constructor() {
        super({
            name: { type: String, required: true },
            },
         {
            timestamps: true,
        });
    }
}

const employeeRoleModel = model('employeerole', new employeeRoleSchema());

export default employeeRoleModel;
