import React, { useState } from 'react';
import axios from 'axios';
const ClarifyingQ = ( {level, setLevel} ) => {
  const [questionNum, setQuestionNum] = useState(1);
  const [userData, setUserData] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const questions = {
        1: "On a scale of 1 to 5, how oily does your face feel by midday? (1 being not oily at all, 5 being extremely oily)",
        2: "How does your skin usually react to new skincare products? (Immediate irritation, takes time to show reaction, no reaction, etc.)",
        3: "Does your skin feel different in varying weather conditions? If so, how?",
        4: "How visible are the pores on your nose and cheeks? (Very visible, somewhat visible, not visible)",
        5: "How often do you get pimples or acne breakouts? (Daily, weekly, monthly, rarely)",
        6: "Where do pimples most commonly appear on your face? (Forehead, cheeks, chin, etc.)",
        7: "Are your pimples usually deep and painful, surface-level and easy to pop, or somewhere in between?",
        8: "How would you describe the overall texture of your skin? (Smooth, rough, combination of both)",
        9: "Do you notice any redness, dark spots, or other discolorations when you have acne or pimples?",
        10: "What products are you currently using on your skin? (Cleanser, toner, moisturizer, etc.)",
        };

  const handleUserInput = (e) => {
    setCurrentAnswer(e.target.value);
    if (e.target.value !== "") {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
  };

  const handleNextClick = async () => {
  if (isAnswered) {
    setUserData({ ...userData, [questionNum]: currentAnswer });

    if (questionNum === 10) {  // If on the last question, go to the next level
      // Making API request to Together.ai
      try {
        const response = await axios.post('https://api.together.ai/v1/', {
          userData: userData,
          questions: questions
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`
          }
        });
        console.log('Successfully sent data to Together.ai', response);
      } catch (error) {
        console.error('Error sending data to Together.ai', error);
      }

      setLevel(3);
      return;
    }

    setQuestionNum(questionNum + 1);
    setCurrentAnswer("");
    setIsAnswered(false);
  }
};


  const handlePrevClick = () => {
    setQuestionNum(questionNum - 1);
    setCurrentAnswer(userData[questionNum - 1] || "");
    setIsAnswered(true);
  };
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  };
  const buttonStyle = {
    backgroundColor: 'black', // Black background
    color: 'white',            // White text
    fontSize: '1.2em',          // Bigger font
    padding: '10px 20px',       // Padding for bigger appearance
    margin: '10px',             // Spacing out buttons
    cursor: 'pointer',          // Pointer cursor on hover
    border: 'none'              // Remove default borders
  };

  return (
    <div style={containerStyle} className="container">
      <h1>Question {questionNum}</h1>
      <p>{questions[questionNum]}</p>
      <input 
        type="text" 
        value={currentAnswer}
        onChange={handleUserInput}
      />
      <button style={buttonStyle} onClick={handlePrevClick} disabled={questionNum === 1}>Previous</button>
      <button style={buttonStyle} onClick={handleNextClick} disabled={!isAnswered}>Next</button>
    </div>
  );
};

export default ClarifyingQ;        