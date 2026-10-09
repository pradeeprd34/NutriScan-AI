/**
 * NutriScan AI - Core Application Logic
 * Interactive Camera, AI Scanner Simulation, Dynamic Nutritional & Carbon Engine, Daily Tracker & History
 */

(function () {
  "use strict";

  // --- STATE ---
  let currentFoodItem = null;
  let currentNutrients = null;
  let currentUnit = "bowl";
  let currentQuantity = 1;
  let activeImageSrc = null;
  let cameraStream = null;
  let cameraFacingMode = "environment";
  let soundEnabled = true;

  // Audio Context (Synthesized Web Audio API - no external assets needed)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "click") {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "step") {
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn("Audio playback not supported or blocked", e);
    }
  }

  // --- STORAGE HELPERS ---
  const STORAGE_KEYS = {
    THEME: "nutriscan_theme",
    GOALS: "nutriscan_goals",
    TODAY_MEALS: "nutriscan_today_meals",
    MEAL_HISTORY: "nutriscan_meal_history",
    WATER: "nutriscan_water_ml"
  };

  function getSavedGoals() {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved goals", e);
      }
    }
    return window.DEFAULT_NUTRITION_GOALS;
  }

  function saveGoals(goals) {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }

  function getTodayMeals() {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(STORAGE_KEYS.TODAY_MEALS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today && Array.isArray(parsed.meals)) {
          return parsed.meals;
        }
      } catch (e) {
        console.error("Error reading today meals", e);
      }
    }
    return [];
  }

  function saveTodayMeals(meals) {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(STORAGE_KEYS.TODAY_MEALS, JSON.stringify({ date: today, meals }));
  }

  function getMealHistory() {
    const saved = localStorage.getItem(STORAGE_KEYS.MEAL_HISTORY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading history", e);
      }
    }
    // Default seed history with 2 realistic sample scans
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
  }

  function saveMealHistory(history) {
    localStorage.setItem(STORAGE_KEYS.MEAL_HISTORY, JSON.stringify(history));
  }

  function getWaterIntake() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.WATER) || "750", 10);
  }

  function saveWaterIntake(val) {
    localStorage.setItem(STORAGE_KEYS.WATER, val.toString());
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const icon = type === "success" ? "✓" : "ℹ";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- INITIALIZATION ---
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initScanner();
    initCamera();
    initPortionController();
    initTracker();
    initHistory();
    initGoalsModal();
    initEditFoodModal();
    initSoundToggle();

    // Default load first item for instant inspection
    const defaultFood = window.FOOD_DATABASE[0]; // Chicken Biryani
    loadFood(defaultFood, "assets/images/sample_biryani.jpg", false);
  });

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    setTheme(savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        setTheme(next);
        playSound("click");
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  // --- SOUND TOGGLE ---
  function initSoundToggle() {
    const soundBtn = document.getElementById("sound-toggle-btn");
    if (!soundBtn) return;
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
      showToast(soundEnabled ? "Sound effects enabled" : "Sound effects muted", "info");
    });
  }

  // --- NAVIGATION ---
  function initNavbar() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");

    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileDrawer.classList.toggle("active");
        playSound("click");
      });
    }

    if (closeDrawerBtn && mobileDrawer) {
      closeDrawerBtn.addEventListener("click", () => {
        mobileDrawer.classList.remove("active");
      });
    }

    // Smooth active nav link updates on scroll
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-drawer-links a, .mobile-nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (mobileDrawer) mobileDrawer.classList.remove("active");
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          e.preventDefault();
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  // --- SCANNER & UPLOAD ---
  function initScanner() {
    const dropZone = document.getElementById("upload-drop-zone");
    const fileInput = document.getElementById("food-image-input");
    const openCameraBtn = document.getElementById("open-camera-btn");
    const chooseAnotherBtn = document.getElementById("choose-another-btn");
    const retakeBtn = document.getElementById("retake-image-btn");
    const startAnalysisBtn = document.getElementById("start-analysis-btn");

    // File input triggers
    if (dropZone && fileInput) {
      dropZone.addEventListener("click", () => {
        fileInput.click();
        playSound("click");
      });

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("drag-over");
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleSelectedFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleSelectedFile(e.target.files[0]);
        }
      });
    }

    if (chooseAnotherBtn && fileInput) {
      chooseAnotherBtn.addEventListener("click", () => fileInput.click());
    }

    if (retakeBtn && openCameraBtn) {
      retakeBtn.addEventListener("click", () => openCameraBtn.click());
    }

    if (startAnalysisBtn) {
      startAnalysisBtn.addEventListener("click", () => {
        runAiAnalysisFlow();
      });
    }

    // Sample Food Preset Chips
    const sampleChips = document.querySelectorAll(".sample-chip");
    sampleChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const foodId = chip.getAttribute("data-food-id");
        const found = window.FOOD_DATABASE.find((f) => f.id === foodId);
        if (found) {
          loadFood(found, found.image, true);
          playSound("click");
          showToast(`Selected "${found.name}"`, "success");
        }
      });
    });
  }

  function handleSelectedFile(file) {
    if (!file.type.match("image.*")) {
      showToast("Please upload a valid image file (JPG, PNG, WEBP)", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      activeImageSrc = dataUrl;

      // Smart Visual Classifier simulation:
      // Match with database or randomly pick closest match if unknown
      const randomFood = window.FOOD_DATABASE[Math.floor(Math.random() * window.FOOD_DATABASE.length)];
      loadFood(randomFood, dataUrl, false);
      showPreviewCard(dataUrl, file.name);
      showToast("Image uploaded. Ready for AI Analysis!", "success");
    };
    reader.readAsDataURL(file);
  }

  function showPreviewCard(imgSrc, title = "Uploaded Meal") {
    const optionsGrid = document.getElementById("scanner-options-grid");
    const previewCard = document.getElementById("preview-card");
    const previewImg = document.getElementById("preview-img");
    const previewTitle = document.getElementById("preview-title");

    if (optionsGrid && previewCard && previewImg) {
      optionsGrid.style.display = "none";
      previewCard.style.display = "grid";
      previewImg.src = imgSrc;
      if (previewTitle) previewTitle.textContent = title;
    }
  }

  function resetScannerOptions() {
    const optionsGrid = document.getElementById("scanner-options-grid");
    const previewCard = document.getElementById("preview-card");
    const analysisScreen = document.getElementById("analysis-screen");

    if (optionsGrid) optionsGrid.style.display = "grid";
    if (previewCard) previewCard.style.display = "none";
    if (analysisScreen) analysisScreen.style.display = "none";
  }

  // --- CAMERA HANDLING ---
  function initCamera() {
    const openCameraBtn = document.getElementById("open-camera-btn");
    const cameraModal = document.getElementById("camera-modal");
    const closeCameraBtn = document.getElementById("close-camera-btn");
    const shutterBtn = document.getElementById("shutter-btn");
    const switchCameraBtn = document.getElementById("switch-camera-btn");
    const videoElem = document.getElementById("camera-video");

    if (!openCameraBtn || !cameraModal) return;

    openCameraBtn.addEventListener("click", async () => {
      playSound("click");
      cameraModal.classList.add("active");
      await startCameraStream();
    });

    if (closeCameraBtn) {
      closeCameraBtn.addEventListener("click", () => {
        stopCameraStream();
        cameraModal.classList.remove("active");
      });
    }

    if (switchCameraBtn) {
      switchCameraBtn.addEventListener("click", async () => {
        cameraFacingMode = cameraFacingMode === "environment" ? "user" : "environment";
        stopCameraStream();
        await startCameraStream();
      });
    }

    if (shutterBtn && videoElem) {
      shutterBtn.addEventListener("click", () => {
        captureCameraSnapshot();
      });
    }
  }

  async function startCameraStream() {
    const videoElem = document.getElementById("camera-video");
    if (!videoElem) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast("Camera not supported on this browser or connection.", "warning");
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElem.srcObject = cameraStream;
      videoElem.play();
    } catch (err) {
      console.warn("Camera stream error / permissions denied:", err);
      showToast("Camera access unavailable. You can upload an image instead!", "warning");
      const cameraModal = document.getElementById("camera-modal");
      if (cameraModal) cameraModal.classList.remove("active");
    }
  }

  function stopCameraStream() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
  }

  function captureCameraSnapshot() {
    const videoElem = document.getElementById("camera-video");
    const cameraModal = document.getElementById("camera-modal");
    if (!videoElem) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth || 640;
    canvas.height = videoElem.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

    const snapshotUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCameraStream();
    if (cameraModal) cameraModal.classList.remove("active");

    activeImageSrc = snapshotUrl;
    const randomFood = window.FOOD_DATABASE[Math.floor(Math.random() * window.FOOD_DATABASE.length)];
    loadFood(randomFood, snapshotUrl, false);
    showPreviewCard(snapshotUrl, "Captured Photo");
    playSound("click");
    showToast("Photo captured! Click 'Analyze Food' to scan.", "success");
  }

  // --- AI ANALYSIS EXPERIENCE HUD ---
  function runAiAnalysisFlow() {
    const previewCard = document.getElementById("preview-card");
    const analysisScreen = document.getElementById("analysis-screen");
    const resultsContainer = document.getElementById("results-container");

    if (previewCard) previewCard.style.display = "none";
    if (analysisScreen) analysisScreen.style.display = "block";
    if (resultsContainer) resultsContainer.style.display = "none";

    // Stepper elements
    const steps = [
      document.getElementById("step-detect"),
      document.getElementById("step-ingredients"),
      document.getElementById("step-portion"),
      document.getElementById("step-nutrition"),
      document.getElementById("step-report")
    ];

    // Reset step classes
    steps.forEach((step) => {
      if (step) {
        step.className = "analysis-step-item";
        const icon = step.querySelector(".step-status-icon");
        if (icon) icon.textContent = "○";
      }
    });

    const statusTitle = document.getElementById("analysis-status-text");

    let currentStepIdx = 0;
    const stepInterval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        if (step) {
          step.className = "analysis-step-item done";
          const icon = step.querySelector(".step-status-icon");
          if (icon) icon.textContent = "✓";
        }

        playSound("step");

        if (currentStepIdx + 1 < steps.length) {
          const nextStep = steps[currentStepIdx + 1];
          if (nextStep) {
            nextStep.className = "analysis-step-item active";
            const icon = nextStep.querySelector(".step-status-icon");
            if (icon) icon.textContent = "⚙";
          }
          if (statusTitle) {
            statusTitle.textContent = `AI Analyzing: ${nextStep.dataset.name || "Processing..."}`;
          }
        }

        currentStepIdx++;
      } else {
        clearInterval(stepInterval);
        setTimeout(() => {
          if (analysisScreen) analysisScreen.style.display = "none";
          if (resultsContainer) resultsContainer.style.display = "block";
          playSound("success");

          // Smooth scroll to results
          resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
          showToast(`Analysis complete! Identified ${currentFoodItem.name}`, "success");
        }, 400);
      }
    }, 450);
  }

  // --- LOAD FOOD & UPDATE NUTRITION ENGINE ---
  function loadFood(foodItem, imageSrc, autoShowResults = false) {
    if (!foodItem) return;
    currentFoodItem = foodItem;
    activeImageSrc = imageSrc || foodItem.image;
    currentUnit = foodItem.defaultUnit || "bowl";
    currentQuantity = 1;

    // Update input controls
    const qtyInput = document.getElementById("portion-qty-input");
    const unitSelect = document.getElementById("portion-unit-select");
    if (qtyInput) qtyInput.value = currentQuantity;
    if (unitSelect) unitSelect.value = currentUnit;

    recalculateAndRender();

    // Food Identity Card
    const resultImg = document.getElementById("food-result-img");
    const detectedTitle = document.getElementById("food-detected-title");
    const confidenceBadge = document.getElementById("food-confidence-badge");
    const ingredientsList = document.getElementById("ingredient-tags-list");

    if (resultImg) resultImg.src = activeImageSrc;
    if (detectedTitle) detectedTitle.textContent = foodItem.name;
    if (confidenceBadge) confidenceBadge.textContent = `AI Confidence: ${foodItem.confidence}%`;

    if (ingredientsList && foodItem.components) {
      ingredientsList.innerHTML = foodItem.components
        .map(
          (c) =>
            `<span class="ingredient-tag"><span class="tag-dot"></span>${c.name} <small style="color:var(--text-muted)">(${c.confidence}%)</small></span>`
        )
        .join("");
    }

    if (autoShowResults) {
      const optionsGrid = document.getElementById("scanner-options-grid");
      const previewCard = document.getElementById("preview-card");
      const resultsContainer = document.getElementById("results-container");

      if (optionsGrid) optionsGrid.style.display = "none";
      if (previewCard) previewCard.style.display = "none";
      if (resultsContainer) {
        resultsContainer.style.display = "block";
        resultsContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function initPortionController() {
    const qtyInput = document.getElementById("portion-qty-input");
    const unitSelect = document.getElementById("portion-unit-select");
    const stepMinus = document.getElementById("portion-step-minus");
    const stepPlus = document.getElementById("portion-step-plus");
    const recalcBtn = document.getElementById("recalc-nutrition-btn");

    if (qtyInput) {
      qtyInput.addEventListener("input", () => {
        let val = parseFloat(qtyInput.value);
        if (isNaN(val) || val <= 0) val = 1;
        currentQuantity = val;
        recalculateAndRender();
      });
    }

    if (unitSelect) {
      unitSelect.addEventListener("change", () => {
        currentUnit = unitSelect.value;
        recalculateAndRender();
        playSound("click");
      });
    }

    if (stepMinus) {
      stepMinus.addEventListener("click", () => {
        let val = parseFloat(qtyInput.value) || 1;
        if (currentUnit === "grams") {
          val = Math.max(50, val - 50);
        } else {
          val = Math.max(0.5, +(val - 0.5).toFixed(1));
        }
        currentQuantity = val;
        qtyInput.value = val;
        recalculateAndRender();
        playSound("click");
      });
    }

    if (stepPlus) {
      stepPlus.addEventListener("click", () => {
        let val = parseFloat(qtyInput.value) || 1;
        if (currentUnit === "grams") {
          val = val + 50;
        } else {
          val = +(val + 0.5).toFixed(1);
        }
        currentQuantity = val;
        qtyInput.value = val;
        recalculateAndRender();
        playSound("click");
      });
    }

    // Quick scale buttons (0.5x, 1x, 1.5x, 2x)
    const presetBtns = document.querySelectorAll(".scale-preset-btn");
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        presetBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const scale = parseFloat(btn.dataset.scale || "1");
        currentQuantity = scale;
        if (qtyInput) qtyInput.value = scale;
        recalculateAndRender();
        playSound("click");
      });
    });

    if (recalcBtn) {
      recalcBtn.addEventListener("click", () => {
        recalculateAndRender(true);
        playSound("success");
      });
    }
  }

  function recalculateAndRender(showNotice = false) {
    if (!currentFoodItem) return;

    currentNutrients = window.calculateNutrition(currentFoodItem, currentQuantity, currentUnit);
    if (!currentNutrients) return;

    const goals = getSavedGoals();

    // 1. Calories Hero
    const calElem = document.getElementById("nutri-calories");
    const calPctElem = document.getElementById("calorie-target-pct");
    if (calElem) calElem.textContent = currentNutrients.calories;
    if (calPctElem) {
      const pct = Math.round((currentNutrients.calories / goals.calories) * 100);
      calPctElem.textContent = `${pct}% of daily target (${goals.calories} kcal)`;
    }

    // 2. Macronutrient Cards
    const proteinNum = document.getElementById("macro-protein-num");
    const carbsNum = document.getElementById("macro-carbs-num");
    const fatNum = document.getElementById("macro-fat-num");

    if (proteinNum) proteinNum.textContent = currentNutrients.protein;
    if (carbsNum) carbsNum.textContent = currentNutrients.carbs;
    if (fatNum) fatNum.textContent = currentNutrients.fat;

    const proteinBar = document.getElementById("macro-protein-bar");
    const carbsBar = document.getElementById("macro-carbs-bar");
    const fatBar = document.getElementById("macro-fat-bar");

    if (proteinBar) {
      const pPct = Math.min(100, Math.round((currentNutrients.protein / goals.protein) * 100));
      proteinBar.style.width = `${pPct}%`;
    }
    if (carbsBar) {
      const cPct = Math.min(100, Math.round((currentNutrients.carbs / goals.carbs) * 100));
      carbsBar.style.width = `${cPct}%`;
    }
    if (fatBar) {
      const fPct = Math.min(100, Math.round((currentNutrients.fat / goals.fat) * 100));
      fatBar.style.width = `${fPct}%`;
    }

    // 3. Fibre Analysis Card
    const fibreNum = document.getElementById("fibre-amount-num");
    const fibreBadge = document.getElementById("fibre-rating-badge");
    if (fibreNum) fibreNum.textContent = `${currentNutrients.fibre} g`;
    if (fibreBadge) {
      fibreBadge.textContent = currentNutrients.fibreRating;
      fibreBadge.className = `nutrient-rating-badge ${currentNutrients.fibreRatingClass}`;
    }

    // 4. Sugar Analysis Card
    const sugarNum = document.getElementById("sugar-amount-num");
    const totalSugarRow = document.getElementById("sugar-total-val");
    const addedSugarRow = document.getElementById("sugar-added-val");
    const naturalSugarRow = document.getElementById("sugar-natural-val");

    if (sugarNum) sugarNum.textContent = `${currentNutrients.totalSugar} g`;
    if (totalSugarRow) totalSugarRow.textContent = `${currentNutrients.totalSugar} g`;
    if (addedSugarRow) {
      addedSugarRow.textContent =
        currentNutrients.addedSugar !== null
          ? `${currentNutrients.addedSugar} g`
          : "Not reliably available from image analysis.";
    }
    if (naturalSugarRow) {
      naturalSugarRow.textContent =
        currentNutrients.naturalSugar !== null
          ? `${currentNutrients.naturalSugar} g`
          : "Estimated from whole ingredients";
    }

    // 5. In-depth Micronutrients
    const sodiumVal = document.getElementById("micro-sodium-val");
    const satFatVal = document.getElementById("micro-satfat-val");
    const cholestVal = document.getElementById("micro-cholest-val");
    const potassVal = document.getElementById("micro-potass-val");

    if (sodiumVal) sodiumVal.textContent = `${currentNutrients.sodium} mg`;
    if (satFatVal) satFatVal.textContent = `${currentNutrients.saturatedFat} g`;
    if (cholestVal) cholestVal.textContent = `${currentNutrients.cholesterol} mg`;
    if (potassVal) potassVal.textContent = `${currentNutrients.potassium} mg`;

    // 6. Interactive Donut Chart
    renderMacroDonutChart(currentNutrients.macroSplit, currentNutrients.calories);

    // 7. Environmental Impact Section
    renderCarbonImpact(currentNutrients);

    // 8. Grams Summary
    const portionGramsDisplay = document.getElementById("portion-grams-display");
    if (portionGramsDisplay) {
      portionGramsDisplay.textContent = `≈ ${currentNutrients.grams} grams total weight`;
    }

    if (showNotice) {
      const notice = document.getElementById("recalc-notification");
      if (notice) {
        notice.textContent = "✓ Nutrition recalculated for new portion!";
        notice.style.opacity = "1";
        setTimeout(() => (notice.style.opacity = "0"), 2500);
      }
    }
  }

  // --- MACRONUTRIENT DONUT CHART (SVG) ---
  function renderMacroDonutChart(split, totalKcal) {
    const chartSvg = document.getElementById("macro-donut-svg");
    if (!chartSvg) return;

    const proteinPct = split.proteinPct || 0;
    const carbsPct = split.carbsPct || 0;
    const fatPct = split.fatPct || 0;

    // SVG Circle Radius 35 => Circumference = 2 * PI * 35 = 219.91
    const circumference = 219.91;

    const pOffset = circumference;
    const pDash = (proteinPct / 100) * circumference;

    const cOffset = circumference - pDash;
    const cDash = (carbsPct / 100) * circumference;

    const fOffset = cOffset - cDash;
    const fDash = (fatPct / 100) * circumference;

    chartSvg.innerHTML = `
      <circle cx="45" cy="45" r="35" fill="none" stroke="var(--bg-tertiary)" stroke-width="12" />
      <circle cx="45" cy="45" r="35" fill="none" stroke="#3b82f6" stroke-width="12"
        stroke-dasharray="${pDash} ${circumference - pDash}"
        stroke-dashoffset="0" />
      <circle cx="45" cy="45" r="35" fill="none" stroke="#10b981" stroke-width="12"
        stroke-dasharray="${cDash} ${circumference - cDash}"
        stroke-dashoffset="-${pDash}" />
      <circle cx="45" cy="45" r="35" fill="none" stroke="#f59e0b" stroke-width="12"
        stroke-dasharray="${fDash} ${circumference - fDash}"
        stroke-dashoffset="-${pDash + cDash}" />
    `;

    const legendProteinPct = document.getElementById("legend-protein-pct");
    const legendCarbsPct = document.getElementById("legend-carbs-pct");
    const legendFatPct = document.getElementById("legend-fat-pct");
    const chartCenterKcal = document.getElementById("donut-center-kcal");

    if (legendProteinPct) legendProteinPct.textContent = `${proteinPct}%`;
    if (legendCarbsPct) legendCarbsPct.textContent = `${carbsPct}%`;
    if (legendFatPct) legendFatPct.textContent = `${fatPct}%`;
    if (chartCenterKcal) chartCenterKcal.textContent = `${totalKcal} kcal`;
  }

  // --- ENVIRONMENTAL & CARBON IMPACT ---
  function renderCarbonImpact(nutrients) {
    const carbonValElem = document.getElementById("carbon-co2-val");
    const carbonBadge = document.getElementById("carbon-level-badge");
    const carbonDrivers = document.getElementById("carbon-main-drivers");
    const carbonDrivingEquiv = document.getElementById("carbon-driving-equiv");
    const carbonTip = document.getElementById("carbon-sustainable-tip");

    if (carbonValElem) carbonValElem.textContent = `~${nutrients.co2Kg}`;
    if (carbonBadge) {
      carbonBadge.textContent = `${nutrients.impactLevel} Environmental Impact`;
      carbonBadge.className = `carbon-badge-level carbon-level-${nutrients.impactLevel.toLowerCase()}`;
    }
    if (carbonDrivers) carbonDrivers.textContent = nutrients.mainDrivers;
    if (carbonDrivingEquiv) carbonDrivingEquiv.textContent = `~${nutrients.drivingKmEquivalent} km`;
    if (carbonTip) carbonTip.textContent = nutrients.sustainableTip;
  }

  // --- DAILY CALORIE TRACKER & LOGGING ---
  function initTracker() {
    const addLogBtn = document.getElementById("log-meal-btn");
    const mealTypeSelect = document.getElementById("log-meal-type-select");
    const addWaterBtn = document.getElementById("add-water-btn");

    if (addLogBtn) {
      addLogBtn.addEventListener("click", () => {
        if (!currentNutrients || !currentFoodItem) return;
        const mealType = mealTypeSelect ? mealTypeSelect.value : "Lunch";
        logCurrentMeal(mealType);
        playSound("success");
      });
    }

    if (addWaterBtn) {
      addWaterBtn.addEventListener("click", () => {
        const cur = getWaterIntake() + 250;
        saveWaterIntake(cur);
        renderDailyTracker();
        playSound("click");
        showToast("Added +250ml water intake! 💧", "success");
      });
    }

    renderDailyTracker();
  }

  function logCurrentMeal(mealType) {
    const newMeal = {
      id: "meal_" + Date.now(),
      foodId: currentFoodItem.id,
      name: currentFoodItem.name,
      image: activeImageSrc,
      portionText: `${currentQuantity} ${currentUnit} (${currentNutrients.grams}g)`,
      calories: currentNutrients.calories,
      protein: currentNutrients.protein,
      carbs: currentNutrients.carbs,
      fat: currentNutrients.fat,
      fibre: currentNutrients.fibre,
      co2Kg: currentNutrients.co2Kg,
      mealType: mealType,
      timestamp: new Date().toISOString()
    };

    // Save to Today's meals
    const todayMeals = getTodayMeals();
    todayMeals.unshift(newMeal);
    saveTodayMeals(todayMeals);

    // Save to Persistent History
    const history = getMealHistory();
    history.unshift(newMeal);
    saveMealHistory(history);

    renderDailyTracker();
    renderHistory();

    showToast(`Logged "${currentFoodItem.name}" to today's ${mealType}!`, "success");
  }

  function renderDailyTracker() {
    const meals = getTodayMeals();
    const goals = getSavedGoals();

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    meals.forEach((m) => {
      totalCalories += m.calories || 0;
      totalProtein += m.protein || 0;
      totalCarbs += m.carbs || 0;
      totalFat += m.fat || 0;
    });

    totalProtein = +totalProtein.toFixed(1);
    totalCarbs = +totalCarbs.toFixed(1);
    totalFat = +totalFat.toFixed(1);

    // Calories Progress Ring
    const remainingKcal = Math.max(0, goals.calories - totalCalories);
    const consumedDisplay = document.getElementById("daily-consumed-kcal");
    const remainingDisplay = document.getElementById("daily-remaining-label");
    const ringFill = document.getElementById("daily-goal-ring-fill");

    if (consumedDisplay) consumedDisplay.textContent = totalCalories;
    if (remainingDisplay) {
      if (totalCalories > goals.calories) {
        remainingDisplay.textContent = `+${totalCalories - goals.calories} kcal over target`;
        remainingDisplay.style.color = "var(--rose-500)";
      } else {
        remainingDisplay.textContent = `${remainingKcal} kcal remaining`;
        remainingDisplay.style.color = "var(--text-secondary)";
      }
    }

    if (ringFill) {
      // Circumference = 2 * PI * 42 = 263.89
      const c = 263.89;
      const pct = Math.min(1, totalCalories / goals.calories);
      const offset = c - pct * c;
      ringFill.style.strokeDashoffset = offset;
      ringFill.style.stroke = totalCalories > goals.calories ? "var(--rose-500)" : "var(--amber-400)";
    }

    // Mini Macro Progress Bars
    renderMiniProgressBar("daily-protein", totalProtein, goals.protein);
    renderMiniProgressBar("daily-carbs", totalCarbs, goals.carbs);
    renderMiniProgressBar("daily-fat", totalFat, goals.fat);

    // Water
    const waterCur = getWaterIntake();
    const waterDisplay = document.getElementById("water-current-display");
    if (waterDisplay) {
      waterDisplay.textContent = `${waterCur} / ${goals.water} ml`;
    }

    // Render Meals Timeline List
    renderTodayMealsList(meals);
  }

  function renderMiniProgressBar(prefix, val, goal) {
    const valElem = document.getElementById(`${prefix}-val`);
    const barElem = document.getElementById(`${prefix}-bar`);
    if (valElem) valElem.textContent = `${val} / ${goal} g`;
    if (barElem) {
      const pct = Math.min(100, Math.round((val / goal) * 100));
      barElem.style.width = `${pct}%`;
    }
  }

  function renderTodayMealsList(meals) {
    const container = document.getElementById("today-meals-list");
    if (!container) return;

    if (!meals || meals.length === 0) {
      container.innerHTML = `
        <div class="empty-meals-placeholder">
          <div class="empty-meals-icon">🥗</div>
          <p>No meals logged today yet.</p>
          <small>Scan a food plate or pick a sample meal above to get started!</small>
        </div>
      `;
      return;
    }

    container.innerHTML = meals
      .map((meal) => {
        const timeStr = new Date(meal.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `
          <div class="meal-log-item" data-meal-id="${meal.id}">
            <img src="${meal.image}" alt="${meal.name}" class="meal-item-thumb" />
            <div class="meal-item-info">
              <span class="meal-item-title">${meal.name}</span>
              <div class="meal-item-meta">
                <span class="badge badge-health" style="font-size:0.68rem">${meal.mealType}</span>
                <span>${meal.portionText}</span>
                <span>• ${timeStr}</span>
              </div>
            </div>
            <div class="meal-item-kcal">${meal.calories} kcal</div>
            <button class="delete-meal-btn" data-delete-id="${meal.id}" title="Remove meal">✕</button>
          </div>
        `;
      })
      .join("");

    // Attach delete listeners
    container.querySelectorAll(".delete-meal-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-delete-id");
        deleteMealFromToday(id);
      });
    });
  }

  function deleteMealFromToday(id) {
    let meals = getTodayMeals();
    meals = meals.filter((m) => m.id !== id);
    saveTodayMeals(meals);
    renderDailyTracker();
    showToast("Meal removed from today's log", "info");
  }

  // --- MEAL HISTORY & EXPORT ---
  let activeHistoryFilter = "All";

  function initHistory() {
    const filterPills = document.querySelectorAll(".history-filter-pills .filter-pill");
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeHistoryFilter = pill.getAttribute("data-filter") || "All";
        renderHistory();
        playSound("click");
      });
    });

    const exportJsonBtn = document.getElementById("export-history-json-btn");
    const exportCsvBtn = document.getElementById("export-history-csv-btn");
    const clearHistoryBtn = document.getElementById("clear-history-btn");

    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", exportHistoryJson);
    }
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", exportHistoryCsv);
    }
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your meal history?")) {
          saveMealHistory([]);
          renderHistory();
          showToast("Meal history cleared", "info");
        }
      });
    }

    renderHistory();
  }

  function renderHistory() {
    const grid = document.getElementById("history-cards-grid");
    if (!grid) return;

    let history = getMealHistory();
    if (activeHistoryFilter !== "All") {
      history = history.filter((h) => h.mealType === activeHistoryFilter);
    }

    if (history.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 40px 20px; color: var(--text-secondary);">
          <div style="font-size:2.5rem; margin-bottom:8px;">📁</div>
          <p>No meals recorded for this category yet.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = history
      .map((item) => {
        const dateStr = new Date(item.timestamp).toLocaleDateString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
        return `
          <div class="history-food-card" data-food-id="${item.foodId}">
            <div class="history-card-img-wrap">
              <img src="${item.image}" alt="${item.name}" class="history-card-img" />
              <span class="history-card-badge">${item.mealType}</span>
            </div>
            <div class="history-card-body">
              <div class="history-card-title">${item.name}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${item.portionText}</div>
              <div class="history-card-macros">
                <strong style="color:var(--amber-400);">${item.calories} kcal</strong>
                <span>• P: ${item.protein}g</span>
                <span>• C: ${item.carbs}g</span>
                <span>• F: ${item.fat}g</span>
              </div>
              <div class="history-card-footer">
                <span style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</span>
                <span class="badge badge-estimate">~${item.co2Kg} kg CO₂e</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function exportHistoryJson() {
    const history = getMealHistory();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `nutriscan_history_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Exported history as JSON file", "success");
  }

  function exportHistoryCsv() {
    const history = getMealHistory();
    if (history.length === 0) {
      showToast("No history to export!", "warning");
      return;
    }

    const headers = ["Timestamp", "Food Name", "Meal Type", "Portion", "Calories (kcal)", "Protein (g)", "Carbs (g)", "Fat (g)", "CO2e (kg)"];
    const rows = history.map((h) => [
      `"${h.timestamp}"`,
      `"${h.name}"`,
      `"${h.mealType}"`,
      `"${h.portionText}"`,
      h.calories,
      h.protein,
      h.carbs,
      h.fat,
      h.co2Kg
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const a = document.createElement("a");
    a.setAttribute("href", encodeURI(csvContent));
    a.setAttribute("download", `nutriscan_history_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Exported history as CSV file", "success");
  }

  // --- GOALS MODAL & PREFERENCES ---
  function initGoalsModal() {
    const openBtn = document.getElementById("open-goals-modal-btn");
    const modal = document.getElementById("goals-modal");
    const closeBtn = document.getElementById("close-goals-modal-btn");
    const saveBtn = document.getElementById("save-goals-btn");

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        populateGoalsForm();
        modal.classList.add("active");
        playSound("click");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (saveBtn && modal) {
      saveBtn.addEventListener("click", () => {
        const goals = {
          calories: parseInt(document.getElementById("goal-input-calories").value, 10) || 2000,
          protein: parseInt(document.getElementById("goal-input-protein").value, 10) || 130,
          carbs: parseInt(document.getElementById("goal-input-carbs").value, 10) || 240,
          fat: parseInt(document.getElementById("goal-input-fat").value, 10) || 65,
          water: parseInt(document.getElementById("goal-input-water").value, 10) || 2500,
          fibre: 28
        };
        saveGoals(goals);
        modal.classList.remove("active");
        recalculateAndRender();
        renderDailyTracker();
        playSound("success");
        showToast("Daily targets updated successfully!", "success");
      });
    }

    // Presets
    const presetBtns = document.querySelectorAll(".preset-goal-btn");
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cal = btn.getAttribute("data-cal");
        const p = btn.getAttribute("data-p");
        const c = btn.getAttribute("data-c");
        const f = btn.getAttribute("data-f");

        document.getElementById("goal-input-calories").value = cal;
        document.getElementById("goal-input-protein").value = p;
        document.getElementById("goal-input-carbs").value = c;
        document.getElementById("goal-input-fat").value = f;
        playSound("click");
      });
    });
  }

  function populateGoalsForm() {
    const goals = getSavedGoals();
    document.getElementById("goal-input-calories").value = goals.calories;
    document.getElementById("goal-input-protein").value = goals.protein;
    document.getElementById("goal-input-carbs").value = goals.carbs;
    document.getElementById("goal-input-fat").value = goals.fat;
    document.getElementById("goal-input-water").value = goals.water;
  }

  // --- EDIT FOOD MODAL (CORRECT DETECTED FOOD) ---
  function initEditFoodModal() {
    const editBtn = document.getElementById("edit-food-btn");
    const modal = document.getElementById("edit-food-modal");
    const closeBtn = document.getElementById("close-edit-modal-btn");
    const searchInput = document.getElementById("food-search-input");
    const foodListContainer = document.getElementById("food-search-results");

    if (editBtn && modal) {
      editBtn.addEventListener("click", () => {
        modal.classList.add("active");
        renderFoodOptions("");
        playSound("click");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderFoodOptions(e.target.value.toLowerCase().trim());
      });
    }

    function renderFoodOptions(filter) {
      if (!foodListContainer) return;
      const matched = window.FOOD_DATABASE.filter((f) => f.name.toLowerCase().includes(filter));

      foodListContainer.innerHTML = matched
        .map(
          (f) => `
          <div class="food-select-item" data-food-id="${f.id}" style="
            display:flex; align-items:center; justify-content:space-between;
            padding:10px 14px; background:var(--bg-tertiary); border-radius:var(--radius-md);
            margin-bottom:8px; cursor:pointer; border:1px solid var(--border-light);
            transition: all var(--transition-fast);">
            <div>
              <div style="font-weight:700;">${f.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${f.cuisine} • ~${f.per100g.calories} kcal/100g</div>
            </div>
            <button class="btn-secondary" style="padding:4px 12px; font-size:0.78rem;">Select</button>
          </div>
        `
        )
        .join("");

      foodListContainer.querySelectorAll(".food-select-item").forEach((item) => {
        item.addEventListener("click", () => {
          const id = item.getAttribute("data-food-id");
          const found = window.FOOD_DATABASE.find((f) => f.id === id);
          if (found) {
            loadFood(found, found.image, true);
            if (modal) modal.classList.remove("active");
            playSound("success");
            showToast(`Food corrected to "${found.name}"`, "success");
          }
        });
      });
    }
  }
})();
