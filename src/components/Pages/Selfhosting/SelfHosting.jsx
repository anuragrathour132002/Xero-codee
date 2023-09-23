import React, { useState } from 'react';
import Logo from "../../../Images/logo 4.png";
import "./../Selfhosting/SelfHosting.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Hosting = () => {
  const navigate = useNavigate();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState(null);

  const handleDivClick = (divIndex) => {
    
      setSelectedDiv(divIndex);
      setInputValue('');
    
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a value.');
      return;
    }
    // Redirect to the GitHub component with the inputValue as a parameter
    navigate(`/repos/${inputValue}`);
  };

  return (
    <>
      <div className='container'>
        <div className='container-1'>
          <img src={Logo} alt='' height={60} />
        </div>
        <div>
          <div className='l-1'>
            <h2
              style={{
                fontWeight: 'normal',
                fontSize: '30px'
              }}>
              Welcome Arya Soni!
            </h2>
            <h4
              style={{
                color: 'gray',
                fontSize: '20px'
              }}>
              Choose from the following Deployment Options
            </h4>
          </div>
        </div>
      </div>
      <div className='flex-row'>
        <div className='box'>
          <h3>AWS Cloud</h3>
        </div>
        <div className='box' onClick={() => handleDivClick("GitHub")}>
          <h3>GitHub</h3>
        </div>
      </div>
      {selectedDiv !== null && (
        <div className='div-center'>
          <input
            type="text"
            placeholder="Type your GitHub repository"
            value={inputValue}
            onChange={handleInputChange}

          />
          <button className="btn btn-primary" onClick={handleSaveClick}>Submit</button>
        </div>
      )}
    </>
  );
}

export default Hosting;
