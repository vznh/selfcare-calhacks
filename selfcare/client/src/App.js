import './App.css';
import React, { useState, useEffect } from 'react';
import MyButtonComponent from './components/button';

function App() {
  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [symptoms, setSymptoms] = useState([]);
  const [habits, setHabits] = useState([]);
  const [testHistory, setTestHistory] = useState([]);


  // pulling data
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

  // setting time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    }, 1000);

    return () => clearInterval(interval);
  });

  const handleClick = () => {
    setValue(0);
  }

  return (
    <>
      <main className="content">
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
          <p style={{ fontSize: '24px', fontWeight: '400' }}><span style={{ fontWeight:'300'}}>focus areas:</span> {symptoms.join(', ')}</p>
        </div>
        <div style={{ flex: 1, backgroundColor: 'whitesmoke', }}>
          <div style={{ padding: '40px', fontSize: '40px', fontFamily: 'Inter', fontWeight: '300' }}>product recommendations</div>
        </div>
        <MyButtonComponent/>

      </main>
    </>
  );
}

export default App;
