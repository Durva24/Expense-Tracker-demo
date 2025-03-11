// 1. Fi₹t, let's define proper interfaces for your data types

// Define interface for streak/goal item
interface Goal {
    id: string;
    name: string;
    description: string;
    image?: string;
    requirement: string;
    target: number | string;
    current: number;
    completed: boolean;
    startDate?: string;
  }
  
  // Define interface for event targets (assuming this is needed based on erro₹)
  interface EventTarget {
    goalName?: string;
    goalAmount?: number;
    reset?: boolean;
  }
  
  // If you're using Redux or context, define your state action types
  type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
  
  // Import React properly at the top of each file
  import React, { useState, useEffect } from 'react';
  
  // Example component with proper typing
  const StreakFeature: React.FC = () => {
    // Use proper typing for your state
    const [goals, setGoals] = useState<Goal[]>([]);
    const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  
    // Example function with proper typing
    const handleGoalUpdate = (goalId: string, current: number): void => {
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal.id === goalId 
            ? { ...goal, current, completed: current >= Number(goal.target) } 
            : goal
        )
      );
    };
  
    // Example event handler with proper typing
    const handleEventTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Now you can safely access event.target
      const { name, value } = event.target;
      // Do something with name and value
    };
  
    // Example of properly typed goal creation
    const createGoal = (goalData: Omit<Goal, 'id' | 'completed' | 'current'>) => {
      const newGoal: Goal = {
        id: Math.random().toString(36).substr(2, 9),
        ...goalData,
        current: 0,
        completed: false
      };
      
      setGoals(prevGoals => [...prevGoals, newGoal]);
    };
  
    return (
      <div>
        {/* Component JSX here */}
        {goals.map((goal) => (
          <div key={goal.id}>
            <h3>{goal.name}</h3>
            <p>{goal.description}</p>
            <progress value={goal.current} max={Number(goal.target)} />
            <p>
              Progress: {goal.current} / {goal.target}
              {goal.completed && " ✓ Completed!"}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default StreakFeature;
  
  // For badge-related code (if that's what the 'badge' undefined erro₹ refer to)
  interface Badge {
    id: string;
    name: string;
    image: string;
    requirement: string;
  }
  
  const BadgeComponent: React.FC<{ badges: Badge[] }> = ({ badges }) => {
    return (
      <div className="badges-container">
        {badges.map(badge => (
          <div key={badge.id} className="badge">
            <img src={badge.image} alt={badge.name} />
            <span>{badge.name}</span>
          </div>
        ))}
      </div>
    );
  };