import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  clerkId: String;
  name: String;
  userName: String;
  email: String;
  bio?: String;
  avatar?: String;
  location?: String;
  portfolioWebsite?: String;
  reputation?: Number;
  joinedDate: Date;
  questions: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  isDeleted?: boolean;
  deletedOn?: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  reputation: {
    type: Number,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedOn: {
    type: Date,
    default: null,
  },
});

export default models?.User || model("User", UserSchema);
