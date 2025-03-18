import React, { useState } from "react";
import questions from "../data/questions.json";

const Quiz: React.FC = () => {
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
      // Para preguntas con múltiples respuestas, toggleamos la selección
      if (newSelectedAnswers[currentQuestion].includes(index)) {
        newSelectedAnswers[currentQuestion] = newSelectedAnswers[currentQuestion].filter((i) => i !== index);
      } else {
        newSelectedAnswers[currentQuestion].push(index);
      }
    } else {
      // Para preguntas con una sola respuesta, reemplazamos la selección
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

      // Verificamos si todas las respuestas correctas fueron seleccionadas
      const isCorrect = correctAnswers.every((answer) => userAnswers.includes(answer)) &&
                        userAnswers.length === correctAnswers.length;

      if (isCorrect) {
        score += 1;
      }
    });
    return score;
  };

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>Resultados</h2>
        <p>Tu puntuación es: {calculateScore()} de {questions.length}</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isMultipleAnswer = currentQ.respuesta.length > 1;

  return (
    <div className="quiz-container">
      <h2>Pregunta {currentQuestion + 1} de {questions.length}</h2>
      <p>{currentQ.pregunta}</p>
      <ul>
        {currentQ.opciones.map((opcion, index) => (
          <li key={index}>
            <label>
              <input
                type={isMultipleAnswer ? "checkbox" : "radio"}
                name={`question-${currentQuestion}`}
                checked={selectedAnswers[currentQuestion]?.includes(index) || false}
                onChange={() => handleAnswerSelect(index)}
              />
              {opcion}
            </label>
          </li>
        ))}
      </ul>
      <div className="quiz-navigation">
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          Anterior
        </button>
        <button onClick={handleNextQuestion}>
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;