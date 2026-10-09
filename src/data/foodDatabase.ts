import { FoodItem, NutritionGoals } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: "chicken_biryani",
    name: "Chicken Biryani",
    category: "Main Dishes",
    cuisine: "South Asian",
    image: "assets/images/sample_biryani.jpg",
    confidence: 94,
    defaultPortion: 350,
    defaultUnit: "bowl",
    components: [
      { name: "Basmati Rice", confidence: 98 },
      { name: "Marinated Chicken", confidence: 95 },
      { name: "Caramelized Onions (Birista)", confidence: 91 },
      { name: "Aromatic Spices (Cardamom, Saffron, Star Anise)", confidence: 89 },
      { name: "Ghee & Vegetable Oil", confidence: 87 },
      { name: "Fresh Mint & Coriander", confidence: 93 }
    ],
    per100g: {
      calories: 185,
      protein: 9.1,
      carbs: 22.3,
      fat: 6.3,
      fibre: 1.7,
      totalSugar: 2.3,
      addedSugar: 0.0,
      naturalSugar: 2.3,
      sodium: 205,
      saturatedFat: 1.7,
      cholesterol: 27,
      potassium: 140
    },
    portionUnits: {
      grams: 1,
      serving: 300,
      bowl: 350,
      plate: 450,
      cup: 180,
      piece: 120
    },
    environmental: {
      co2PerKg: 3.8,
      impactLevel: "Medium",
      mainDrivers: "Poultry rearing, basmati rice paddy methane, and dairy ghee",
      drivingEquivalentKmPerKg: 15.5,
      sustainableTip: "Swapping half the chicken for chickpeas or paneer reduces carbon footprint by ~30%."
    },
    healthInsight: "Rich in lean protein and aromatic anti-inflammatory herbs like saffron and turmeric. Pair with cooling cucumber raita to enhance probiotic absorption and moderate glycemic impact."
  },
  {
    id: "salmon_quinoa_bowl",
    name: "Grilled Salmon & Quinoa Power Bowl",
    category: "Healthy Bowls",
    cuisine: "Modern California",
    image: "assets/images/hero_food_plate.jpg",
    confidence: 96,
    defaultPortion: 360,
    defaultUnit: "bowl",
    components: [
      { name: "Grilled Atlantic Salmon Fillet", confidence: 99 },
      { name: "Tri-Color Quinoa", confidence: 96 },
      { name: "Fresh Hass Avocado", confidence: 97 },
      { name: "Shelled Steamed Edamame", confidence: 94 },
      { name: "Roasted Sweet Potato Cubes", confidence: 92 },
      { name: "Microgreens & Pumpkin Seeds", confidence: 90 },
      { name: "Tahini Lemon Dressing", confidence: 88 }
    ],
    per100g: {
      calories: 161,
      protein: 8.9,
      carbs: 14.2,
      fat: 7.8,
      fibre: 3.4,
      totalSugar: 2.1,
      addedSugar: 0.0,
      naturalSugar: 2.1,
      sodium: 135,
      saturatedFat: 1.2,
      cholesterol: 24,
      potassium: 380
    },
    portionUnits: {
      grams: 1,
      serving: 320,
      bowl: 360,
      plate: 420,
      cup: 200,
      piece: 150
    },
    environmental: {
      co2PerKg: 3.2,
      impactLevel: "Medium",
      mainDrivers: "Sustainably farmed salmon feed and cold chain transport",
      drivingEquivalentKmPerKg: 13.0,
      sustainableTip: "Look for MSC or ASC certified wild or sustainably raised salmon to minimize marine ecosystem strain."
    },
    healthInsight: "Exceptional heart-health meal loaded with Omega-3 EPA/DHA fatty acids, complete amino acids from quinoa, and monounsaturated fats from avocado."
  },
  {
    id: "avocado_toast",
    name: "Sourdough Avocado Toast with Poached Egg",
    category: "Breakfast / Brunch",
    cuisine: "Artisanal",
    image: "assets/images/sample_avocado_toast.jpg",
    confidence: 95,
    defaultPortion: 210,
    defaultUnit: "serving",
    components: [
      { name: "Artisanal Sourdough Slice", confidence: 98 },
      { name: "Crushed Hass Avocado", confidence: 97 },
      { name: "Pasture-Raised Poached Egg", confidence: 99 },
      { name: "Micro Radish & Arugula", confidence: 91 },
      { name: "Chili Flakes & Sea Salt", confidence: 94 },
      { name: "Cold-Pressed Extra Virgin Olive Oil", confidence: 89 }
    ],
    per100g: {
      calories: 172,
      protein: 6.8,
      carbs: 16.5,
      fat: 9.1,
      fibre: 3.8,
      totalSugar: 1.1,
      addedSugar: 0.0,
      naturalSugar: 1.1,
      sodium: 260,
      saturatedFat: 1.8,
      cholesterol: 88,
      potassium: 290
    },
    portionUnits: {
      grams: 1,
      serving: 210,
      plate: 320,
      piece: 160,
      bowl: 240,
      cup: 150
    },
    environmental: {
      co2PerKg: 1.6,
      impactLevel: "Low",
      mainDrivers: "Avocado agricultural water footprint and pasture egg production",
      drivingEquivalentKmPerKg: 6.5,
      sustainableTip: "A low-carbon brunch choice. Selecting locally baked sourdough and regional eggs further cuts emissions."
    },
    healthInsight: "Slow-fermented sourdough provides prebiotic fructans with a gentler glucose response. Choline in the runny egg yolk optimizes brain health and focus."
  },
  {
    id: "acai_smoothie_bowl",
    name: "Organic Acai Berry Power Bowl",
    category: "Breakfast / Snack",
    cuisine: "Plant-Based",
    image: "assets/images/sample_smoothie_bowl.jpg",
    confidence: 93,
    defaultPortion: 320,
    defaultUnit: "bowl",
    components: [
      { name: "Organic Acai Berry Puree", confidence: 97 },
      { name: "Frozen Banana & Almond Milk Base", confidence: 95 },
      { name: "Fresh Strawberries & Blueberries", confidence: 98 },
      { name: "Chia Seeds & Hemp Hearts", confidence: 93 },
      { name: "Toasted Coconut Ribbons", confidence: 91 },
      { name: "Fresh Garden Mint", confidence: 89 }
    ],
    per100g: {
      calories: 118,
      protein: 2.8,
      carbs: 18.2,
      fat: 3.9,
      fibre: 4.2,
      totalSugar: 11.5,
      addedSugar: 0.0,
      naturalSugar: 11.5,
      sodium: 32,
      saturatedFat: 1.1,
      cholesterol: 0,
      potassium: 310
    },
    portionUnits: {
      grams: 1,
      serving: 280,
      bowl: 320,
      plate: 350,
      cup: 220,
      piece: 150
    },
    environmental: {
      co2PerKg: 1.1,
      impactLevel: "Low",
      mainDrivers: "Amazon rainforest agroforestry harvest and freezing transport",
      drivingEquivalentKmPerKg: 4.5,
      sustainableTip: "Acai cultivation naturally supports wild canopy preservation in the Amazon delta compared to livestock clear-cutting."
    },
    healthInsight: "Phenomenal anthocyanin antioxidant density. Naturally sweet from whole fruit fiber with zero added cane sugar. Excellent post-workout recovery breakfast."
  },
  {
    id: "mediterranean_salad",
    name: "Authentic Mediterranean Greek Salad",
    category: "Salads / Starters",
    cuisine: "Mediterranean",
    image: "assets/images/sample_mediterranean_salad.jpg",
    confidence: 96,
    defaultPortion: 280,
    defaultUnit: "bowl",
    components: [
      { name: "Authentic Greek Sheep Feta Cheese", confidence: 98 },
      { name: "Crisp Persian Cucumbers", confidence: 97 },
      { name: "Vine-Ripened Cherry Tomatoes", confidence: 99 },
      { name: "Kalamata Olives", confidence: 95 },
      { name: "Red Onion Slivers & Bell Pepper", confidence: 92 },
      { name: "Greek Oregano & Cold-Pressed EVOO", confidence: 94 }
    ],
    per100g: {
      calories: 115,
      protein: 4.2,
      carbs: 4.8,
      fat: 8.8,
      fibre: 1.9,
      totalSugar: 2.7,
      addedSugar: 0.0,
      naturalSugar: 2.7,
      sodium: 310,
      saturatedFat: 3.5,
      cholesterol: 18,
      potassium: 220
    },
    portionUnits: {
      grams: 1,
      serving: 240,
      bowl: 280,
      plate: 350,
      cup: 180,
      piece: 100
    },
    environmental: {
      co2PerKg: 1.8,
      impactLevel: "Low",
      mainDrivers: "Sheep/goat cheese processing and olive orchard cultivation",
      drivingEquivalentKmPerKg: 7.2,
      sustainableTip: "Mediterranean plant-forward diets have among the lowest ecological footprints in global dietary studies."
    },
    healthInsight: "High in cardioprotective polyphenols from extra virgin olive oil and lycopene from ripe tomatoes. Excellent for metabolic health and low glycemic index."
  },
  {
    id: "chicken_breast_rice",
    name: "Grilled Chicken Breast with Jasmine Rice & Broccoli",
    category: "Gym / High Protein",
    cuisine: "Clean Fitness",
    image: "assets/images/hero_food_plate.jpg",
    confidence: 92,
    defaultPortion: 350,
    defaultUnit: "plate",
    components: [
      { name: "Char-Grilled Chicken Breast", confidence: 98 },
      { name: "Steamed Jasmine Rice", confidence: 96 },
      { name: "Steamed Broccoli Florets", confidence: 95 },
      { name: "Garlic Herb Seasoning", confidence: 88 }
    ],
    per100g: {
      calories: 142,
      protein: 14.8,
      carbs: 15.2,
      fat: 2.1,
      fibre: 1.5,
      totalSugar: 0.8,
      addedSugar: 0.0,
      naturalSugar: 0.8,
      sodium: 180,
      saturatedFat: 0.5,
      cholesterol: 42,
      potassium: 295
    },
    portionUnits: {
      grams: 1,
      serving: 300,
      plate: 350,
      bowl: 320,
      cup: 190,
      piece: 180
    },
    environmental: {
      co2PerKg: 3.4,
      impactLevel: "Medium",
      mainDrivers: "Poultry farming grain feed and rice irrigation",
      drivingEquivalentKmPerKg: 13.8,
      sustainableTip: "Replacing one chicken meal a week with edamame or lentil curry saves up to 45 kg CO₂e per year."
    },
    healthInsight: "Gold standard bodybuilding macro split. High protein synthesis efficiency with minimal saturated fat for clean muscle recovery."
  },
  {
    id: "lentil_dal_roti",
    name: "Yellow Tadka Dal with Whole Wheat Roti",
    category: "Main Dishes",
    cuisine: "South Asian",
    image: "assets/images/sample_biryani.jpg",
    confidence: 90,
    defaultPortion: 320,
    defaultUnit: "plate",
    components: [
      { name: "Yellow Lentils (Moong/Toor Dal)", confidence: 96 },
      { name: "Whole Wheat Roti / Chapati", confidence: 97 },
      { name: "Cumin, Mustard Seed & Garlic Tadka", confidence: 91 },
      { name: "Tomato & Onion Gravy", confidence: 90 },
      { name: "Cilantro & Fresh Ghee", confidence: 87 }
    ],
    per100g: {
      calories: 135,
      protein: 6.4,
      carbs: 21.0,
      fat: 2.9,
      fibre: 4.8,
      totalSugar: 1.8,
      addedSugar: 0.0,
      naturalSugar: 1.8,
      sodium: 210,
      saturatedFat: 0.9,
      cholesterol: 4,
      potassium: 260
    },
    portionUnits: {
      grams: 1,
      serving: 280,
      plate: 320,
      bowl: 300,
      cup: 190,
      piece: 110
    },
    environmental: {
      co2PerKg: 0.9,
      impactLevel: "Low",
      mainDrivers: "Nitrogen-fixing pulses with minimal synthetic fertilizer needs",
      drivingEquivalentKmPerKg: 3.6,
      sustainableTip: "Pulses fix their own nitrogen into soil, making dal one of the most environmentally regenerative meals on Earth!"
    },
    healthInsight: "High dietary fibre and resistant starch nourish intestinal bifidobacteria and stabilize blood glucose over several hours."
  },
  {
    id: "pasta_primavera",
    name: "Classic Italian Pasta Primavera",
    category: "Pasta / Italian",
    cuisine: "Italian",
    image: "assets/images/sample_mediterranean_salad.jpg",
    confidence: 91,
    defaultPortion: 340,
    defaultUnit: "plate",
    components: [
      { name: "Durum Wheat Penne Pasta", confidence: 97 },
      { name: "Zucchini & Asparagus Tips", confidence: 93 },
      { name: "Cherry Tomatoes & Garlic", confidence: 95 },
      { name: "Aged Parmigiano Reggiano", confidence: 90 },
      { name: "Cold-Pressed Olive Oil & Fresh Basil", confidence: 92 }
    ],
    per100g: {
      calories: 148,
      protein: 5.2,
      carbs: 23.5,
      fat: 4.1,
      fibre: 2.6,
      totalSugar: 2.4,
      addedSugar: 0.0,
      naturalSugar: 2.4,
      sodium: 175,
      saturatedFat: 1.2,
      cholesterol: 6,
      potassium: 190
    },
    portionUnits: {
      grams: 1,
      serving: 300,
      plate: 340,
      bowl: 320,
      cup: 180,
      piece: 150
    },
    environmental: {
      co2PerKg: 1.4,
      impactLevel: "Low",
      mainDrivers: "Wheat milling and parmesan aging",
      drivingEquivalentKmPerKg: 5.7,
      sustainableTip: "Cooking pasta al dente uses less energy and lowers its glycemic index for sustained energy."
    },
    healthInsight: "Al dente durum wheat digests slowly, avoiding sharp insulin spikes. Loaded with lutein and zeaxanthin from garden vegetables."
  },
  {
    id: "tofu_veggie_stirfry",
    name: "Sesame Ginger Tofu & Vegetable Stir Fry",
    category: "Plant-Based",
    cuisine: "East Asian",
    image: "assets/images/hero_food_plate.jpg",
    confidence: 93,
    defaultPortion: 330,
    defaultUnit: "bowl",
    components: [
      { name: "Crispy Organic Firm Tofu", confidence: 97 },
      { name: "Snap Peas & Bell Peppers", confidence: 95 },
      { name: "Shiitake Mushrooms", confidence: 92 },
      { name: "Toasted Sesame Seeds & Oil", confidence: 91 },
      { name: "Tamari Soy Ginger Glaze", confidence: 94 },
      { name: "Brown Rice", confidence: 93 }
    ],
    per100g: {
      calories: 124,
      protein: 7.2,
      carbs: 13.8,
      fat: 4.6,
      fibre: 3.1,
      totalSugar: 2.9,
      addedSugar: 1.2,
      naturalSugar: 1.7,
      sodium: 290,
      saturatedFat: 0.7,
      cholesterol: 0,
      potassium: 270
    },
    portionUnits: {
      grams: 1,
      serving: 290,
      bowl: 330,
      plate: 380,
      cup: 190,
      piece: 140
    },
    environmental: {
      co2PerKg: 1.2,
      impactLevel: "Low",
      mainDrivers: "Non-GMO soybean processing and cold vegetable freight",
      drivingEquivalentKmPerKg: 4.8,
      sustainableTip: "Tofu generates over 85% less greenhouse gas than an equivalent portion of ground beef."
    },
    healthInsight: "Soy isoflavones promote vascular flexibility while shiitake mushrooms provide immune-supporting beta-glucans."
  },
  {
    id: "classic_cheeseburger",
    name: "Gourmet Beef Cheeseburger with Brioche Bun",
    category: "Comfort / Fast Casual",
    cuisine: "American",
    image: "assets/images/sample_biryani.jpg",
    confidence: 94,
    defaultPortion: 260,
    defaultUnit: "piece",
    components: [
      { name: "Grass-Fed Beef Patty", confidence: 98 },
      { name: "Toasted Brioche Bun", confidence: 97 },
      { name: "Melted Cheddar Cheese", confidence: 96 },
      { name: "Crisp Butter Lettuce & Tomato", confidence: 92 },
      { name: "Pickles & House Aioli Sauce", confidence: 89 }
    ],
    per100g: {
      calories: 254,
      protein: 13.6,
      carbs: 20.4,
      fat: 13.2,
      fibre: 1.2,
      totalSugar: 3.8,
      addedSugar: 2.2,
      naturalSugar: 1.6,
      sodium: 460,
      saturatedFat: 5.8,
      cholesterol: 58,
      potassium: 280
    },
    portionUnits: {
      grams: 1,
      piece: 260,
      serving: 260,
      plate: 380,
      bowl: 240,
      cup: 150
    },
    environmental: {
      co2PerKg: 14.5,
      impactLevel: "High",
      mainDrivers: "Bovine enteric fermentation, pasture land, and dairy cheese processing",
      drivingEquivalentKmPerKg: 58.0,
      sustainableTip: "Swapping beef for a turkey, portobello, or plant-based patty reduces emissions by 75% to 90%."
    },
    healthInsight: "High in bioavailable heme iron and zinc. Balance with dietary fiber throughout the rest of your day."
  }
];

export const DEFAULT_NUTRITION_GOALS: NutritionGoals = {
  calories: 2000,
  protein: 130,
  carbs: 240,
  fat: 65,
  fibre: 28,
  water: 2500,
  sugarLimit: 36,
  sodiumLimit: 2300
};
