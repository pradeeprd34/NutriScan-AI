import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, NutrientCalculation, NutritionGoals, LoggedMeal, PortionUnit, ThemeMode, MealType } from '../types';
import { FOOD_DATABASE, DEFAULT_NUTRITION_GOALS } from '../data/foodDatabase';
import { calculateNutrition } from '../services/nutritionCalculator';
import { playSound } from '../services/audioService';
import { analyzeFoodImage } from '../services/aiService';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  currentFood: FoodItem | null;
  currentNutrients: NutrientCalculation | null;
  portionUnit: PortionUnit;
  portionQuantity: number;
  activeImage: string;
  isAnalyzing: boolean;
  scanStepIndex: number;
  scanStepName: string;
  goals: NutritionGoals;
  todayMeals: LoggedMeal[];
  history: LoggedMeal[];
  waterMl: number;
  isGoalsModalOpen: boolean;
  setIsGoalsModalOpen: (open: boolean) => void;
  isEditFoodModalOpen: boolean;
  setIsEditFoodModalOpen: (open: boolean) => void;
  toast: { text: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  setFood: (food: FoodItem, customImage?: string, autoScroll?: boolean) => void;
  setPortion: (quantity: number, unit?: PortionUnit) => void;
  runAnalysis: (imageSrc: string) => Promise<void>;
  logMeal: (mealType: MealType) => void;
  deleteTodayMeal: (id: string) => void;
  addWater: (amount?: number) => void;
  updateGoals: (newGoals: NutritionGoals) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('nutriscan_theme') as ThemeMode) || 'dark';
  });

  // Sound State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Food & Portion State
  const [currentFood, setCurrentFood] = useState<FoodItem | null>(() => FOOD_DATABASE[0]);
  const [portionUnit, setPortionUnit] = useState<PortionUnit>('bowl');
  const [portionQuantity, setPortionQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('assets/images/sample_biryani.jpg');

  // Scanner HUD State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [scanStepName, setScanStepName] = useState<string>('');

  // Daily Tracking State
  const [goals, setGoals] = useState<NutritionGoals>(() => {
    const saved = localStorage.getItem('nutriscan_goals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_NUTRITION_GOALS;
  });

  const [todayMeals, setTodayMeals] = useState<LoggedMeal[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('nutriscan_today_meals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today && Array.isArray(parsed.meals)) {
          return parsed.meals;
        }
      } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [history, setHistory] = useState<LoggedMeal[]>(() => {
    const saved = localStorage.getItem('nutriscan_meal_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: "hist_1",
        foodId: "avocado_toast",
        name: "Sourdough Avocado Toast with Poached Egg",
        image: "assets/images/sample_avocado_toast.jpg",
        portionText: "1 serving (210g)",
        calories: 361,
        protein: 14.3,
        carbs: 34.7,
        fat: 19.1,
        co2Kg: 0.34,
        mealType: "Breakfast",
        timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
      },
      {
        id: "hist_2",
        foodId: "chicken_biryani",
        name: "Chicken Biryani",
        image: "assets/images/sample_biryani.jpg",
        portionText: "1 bowl (350g)",
        calories: 648,
        protein: 31.9,
        carbs: 78.1,
        fat: 22.1,
        co2Kg: 1.33,
        mealType: "Lunch",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      }
    ];
  });

  const [waterMl, setWaterMl] = useState<number>(() => {
    return parseInt(localStorage.getItem('nutriscan_water_ml') || '1000', 10);
  });

  // Modal States
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Sync theme with HTML root tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nutriscan_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    playSound('click', soundEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    showToast(!soundEnabled ? "Sound enabled" : "Sound muted", "info");
  };

  // Nutrition Calculation for current selection
  const currentNutrients = currentFood
    ? calculateNutrition(currentFood, portionQuantity, portionUnit)
    : null;

  const setFood = (food: FoodItem, customImage?: string, autoScroll: boolean = false) => {
    setCurrentFood(food);
    setActiveImage(customImage || food.image);
    setPortionUnit(food.defaultUnit || 'bowl');
    setPortionQuantity(1);
    playSound('click', soundEnabled);

    if (autoScroll) {
      setTimeout(() => {
        document.getElementById('nutrition-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const setPortion = (quantity: number, unit?: PortionUnit) => {
    setPortionQuantity(Math.max(0.1, quantity));
    if (unit) setPortionUnit(unit);
    playSound('click', soundEnabled);
  };

  const runAnalysis = async (imageSrc: string) => {
    setIsAnalyzing(true);
    setActiveImage(imageSrc);

    try {
      const result = await analyzeFoodImage(imageSrc, (stepIdx, stepTitle) => {
        setScanStepIndex(stepIdx);
        setScanStepName(stepTitle);
        playSound('step', soundEnabled);
      });

      setCurrentFood(result.foodItem);
      setPortionUnit(result.foodItem.defaultUnit || 'bowl');
      setPortionQuantity(1);
      setIsAnalyzing(false);
      playSound('success', soundEnabled);
      showToast(`Identified "${result.foodItem.name}" (${result.confidence}%)`, 'success');

      setTimeout(() => {
        document.getElementById('nutrition-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (e) {
      setIsAnalyzing(false);
      showToast("Could not complete analysis", "warning");
    }
  };

  const logMeal = (mealType: MealType) => {
    if (!currentFood || !currentNutrients) return;

    const newMeal: LoggedMeal = {
      id: "meal_" + Date.now(),
      foodId: currentFood.id,
      name: currentFood.name,
      image: activeImage,
      portionText: `${portionQuantity} ${portionUnit} (${currentNutrients.grams}g)`,
      calories: currentNutrients.calories,
      protein: currentNutrients.protein,
      carbs: currentNutrients.carbs,
      fat: currentNutrients.fat,
      fibre: currentNutrients.fibre,
      co2Kg: currentNutrients.co2Kg,
      mealType: mealType,
      timestamp: new Date().toISOString()
    };

    const updatedToday = [newMeal, ...todayMeals];
    setTodayMeals(updatedToday);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('nutriscan_today_meals', JSON.stringify({ date: today, meals: updatedToday }));

    const updatedHistory = [newMeal, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('nutriscan_meal_history', JSON.stringify(updatedHistory));

    playSound('success', soundEnabled);
    showToast(`Logged "${currentFood.name}" to today's ${mealType}!`, 'success');
  };

  const deleteTodayMeal = (id: string) => {
    const updated = todayMeals.filter(m => m.id !== id);
    setTodayMeals(updated);
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('nutriscan_today_meals', JSON.stringify({ date: today, meals: updated }));
    showToast("Meal removed from daily log", "info");
  };

  const addWater = (amount: number = 250) => {
    const next = waterMl + amount;
    setWaterMl(next);
    localStorage.setItem('nutriscan_water_ml', next.toString());
    playSound('click', soundEnabled);
    showToast(`Added +${amount}ml water! 💧`, 'success');
  };

  const updateGoals = (newGoals: NutritionGoals) => {
    setGoals(newGoals);
    localStorage.setItem('nutriscan_goals', JSON.stringify(newGoals));
    playSound('success', soundEnabled);
    showToast("Daily targets updated!", 'success');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.setItem('nutriscan_meal_history', JSON.stringify([]));
    showToast("History cleared", "info");
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        currentFood,
        currentNutrients,
        portionUnit,
        portionQuantity,
        activeImage,
        isAnalyzing,
        scanStepIndex,
        scanStepName,
        goals,
        todayMeals,
        history,
        waterMl,
        isGoalsModalOpen,
        setIsGoalsModalOpen,
        isEditFoodModalOpen,
        setIsEditFoodModalOpen,
        toast,
        showToast,
        setFood,
        setPortion,
        runAnalysis,
        logMeal,
        deleteTodayMeal,
        addWater,
        updateGoals,
        clearHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
