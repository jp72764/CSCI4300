import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username?: string;
  lastLogin?: Date;
  // Add other fields as needed (e.g., role, imageURL)
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    lastLogin: { type: Date },
    // Add other fields here as needed
  },
  { timestamps: true }
);

const User = models.User<IUser> || model<IUser>("User", UserSchema, 'users');

export default User;