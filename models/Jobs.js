const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
  },
  location: {
    type: Array,
    require: true,
  },
  minSalary: {
    type: String,
    require: true,
  },
  maxSalary: {
    type: String,
    require: true,
  },
  snippet: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  applyURL: {
    type: String,
    require: true,
  },
  posted_time: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
