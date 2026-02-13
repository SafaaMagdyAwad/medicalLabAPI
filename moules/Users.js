import mongoose from "mongoose";
import bcrypt from "bcrypt";

const options = {
  discriminatorKey: "role",
  timestamps: true,
};

/* ================= Base User ================= */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
    },
  },
  options
);

const User = mongoose.model("User", UserSchema);

/* ================= Doctor Schema ================= */
const StaffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,

    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          value
        );
      },
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    },

    select: false, // ✅ hide password by default
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date, // ✅ correct type

  image: String,

  description: String,
});

/* ================= Hash Password Middleware ================= */
StaffSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


/* ================= Compare Password Method ================= */
StaffSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ================= Doctor Model ================= */
const Doctor = User.discriminator("Doctor", StaffSchema);
const Assistant = User.discriminator("Assistant", StaffSchema);

/* ================= Patient ================= */

const Patient = User.discriminator(
  "Patient",
  new mongoose.Schema({
    email: {
      type: String,
      required: false,
      unique: true,
    },
  })
);




export { User, Doctor, Patient, Assistant };
