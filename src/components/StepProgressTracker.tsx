// StepProgressTracker.tsx
import React, { useEffect, useState } from "react";
import "./stepProgressTracker.css";

interface Step {
  title: string;
  completed: boolean;
  current: boolean;
}

const baseSteps: Step[] = [
  { title: "Account Info", completed: false, current: true },
  { title: "Payment Details", completed: false, current: false },
  { title: "Confirmation", completed: false, current: false },
];

const StepProgressTracker: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(baseSteps);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const updatedSteps = prevSteps.map((step, index) => {
          if (index < currentIndex)
            return { ...step, completed: true, current: false };
          if (index === currentIndex)
            return { ...step, completed: false, current: true };
          return { ...step, completed: false, current: false };
        });
        return updatedSteps;
      });

      setCurrentIndex((prevIndex) => (prevIndex + 1) % baseSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="step-tracker">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step fade-in ${step.completed ? "completed" : ""} ${
            step.current ? "current" : ""
          }`}
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <div className="step-circle">
            {step.completed ? "✅" : step.current ? "🔘" : "⚪"}
          </div>
          <p className="step-title">{step.title}</p>
          {index < steps.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
};

export default StepProgressTracker;
