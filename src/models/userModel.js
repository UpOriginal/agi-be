const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      street: {
        type: String
        // required: true
      },
      city: {
        type: String
        // required: true
      },
      state: {
        type: String
        // required: true
      },
      zipCode: {
        type: String
        // required: true
      },
      country: {
        type: String
      }
    },
    licenseInfo: {
      board: {
        type: String
      },
      licenseNumber: {
        type: Boolean
      },
      activeLicense: {
        type: Boolean
      },
      licenseIssued: {
        type: Boolean
      },
      agentType: {
        type: Boolean
      }
    },
    legal: {
      complaintsFiled: {
        type: Boolean
      },
      licenseSuspended: {
        type: Boolean
      }
    },
    transferLicense: Boolean
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const hashedPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, newPasswod) => {
      if (err) {
        return reject(err);
      }
      resolve(newPasswod);
    });
  });
};

const Agent = mongoose.model("agent", userSchema);

module.exports = Agent;
