import { Schema, Document, models, model } from "mongoose";

export interface IAnswer extends Document {
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  answerContent: string;
  createdAt: Date;
  isEdited: boolean;
  editedAt: Date | null;
}

const AnswerSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  answerContent: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
  editedAt: { type: Date, default: null },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
