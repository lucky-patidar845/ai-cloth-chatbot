const express = require("express");
const router = express.Router();
const Product = require("../models/product");

/* =====================================================
   🧠 In-memory chat context (short-term memory)
   ===================================================== */
let chatContext = {
  product: null,
  material: null,
  category: null
};

/* =====================================================
   🎯 Intent Detection
   ===================================================== */
function detectIntent(message) {
  if (
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("how much")
  ) {
    return "ask_price";
  }

  if (message.includes("have") || message.includes("available")) {
    return "check_availability";
  }

  if (message.includes("hi") || message.includes("hello")) {
    return "greeting";
  }

  if (message.includes("start over") || message.includes("new")) {
    return "reset";
  }

  return "unknown";
}

/* =====================================================
   🧩 DYNAMIC Entity Extraction (FROM MONGODB)
   ===================================================== */
async function extractEntities(message) {
  const entities = {};

  // Get products dynamically from DB
  const products = await Product.distinct("product");

  products.forEach((p) => {
    const singular = p.toLowerCase();
    const plural = singular + "s";

    if (
      message.includes(singular) ||
      message.includes(plural)
    ) {
      entities.product = singular;
    }
  });

  // Materials
  ["cotton", "denim", "rayon", "wool"].forEach((m) => {
    if (message.includes(m)) entities.material = m;
  });

  // Categories
  ["men", "women"].forEach((c) => {
    if (message.includes(c)) entities.category = c;
  });

  return entities;
}


/* =====================================================
   💬 Main Chat Route
   ===================================================== */
router.post("/", async (req, res) => {
  try {
    const message = req.body.message.toLowerCase();

    const intent = detectIntent(message);
    const entities = await extractEntities(message);

    /* ---------- Reset Context ---------- */
    if (intent === "reset") {
      chatContext = { product: null, material: null, category: null };
      return res.json({
        reply: "Sure 😊 Let’s start fresh. What are you looking for?"
      });
    }

    /* ---------- Update Memory ---------- */
    if (entities.product) chatContext.product = entities.product;
    if (entities.material) chatContext.material = entities.material;
    if (entities.category) chatContext.category = entities.category;

    const finalEntities = {
      product: entities.product || chatContext.product,
      material: entities.material || chatContext.material,
      category: entities.category || chatContext.category
    };

    /* ---------- Greeting ---------- */
    if (intent === "greeting") {
      return res.json({
        reply: "Hello 😊 How can I help you today?"
      });
    }

    /* ---------- Availability ---------- */
    if (intent === "check_availability") {
      if (!finalEntities.product) {
        return res.json({
          reply: "Sure 😊 Which product are you looking for?"
        });
      }

      const query = { product: finalEntities.product };

      if (finalEntities.material) query.material = finalEntities.material;
      if (finalEntities.category) query.category = finalEntities.category;

      const items = await Product.find(query);

      if (items.length === 0) {
        return res.json({
          reply: `Sorry 😔 We don’t have ${finalEntities.product} right now.`
        });
      }

      const item = items[0];

      return res.json({
        reply: `Yes 😊 We have ${item.material} ${item.product} for ${item.category}.
Price: ₹${item.price}
Colors: ${item.colors.join(", ")}
Sizes: ${item.sizes.join(", ")}`
      });
    }

    /* ---------- Price ---------- */
    if (intent === "ask_price") {
      if (!finalEntities.product) {
        return res.json({
          reply: "Please tell me which product you want the price for 😊"
        });
      }

      const item = await Product.findOne({
        product: finalEntities.product
      });

      if (!item) {
        return res.json({
          reply: "Sorry 😔 That product is not available."
        });
      }

      return res.json({
        reply: `The price of ${item.material} ${item.product} is ₹${item.price}.`
      });
    }

    /* ---------- Fallback ---------- */
    return res.json({
      reply: "I’m still learning 😊 You can ask about products, prices, or availability."
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.json({
      reply: "Something went wrong 😔 Please try again."
    });
  }
});

module.exports = router;
