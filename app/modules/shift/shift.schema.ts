
import { Schema, model, Types } from "mongoose";


class shiftSchema extends Schema {
    constructor() {
        super({
            name: { type: String, required: true },
        },
         {
            timestamps: true,
        });
    }
}

const shiftModel = model('shift', new shiftSchema());

export default shiftModel;
