import { Schema, model } from 'mongoose';

const petSchema = new Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    adopted: { type: Boolean, default: false }
}, { timestamps: true });

const PetModel = model('pets', petSchema);
export default PetModel;