import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Faq from "./models/Faq.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const FAQS = [
  {
    number: 1,
    q: "What is the ideal diet for weight loss?",
    a: "A calorie-deficit diet with high protein, high fiber, and low sugar helps in healthy weight loss."
  },
  {
    number: 2,
    q: "What is the ideal diet for weight gain?",
    a: "Eat more calories than you burn, including nuts, whole grains, dairy, and protein-rich foods."
  },
  {
    number: 3,
    q: "How many calories should I eat per day?",
    a: "Most adults need 1,600–2,500 calories depending on age, gender, and activity."
  },
  {
    number: 4,
    q: "Is it necessary to count calories?",
    a: "No, but calorie tracking helps control portions and stay consistent."
  },
  {
    number: 5,
    q: "What is a balanced diet?",
    a: "A diet with carbs, protein, healthy fats, fruits, vegetables, and enough water."
  },
  {
    number: 6,
    q: "How much water should I drink daily?",
    a: "2–3 liters per day, more if you sweat."
  },
  {
    number: 7,
    q: "Are supplements necessary?",
    a: "Only if your diet lacks nutrients or a doctor recommends them."
  },
  {
    number: 8,
    q: "Is intermittent fasting effective?",
    a: "Yes for many people, but not recommended for pregnant women or those with medical conditions."
  },
  {
    number: 9,
    q: "What is the best time to eat meals?",
    a: "Eat every 3–4 hours and avoid heavy late-night meals."
  },
  {
    number: 10,
    q: "Are carbs bad?",
    a: "No. Whole carbs are healthy; refined carbs should be limited."
  },
  {
    number: 11,
    q: "Why am I not losing weight even after dieting?",
    a: "Possible reasons include hidden calories, poor sleep, stress, or lack of exercise."
  },
  {
    number: 12,
    q: "How to reduce belly fat?",
    a: "Eat fewer calories, increase protein, reduce sugar, and do strength training."
  },
  {
    number: 13,
    q: "How much protein do I need for fat loss?",
    a: "1.2–1.6 g per kg body weight daily."
  },
  {
    number: 14,
    q: "Can I lose weight without exercise?",
    a: "Yes, but exercise makes fat loss faster and healthier."
  },
  {
    number: 15,
    q: "Why does my weight fluctuate?",
    a: "Due to water retention, salt intake, digestion, and hormones."
  },
  {
    number: 16,
    q: "What diet is best for diabetes?",
    a: "Low sugar, high fiber, controlled carbohydrates, and regular meals."
  },
  {
    number: 17,
    q: "What diet is best for high BP?",
    a: "A low-salt diet with fruits, vegetables, and lean protein (DASH diet)."
  },
  {
    number: 18,
    q: "What should I eat for high cholesterol?",
    a: "High-fiber foods like oats, nuts, fruits, and fewer fried foods."
  },
  {
    number: 19,
    q: "What diet helps with thyroid issues?",
    a: "Balanced protein, iodine, and selenium; avoid excessive soy."
  },
  {
    number: 20,
    q: "What foods reduce inflammation?",
    a: "Turmeric, berries, nuts, olive oil, and green tea."
  },
  {
    number: 21,
    q: "What should I eat before a workout?",
    a: "A small meal with carbs and protein, like oats or a banana with peanut butter."
  },
  {
    number: 22,
    q: "What should I eat after a workout?",
    a: "Protein plus carbs, like eggs, whey protein, chicken, or smoothies."
  },
  {
    number: 23,
    q: "Is whey protein safe?",
    a: "Yes, for most people; it is a milk-based protein supplement."
  },
  {
    number: 24,
    q: "How to gain muscle naturally?",
    a: "Eat high protein, lift weights, and sleep well."
  },
  {
    number: 25,
    q: "How much protein is too much?",
    a: "More than 2.2 g per kg body weight daily may stress kidneys."
  },
  {
    number: 26,
    q: "What should I eat for acidity?",
    a: "Bananas, coconut water, cucumbers; avoid spicy and fried foods."
  },
  {
    number: 27,
    q: "What should I eat for constipation?",
    a: "Fiber-rich foods, fruits, vegetables, and plenty of water."
  },
  {
    number: 28,
    q: "Why do I feel bloated?",
    a: "Eating too fast, heavy meals, or gas-producing foods."
  },
  {
    number: 29,
    q: "How to improve gut health?",
    a: "Eat probiotics, fiber, hydrate well, and avoid junk food."
  },
  {
    number: 30,
    q: "Are probiotics useful?",
    a: "Yes, they improve digestion and immunity."
  },
  {
    number: 31,
    q: "Is keto diet safe?",
    a: "Short-term yes; long-term may cause nutrient deficiencies."
  },
  {
    number: 32,
    q: "Should I follow gluten-free diet?",
    a: "Only if you are gluten intolerant or have celiac disease."
  },
  {
    number: 33,
    q: "Are vegan diets healthy?",
    a: "Yes, if you ensure protein, B12, iron, and omega-3 intake."
  },
  {
    number: 34,
    q: "What is the Mediterranean diet?",
    a: "A diet rich in vegetables, fruits, olive oil, and fish."
  },
  {
    number: 35,
    q: "Is detox dieting helpful?",
    a: "No strong evidence; the body naturally detoxes."
  },
  {
    number: 36,
    q: "How many meals should I eat daily?",
    a: "Three main meals and one or two healthy snacks."
  },
  {
    number: 37,
    q: "Are snacks healthy?",
    a: "Yes, if you choose nuts, fruits, yogurt, or roasted foods."
  },
  {
    number: 38,
    q: "Is eating late at night harmful?",
    a: "Yes, it may cause indigestion and fat gain."
  },
  {
    number: 39,
    q: "How to stop sugar cravings?",
    a: "Eat enough protein, drink water, and avoid long meal gaps."
  },
  {
    number: 40,
    q: "Is tea or coffee harmful?",
    a: "Not in moderation; limit sugar and cream."
  },
  {
    number: 41,
    q: "Do bananas cause weight gain?",
    a: "No, bananas are healthy and do not cause fat gain by themselves."
  },
  {
    number: 42,
    q: "Is brown rice better than white rice?",
    a: "Brown rice has more fiber, but portion size matters more."
  },
  {
    number: 43,
    q: "Should I avoid dairy?",
    a: "Only if lactose intolerant; otherwise dairy is healthy."
  },
  {
    number: 44,
    q: "Are artificial sweeteners safe?",
    a: "Safe in moderate amounts."
  },
  {
    number: 45,
    q: "Is fruit juice healthy?",
    a: "Less healthy than whole fruits because juice has no fiber."
  },
  {
    number: 46,
    q: "What is the best diet for busy professionals?",
    a: "Simple meals: eggs, fruits, nuts, yogurt, oats, salads, and meal-prepped dishes."
  },
  {
    number: 47,
    q: "What should I eat while traveling?",
    a: "Nuts, fruits, protein bars, sandwiches, and water."
  },
  {
    number: 48,
    q: "How to plan meals for a week?",
    a: "Prepare a list, batch-cook protein, and pre-cut vegetables."
  },
  {
    number: 49,
    q: "How to stay consistent with diet?",
    a: "Keep meals simple, track progress, and avoid extreme dieting."
  },
  {
    number: 50,
    q: "How long to see results?",
    a: "Usually 3–6 weeks with proper diet and discipline."
  }
];

