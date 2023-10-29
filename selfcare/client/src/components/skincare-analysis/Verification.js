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
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h3>Skin Type:</h3>
            <span><b>Sensitive & Combination Skin</b>: Your skin is sensitive as it reacts to new products by breaking out. You mentioned your skin feels dry during cloudy days, which could indicate a combination skin type with both oily and dry areas.</span>
            <br />
            <span><b>Acne Concerns:</b> Product-related and Hormonal Acne: You get pimples when you try new products and also experience deep, painful cystic acne, which is often hormonal.</span>
            <br />
            <span><b>Pimple Characteristics:</b> Surface-level & Hormonal: Surface-level pimples that are easy to pop are often related to issues like hygiene or irritation, while deep and painful cystic acne is usually hormonal.</span>
            <br />
            <span><b>Areas of Concern:</b></span>
            <span><b>Cheeks and Jawline</b>: These areas are common for hormonal acne.</span>
            <br />
            <span><b>Additional Observations:</b></span>
            <span><b>Redness:</b> Noted around new acne spots and around the nose, but not directly on it.</span>
            <br />
            <span><b>Smooth Texture:</b> Overall skin texture is smooth, which is a good sign.</span>
            <br />
            <span><b>Skincare Routine: </b>We don't know your current routine, so we don't know if your skincare routine is bad for you.</span>
        </div>
    </>
  );
};

export default Verification;
