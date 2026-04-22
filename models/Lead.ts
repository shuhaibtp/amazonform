import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  code: string;
  country: string;
  state?: string;
  seller?: string;
  manager?: string;
  brand?: string;
  asins?: string;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String },
  seller: { type: String },
  manager: { type: String },
  brand: { type: String },
  asins: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
