import React, { useState } from "react";
import questions from "../data/questions.json";
import { Question, Results } from ".";

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (index: number) => {
    const currentQ = questions[currentQuestion];
    const isMultipleAnswer = currentQ.respuesta.length > 1;

    const newSelectedAnswers = [...selectedAnswers];
    if (!newSelectedAnswers[currentQuestion]) {
      newSelectedAnswers[currentQuestion] = [];
    }

    if (isMultipleAnswer) {
      if (newSelectedAnswers[currentQuestion].includes(index)) {
        newSelectedAnswers[currentQuestion] = newSelectedAnswers[
          currentQuestion
        ].filter((i) => i !== index);
      } else {
        newSelectedAnswers[currentQuestion].push(index);
      }
    } else {
      newSelectedAnswers[currentQuestion] = [index];
    }

    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswers = question.respuesta;

      const isCorrect =
        correctAnswers.every((answer) => userAnswers.includes(answer)) &&
        userAnswers.length === correctAnswers.length;

      if (isCorrect) {
        score += 1;
      }
    });
    return score;
  };

  if (showResults) {
    return (
      <Results score={calculateScore()} totalQuestions={questions.length} />
    );
  }

  return (
    <div className="quiz-container max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg min-h-[400px] max-h-[600px] flex flex-col min-w-[1000px]">
      <div className="flex-grow">
        <Question
          question={questions[currentQuestion]}
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers[currentQuestion] || []}
          handleAnswerSelect={handleAnswerSelect}
        />
      </div>
      <div className="quiz-navigation flex justify-between mt-4">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};