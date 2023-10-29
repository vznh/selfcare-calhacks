import React, { useState } from 'react';
import axios from 'axios'; 

const ClarifyingQ = () => {
    const questions = new Map();
    questions.set(1, "On a scale of 1 to 5, how oily does your face feel by midday? (1 being not oily at all, 5 being extremely oily)");
    questions.set(2, "How does your skin usually react to new skincare products? (Immediate irritation, takes time to show reaction, no reaction, etc.)");
    questions.set(3, "Does your skin feel different in varying weather conditions? If so, how?");
    questions.set(4, "How visible are the pores on your nose and cheeks? (Very visible, somewhat visible, not visible)");
    questions.set(5, "How often do you get pimples or acne breakouts? (Daily, weekly, monthly, rarely)");
    questions.set(6, "Where do pimples most commonly appear on your face? (Forehead, cheeks, chin, etc.)");
    questions.set(7, "Are your pimples usually deep and painful, surface-level and easy to pop, or somewhere in between?");
    questions.set(8, "How would you describe the overall texture of your skin? (Smooth, rough, combination of both)");
    questions.set(9, "Do you notice any redness, dark spots, or other discolorations when you have acne or pimples?");
    questions.set(10, "What products are you currently using on your skin? (Cleanser, toner, moisturizer, etc.)");

    const [questionNum, setQuestionNum] = useState(1);
    const [answer, setAnswer] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [userResponses, setUserResponses] = useState([]);

    const handleNextClick = () => {
        setQuestionNum(questionNum + 1);
        setShowNextButton(false);
    }

    const handlePrevClick = () => {
        setQuestionNum(questionNum - 1);
    }


}    

export default ClarifyingQ;