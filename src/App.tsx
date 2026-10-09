import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Scanner } from './components/Scanner/Scanner';
import { ResultsDashboard } from './components/Results/ResultsDashboard';
import { DailyTracker } from './components/Tracker/DailyTracker';
import { MealHistory } from './components/History/MealHistory';
import { HealthyGuidance } from './components/Guidance/HealthyGuidance';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { GoalsModal } from './components/Modals/GoalsModal';
import { EditFoodModal } from './components/Modals/EditFoodModal';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <Scanner />
        <ResultsDashboard />
        <DailyTracker />
        <MealHistory />
        <HealthyGuidance />
      </main>
      <MobileBottomNav />
      <Footer />
      <GoalsModal />
      <EditFoodModal />
      <Toast />
    </AppProvider>
  );
};

export default App;
