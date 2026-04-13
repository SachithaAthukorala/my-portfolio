// Mongoose model for contact form messages
import mongoose, { Schema, Model } from 'mongoose'

export interface IContactMessage {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true },
    subject: { type: String, default: '', trim: true },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Prevent model recompilation in development hot-reload
const ContactMessage: Model<IContactMessage> =
  (mongoose.models.ContactMessage as Model<IContactMessage>) ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema)

export default ContactMessage
