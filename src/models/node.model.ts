import mongoose from 'mongoose';

export interface RouteNode {
  [key: string]: string;
}

export interface NodeInput {
  key: string;
  value: RouteNode;
}

export interface NodeDocument extends NodeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const nodeSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    value: { type: Object },
  },
  {
    timestamps: true,
  }
);

const nodeModel = mongoose.model<NodeDocument>('Node', nodeSchema);

export default nodeModel;
