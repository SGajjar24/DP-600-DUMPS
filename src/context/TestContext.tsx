import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
export type TestLength = 15 | 30 | 45;

export interface Question {
  id: number;
  question: string;
  options: Record<string, string>;
  correct_answer: string | null;
  explanation: string;
  category: string;
}

export interface TestContextType {
  testLength: TestLength;
  setTestLength: (length: TestLength) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  userAnswers: Record<number, string>;
  setUserAnswer: (questionId: number, answer: string) => void;
  isTestComplete: boolean;
  completeTest: () => void;
  resetTest: () => void;
  calculateScore: () => { score: number; total: number; percentage: number };
}

// Create the context with default values
const TestContext = createContext<TestContextType | undefined>(undefined);

// Provider component
export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [testLength, setTestLength] = useState<TestLength>(15);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isTestComplete, setIsTestComplete] = useState(false);

  const setUserAnswer = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const completeTest = () => {
    setIsTestComplete(true);
  };

  const resetTest = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsTestComplete(false);
  };

  const calculateScore = () => {
    let correctCount = 0;
    
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer && question.correct_answer && userAnswer === question.correct_answer) {
        correctCount++;
      }
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      score: correctCount,
      total,
      percentage,
    };
  };

  const value = {
    testLength,
    setTestLength,
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswer,
    isTestComplete,
    completeTest,
    resetTest,
    calculateScore,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

// Custom hook to use the test context
export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
