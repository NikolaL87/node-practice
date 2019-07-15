const mongooose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Works only on create and save
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function(next) {
  // Only run if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm
  this.passwordConfirmation = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp > changedTimestamp;
  }

  // Not changes
  return false;
};

const User = mongooose.model('User', userSchema);

module.exports = User;
