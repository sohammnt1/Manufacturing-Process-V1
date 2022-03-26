
import { Schema, model, Types } from "mongoose";


class storageRackSchema extends Schema {
    constructor() {
        super({
            rackNumber: { type: String, required: true },
            },
         {
            timestamps: true,
        });
    }
}

const storageRackModel = model('storagerack', new storageRackSchema());

export default storageRackModel;
