/**
 * THE MODEL FILE MANAGES THE DATA OF AN APPLICATION.
 */
const mongoose = require("mongoose");

// Create schema
const catchphraseSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
    },
    catchphrase: {
      type: String,
    },
    movieContext: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Make model based on the schema above, then export it
module.exports = mongoose.model("Catchphrase", catchphraseSchema);
