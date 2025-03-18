import React from "react";

interface ResultsProps {
  score: number;
  totalQuestions: number;
}

export const Results: React.FC<ResultsProps> = ({ score, totalQuestions }) => {
  return (
    <div className="quiz-results text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      <p className="text-lg">
        Tu puntuación es: {score} de {totalQuestions}
      </p>
    </div>
  );
};