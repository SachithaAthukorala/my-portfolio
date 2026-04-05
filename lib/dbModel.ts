// Mongoose model for portfolio site data.
// One document stores all portfolio content (single-document pattern).
import mongoose, { Schema, Model } from 'mongoose'

// Omit the base Document._id (ObjectId) and redeclare as string
// because this schema uses a custom string _id ('main').
export interface ISiteData extends Omit<mongoose.Document, '_id'> {
  _id: string
  siteConfig: Record<string, unknown>
  stats: unknown[]
  skills: unknown[]
  projects: unknown[]
  blogPosts: unknown[]
  photoCategories: unknown[]
  experiences: unknown[]
  certifications: unknown[]
  updatedAt: Date
}

const SiteDataSchema = new Schema<ISiteData>(
  {
    _id: { type: String, default: 'main' },
    siteConfig:      { type: Schema.Types.Mixed, default: {} },
    stats:           { type: [Schema.Types.Mixed], default: [] },
    skills:          { type: [Schema.Types.Mixed], default: [] },
    projects:        { type: [Schema.Types.Mixed], default: [] },
    blogPosts:       { type: [Schema.Types.Mixed], default: [] },
    photoCategories: { type: [Schema.Types.Mixed], default: [] },
    experiences:     { type: [Schema.Types.Mixed], default: [] },
    certifications:  { type: [Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: true,
    _id: false, // We manage _id ourselves
  }
)

// Prevent model recompilation in development hot-reload
const SiteDataModel: Model<ISiteData> =
  (mongoose.models.SiteData as Model<ISiteData>) ||
  mongoose.model<ISiteData>('SiteData', SiteDataSchema)

export default SiteDataModel
