import React from "react";

interface QuestionProps {
  question: {
    pregunta: string;
    opciones: string[];
    respuesta: number[];
  };
  totalQuestions: number;
  currentQuestion: number;
  selectedAnswers: number[];
  handleAnswerSelect: (index: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  totalQuestions,
  currentQuestion,
  selectedAnswers,
  handleAnswerSelect,
}) => {
  const isMultipleAnswer = question.respuesta.length > 1;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Pregunta {currentQuestion + 1} de {totalQuestions}
      </h2>
      <p className="mb-4">{question.pregunta}</p>
      <ul className="mb-4">
        {question.opciones.map((opcion, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type={isMultipleAnswer ? "checkbox" : "radio"}
                name={`question-${currentQuestion}`}
                checked={selectedAnswers.includes(index)}
                onChange={() => handleAnswerSelect(index)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{opcion}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};