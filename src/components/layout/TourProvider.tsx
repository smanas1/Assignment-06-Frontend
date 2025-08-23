/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/TourProvider.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import Joyride, { type CallBackProps, STATUS, type Step } from "react-joyride";

interface TourContextType {
  startTour: () => void;
  resetTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const steps: Step[] = [
  {
    target: ".tour-navbar",
    content:
      "This is the main navigation bar. You can access different sections from here.",
    disableBeacon: true,
  },
  {
    target: ".tour-balance-card",
    content: "Here you can see your current wallet balance.",
  },
  {
    target: ".tour-quick-actions",
    content: "These are quick actions for common wallet operations.",
  },
  {
    target: ".tour-transactions-table",
    content: "This table shows your recent transactions with details.",
  },
  {
    target: ".tour-theme-toggle",
    content: "Toggle between light and dark themes using this button.",
  },
];

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [run, setRun] = useState(false);

  const startTour = () => setRun(true);
  const resetTour = () => {
    localStorage.removeItem("tour-completed");
    setRun(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRun(false);
      localStorage.setItem("tour-completed", "true");
    }
  };

  return (
    <TourContext.Provider value={{ startTour, resetTour }}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </TourContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
