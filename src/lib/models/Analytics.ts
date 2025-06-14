import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  revenue: {
    type: Number,
    required: true,
  },
  customers: {
    type: Number,
    required: true,
  },
  growth: {
    type: Number,
    required: true,
  },
  topProducts: [{
    name: String,
    value: Number,
  }],
  monthlyTrend: [{
    date: String,
    value: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
AnalyticsSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema); 