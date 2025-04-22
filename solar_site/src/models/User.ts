import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { 
      type: String, 
      unique: true, 
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    username: { 
      type: String, 
      unique: true, 
      required: [true, 'Username is required'],
      trim: true
    },
    lastLogin: { type: Date }
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

// Safe initialization check
const User = models?.User || model<IUser>("User", UserSchema, 'users');

export default User;
