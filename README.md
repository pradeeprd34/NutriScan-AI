# NutriScan AI 🌿

> **"Snap your food. Understand your nutrition."**  
> AI-powered food recognition, dynamic portion nutrition estimation, daily calorie tracking, and ecological carbon footprint analysis.

---

## 📁 Complete Folder Structure

```
NutriScan-AI/
├── package.json                 # Project dependencies & npm scripts (dev, build, preview)
├── vite.config.ts               # Vite bundler configuration
├── tsconfig.json                # TypeScript compiler configuration
├── tsconfig.node.json           # TypeScript Node configuration
├── .env.example                 # Environment template with AI API key instructions
├── .gitignore                   # Git ignore rules
├── index.html                   # Main entry HTML file
├── README.md                    # Documentation & setup guide
├── public/                      # Static public assets
│   ├── favicon.svg              # Brand SVG favicon
│   └── assets/
│       └── images/              # Food imagery (Salmon bowl, Biryani, Avocado toast, etc.)
│           ├── hero_food_plate.jpg
│           ├── sample_biryani.jpg
│           ├── sample_avocado_toast.jpg
│           ├── sample_smoothie_bowl.jpg
│           └── sample_mediterranean_salad.jpg
├── src/                         # React + TypeScript Source Code
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root application component
│   ├── index.css                # Full responsive design system & theme variables
│   ├── types/
│   │   └── index.ts             # TypeScript definitions (Nutrients, Food, Goals, etc.)
│   ├── data/
│   │   └── foodDatabase.ts      # 50+ dishes reference database with per-100g values
│   ├── services/
│   │   ├── aiService.ts         # Google Gemini Vision API & offline classifier
│   │   ├── nutritionCalculator.ts # Real-time portion & macro calculation engine
│   │   └── audioService.ts      # Web Audio API sound synthesis
│   ├── context/
│   │   └── AppContext.tsx       # Global state management (food, goals, tracker, history)
│   └── components/
│       ├── Navbar.tsx           # Navigation bar with theme/sound toggles & mobile drawer
│       ├── Hero.tsx             # Hero section with animated laser scanner HUD
│       ├── MobileBottomNav.tsx  # Mobile bottom quick navigation
│       ├── Footer.tsx           # Footer with links and disclaimers
│       ├── Toast.tsx            # Floating toast notification system
│       ├── Scanner/
│       │   ├── Scanner.tsx      # Dual input: live webcam & drag-and-drop upload
│       │   ├── CameraModal.tsx  # Device camera stream with camera flip & shutter
│       │   └── AnalysisHUD.tsx  # 5-step animated scanning HUD
│       ├── Results/
│       │   ├── ResultsDashboard.tsx # Results assembly & estimation disclaimer
│       │   ├── FoodIdentityCard.tsx # Detected dish title & ingredient confidence chips
│       │   ├── PortionController.tsx# Stepper, grams input, units & quick multipliers
│       │   ├── NutritionOverview.tsx# Calories banner & macro progress bars
│       │   ├── MacroDonutChart.tsx  # Interactive SVG donut distribution chart
│       │   ├── FibreAnalysisCard.tsx# Fibre classification against 28g RDI
│       │   ├── SugarAnalysisCard.tsx# Total vs added vs natural sugar analysis
│       │   ├── MicronutrientsGrid.tsx# Sodium, Saturated Fat, Cholesterol, Potassium
│       │   └── CarbonImpactCard.tsx # CO2e emissions, driving distance & eco tips
│       ├── Tracker/
│       │   └── DailyTracker.tsx     # Today's calories radial ring & meal timeline
│       ├── History/
│       │   └── MealHistory.tsx      # Meal history cards & CSV/JSON export
│       ├── Guidance/
│       │   └── HealthyGuidance.tsx  # Specific guidance for Athletes, Students, Pros
│       └── Modals/
│           ├── GoalsModal.tsx       # Goal settings modal with 1-click presets
│           └── EditFoodModal.tsx    # Food correction modal with instant search
└── standalone/                  # Zero-dependency instant-run version
    ├── index.html
    ├── css/styles.css
    ├── js/app.js
    └── js/food-database.js
```

---

## ⚡ Quick Start: Running in VS Code

### Step 1: Open in VS Code
Open your terminal and run:
```bash
code /Users/apple/.gemini/antigravity-ide/scratch/nutriscan-ai
```
*(Or open VS Code → File → Open Folder → navigate to `/Users/apple/.gemini/antigravity-ide/scratch/nutriscan-ai`)*

### Step 2: Install Dependencies
In the VS Code integrated terminal (`Ctrl + \`` or `Cmd + \``):
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 AI Vision API Integration (Optional)

The project includes built-in dual-mode AI recognition:
- **Offline Mode (Default)**: Uses intelligent client-side vision classification matching against the curated 50+ item food database. No API key required!
- **Live Google Gemini Vision (Optional)**:
  1. Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
  2. Open `.env` and paste your free Google Gemini API key:
     ```env
     VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```
  Get a key for free from: [Google AI Studio](https://aistudio.google.com/).

---

## 🌐 Instant Zero-Build Mode (No Node Required)

If you want to run the project immediately without installing Node/npm:
```bash
cd /Users/apple/.gemini/antigravity-ide/scratch/nutriscan-ai
python3 -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

## 📦 Download the Entire Project as a `.zip`

You can download the full project archive directly in your browser:
👉 **[http://localhost:8080/NutriScan-AI.zip](http://localhost:8080/NutriScan-AI.zip)**

Or copy it directly to your Desktop from terminal:
```bash
cp /Users/apple/.gemini/antigravity-ide/scratch/NutriScan-AI.zip ~/Desktop/
```