async function seedDB() {
  if ((await Faq.countDocuments()) === 0) {
    await Faq.insertMany(
      FAQS.map((f) => ({ number: f.number, question: f.q, answer: f.a }))
    );
    console.log("Seeded 50 FAQs to MongoDB");
  }
}
seedDB().catch(console.error);

function findBestMatch(userQuestion) {
  const lowerUser = userQuestion.toLowerCase();
  let best = FAQS[0];
  let maxScore = 0;

  for (const faq of FAQS) {
    const lowerFAQ = faq.q.toLowerCase();
    let score = 0;
    const userWords = lowerUser.split(/\s+/);
    for (const word of userWords) {
      if (word.length > 2 && lowerFAQ.includes(word)) score++;
    }
    if (score > maxScore) {
      maxScore = score;
      best = faq;
    }
  }
  return best;
}

app.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.find().select("number question answer");
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/query", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  const match = findBestMatch(question);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const prompt = `You are a helpful diet advisor. Answer the user's question using only this FAQ as context: 
FAQ: ${match.q}
Answer: ${match.a}

User question: ${question}

Rules:
- Keep it natural, 1-2 sentences max.
- Base your answer ONLY on the FAQ—do not add external info.
- End EXACTLY with: (Ref: Question #${match.number})`;

    const result = await model.generateContent(prompt);
    const answer = await result.response.text();

    res.json({ answer: answer.trim() });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.json({
      answer: `${match.a} (Ref: Question #${match.number})`
    });
  }
});

app.listen(port, () => {
  console.log(` Backend running on http://localhost:${port}`);
  console.log(" Ready for queries!");
});
