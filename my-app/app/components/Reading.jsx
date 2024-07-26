// components/Reading.js
import React, { useState, useEffect } from 'react';

const Reading = ({ book }) => {
  const [currentContent, setCurrentContent] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (book) {
      // Start reading the book
      setCurrentContent(book.content);
      if (book.questions && book.questions.length > 0) {
        setCurrentQuestion(book.questions[questionIndex]);
      }
      startReading(book.content);
    }
  }, [book, questionIndex]);

  const startReading = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);

    speech.onend = () => {
      if (book.questions && book.questions.length > 0) {
        setCurrentQuestion(book.questions[questionIndex]);
      }
      setIsListening(true);
      startListening();
    };
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      handleAnswer(speechResult);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAnswer = (answer) => {
    if (book && book.questions && answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setQuestionIndex(questionIndex + 1);
      const nextContent = book.content.split('.')[questionIndex + 1];
      startReading(nextContent);
    } else {
      alert(`Incorrect answer! The correct answer is ${currentQuestion.answer}`);
      setIsListening(true);
      startListening();
    }
  };

  return (
    <div>
      {book && book.questions && book.questions.length > 0 && (
        <>
          <p>{currentQuestion.question}</p>
          <p>{isListening ? 'Listening...' : 'Click the button to start listening'}</p>
        </>
      )}
    </div>
  );
};

export default Reading;

