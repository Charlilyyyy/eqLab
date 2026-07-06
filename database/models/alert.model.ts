import { Schema, model, models, type Document } from 'mongoose';

export type AlertType = 'upper' | 'lower';

export interface AlertDocument extends Document {
  userId: string;
  userEmail: string;
  symbol: string;
  company: string;
  alertName: string;
  alertType: AlertType;
  threshold: number;
  isActive: boolean;
  createdAt: Date;
  lastSent?: Date | null;
}

const AlertSchema = new Schema<AlertDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    alertName: {
      type: String,
      required: true,
      trim: true,
    },
    alertType: {
      type: String,
      required: true,
      enum: ['upper', 'lower'],
    },
    threshold: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastSent: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'alerts',
  }
);

AlertSchema.index({ userId: 1, symbol: 1, alertType: 1 });
AlertSchema.index({ userId: 1, isActive: 1 });
AlertSchema.index({ symbol: 1, alertType: 1, isActive: 1 });

const Alert =
  models?.Alert || model<AlertDocument>('Alert', AlertSchema);

export default Alert;
