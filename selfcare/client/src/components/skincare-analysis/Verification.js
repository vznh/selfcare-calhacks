import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Verification = ({ userData }) => {
  const [explanation, setExplanation] = useState('');
  const [animatedText, setAnimatedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const fetchSkinTypeExplanation = async () => {
      try {
        const response = await axios.post(
          'https://api.together.ai/v1/',
          {
            // Your data payload based on TogetherAI's API requirements
            userData: userData,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.API_KEY}`, // Replace with your actual API key
            },
          }
        );
        setExplanation(response.data.explanation); // Replace with the actual data path
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkinTypeExplanation();
  }, [userData]);

  useEffect(() => {
    if (explanation && currentCharIndex < explanation.length) {
      const timer = setTimeout(() => {
        setAnimatedText(prevText => prevText + explanation[currentCharIndex]);
        setCurrentCharIndex(prevIndex => prevIndex + 1);
      }, 50); // speed of typewriter animation

      return () => clearTimeout(timer);
    }
  }, [animatedText, explanation, currentCharIndex]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Your Skin Type</h1>
        <p>{animatedText}</p>
      </div>
    </div>
  );
};

export default Verification;
