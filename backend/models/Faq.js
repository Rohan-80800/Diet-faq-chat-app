// backend/models/Faq.js
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  number: Number,
  question: String,
  answer: String
});

export default mongoose.model("Faq", faqSchema);
