
import { Schema, model, Types } from "mongoose";


class furnaceSchema extends Schema {
    constructor() {
        super({
            name: { type: String, required: true },
            isAvailable :{type:Boolean,default:true,required:true},
            operator:{type:String}
        },
         {
            timestamps: true,
        });
    }
}

const furnaceModel = model('furnace', new furnaceSchema());

export default furnaceModel;
