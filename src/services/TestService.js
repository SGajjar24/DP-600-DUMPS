import axios from 'axios';

// Base URL for API requests - will be different in development vs production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

// Service for fetching test questions and categories
export const TestService = {
  // Get questions for a specific test length
  getQuestions: async (length) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions/${length}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // Get all question categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // For local development/testing without API
  getQuestionsLocal: async (length) => {
    try {
      // In production, this would be replaced with actual API calls
      // For now, we'll use static JSON files
      const response = await fetch(`/test_${length}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load questions for length ${length}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching questions locally:', error);
      throw error;
    }
  },

  // Calculate test results
  calculateResults: (questions, userAnswers) => {
    let correctCount = 0;
    const questionResults = [];
    
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = userAnswer && question.correct_answer && 
                        userAnswer === question.correct_answer;
      
      if (isCorrect) {
        correctCount++;
      }
      
      questionResults.push({
        id: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
        explanation: question.explanation,
        category: question.category
      });
    });
    
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const isPassing = percentage >= 70; // Assuming 70% is passing
    
    // Group results by category
    const categoryResults = {};
    questionResults.forEach((result) => {
      if (!categoryResults[result.category]) {
        categoryResults[result.category] = {
          total: 0,
          correct: 0,
          questions: []
        };
      }
      
      categoryResults[result.category].total++;
      if (result.isCorrect) {
        categoryResults[result.category].correct++;
      }
      categoryResults[result.category].questions.push(result);
    });
    
    // Calculate percentages for each category
    Object.keys(categoryResults).forEach((category) => {
      const { correct, total } = categoryResults[category];
      categoryResults[category].percentage = total > 0 
        ? Math.round((correct / total) * 100) 
        : 0;
    });
    
    return {
      score: correctCount,
      total,
      percentage,
      isPassing,
      questionResults,
      categoryResults
    };
  }
};

export default TestService;
