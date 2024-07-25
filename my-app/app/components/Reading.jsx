// components/Reading.js
import React, { useState, useEffect } from 'react';

const Reading = ({ book }) => {
  const [currentContent, setCurrentContent] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    // Start reading the book
    setCurrentContent(book.content);
    setCurrentQuestion(book.questions[questionIndex]);
  }, [book, questionIndex]);

  const handleAnswer = () => {
    if (answer === currentQuestion.answer) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert('Incorrect answer! The correct answer is ' + currentQuestion.answer);
    }
    setAnswer('');
  };

  return (
    <div>
      <p>{currentContent}</p>
      <p>{currentQuestion.question}</p>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
};

export default Reading;

