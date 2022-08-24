import {Schema, model} from "mongoose";

const CompliantSchema = new Schema({
  compliant_by: {type: String, required: true},
  compliant_on: {type: String, required: true},
  type: {type: String, required: true}, // user || property
  message: {type: String, required: true},
  status: {
    type: String, // active || closed
    default: 'active'
  }

  });


const Compliant = model("Compliants", CompliantSchema);

export default Compliant
