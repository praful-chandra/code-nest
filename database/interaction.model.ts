"use server";

import { Document, Schema, model, models } from "mongoose";

export interface IInteraction extends Document {
  userId: Schema.Types.ObjectId;
  actionType: string;
  question?: Schema.Types.ObjectId;
  answer?: Schema.Types.ObjectId;
  tags?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const InteractionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: "Answer",
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
