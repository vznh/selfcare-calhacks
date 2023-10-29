import './App.css';
import React, { useState, useEffect } from 'react';
import UploadImage from './components/skincare-analysis/UploadImage';

function App() {
  // General state
  const [menuValue, setMenuValue] = useState(0);
  const [username, setUsername] = useState('');
  const [currentTime, setCurrentTime] = useState();

  // User data
  const [symptoms, setSymptoms] = useState([]);
  const [habits, setHabits] = useState([]);
  const [testHistory, setTestHistory] = useState([]);

  // Test data
  const [level, setLevel] = useState(0); // Specific test level, universal for both skin/hair


  // Pulling data
  useEffect(() => {
    fetch('example_data.json')
    .then((response) => response.json())
    .then((data) => {
      setUsername(data.name);
      setSymptoms(data.symptoms);
      setHabits(data.habits);
      setTestHistory(data.test_history);
    })
    .catch((error) => {
      console.error('err: ', error);
    });
}, []);

  // Setting time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour24: true };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    }, 1000);

    return () => clearInterval(interval);
  });

  // Universal continue click
  const handleContinueClick = () => {
    setLevel(level + 1);
  }

  // Dashboard -> Tests click
  const handleProcessButtonClick = () => {
    setMenuValue(1);
  };

  const beginTest = (type) => {
    switch (type) {
      case 'skincare':
        setMenuValue(2);
        setLevel(1);
        console.log(`${menuValue}, ${level}`);
        break;
      case 'haircare':
        setMenuValue(3);
        setLevel(1);
        console.log(`${menuValue}, ${level}`);
        break;
    }
  } 

  return (
    <>
    { /* Dashboard */ }
    {menuValue === 0 && (
      <main className="dashboard">
        <div className="headArea" style={{
          fontFamily: 'Inter',
          fontWeight: '100',
          padding: '40px'
        }}>
          <p style={{ fontFamily: 'Inter', fontSize: '80px'}}>hello, {username}</p>
          <span style={{
            fontSize:'48px',
          }}>{currentTime}</span>  
        </div>
        <div className="details" style={{
          padding: '40px'
        }}>
          <p style={{ fontSize: '30px', fontWeight: '400' }}><b>focus areas</b></p>
          <p style={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: '300' }}><span style={{ fontWeight:'400'}}>current symptoms:</span> {symptoms.join(', ')}</p>
          <p style={{ fontSize: '24px', fontFamily: 'Inter', fontWeight: '400' }}>product recommendations</p>
        </div>
        <div className="tests" style={{
          position: 'relative',
          padding: '40px'
        }}>
          <button style={{
            position: 'relative',
            top: '20px',
            padding: '40px',
            fontFamily: 'Inter',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            marginLeft: '40px',
          }} onClick={handleProcessButtonClick}>start an assessments</button>
        </div>"

      </main>
    )}
    { /* Test Selection */ }
    {menuValue === 1 && level === 0 && (
      <main className="choice" style={{ fontFamily: "Inter" }}>
        <div className="container" style={{
          position: 'relative',
          height: '100vh',
          width: '100vw'
        }}>
          <button className='left-button' onClick={() => beginTest('skincare')} style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '25%',
            fontWeight: '100',
          }}>analyze your skin</button>
          <button className='right-button' onClick={() => beginTest('haircare')} style={{
            position: 'absolute',
            top: '50%',
            right: '25%',
            transform: 'translateY(-50%)',
            fontWeight: '100'
          }}>analyze your hair</button>
        </div>
      </main>
    )}
    { /* Skincare Test Level 1 */ }
    {menuValue === 2 && level === 1 && (
      <UploadImage />
    )}
    {menuValue === 2 && level === 2 && (
      <></>
    )}
    {menuValue === 2 && level === 3 && (
      <></>
    )}
    </>
  );
}

export default App;
