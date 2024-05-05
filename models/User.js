const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bio: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  interestedInGender: {
    type: [String],
    enum: ['male', 'female', 'both'],
    required: true
  },
  interestedInCountry: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  profilePicture: String,
  rightUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  leftUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geolocation
userSchema.index({ location: '2dsphere' });

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;