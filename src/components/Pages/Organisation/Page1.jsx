import React, { useState } from 'react';
import Logo from '../../../Images/logo 4.png';
import '../../Pages/Organisation/Page1.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Organisation = () => {
    const navigate = useNavigate()
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

    const handleSaveClick = async () => {
        try {
            if (selectedDiv === null || inputValue.trim() === '') {
                setMessage('Please select a division and enter a value.');
                return;
            }

            // Make a single API call to save both divIndex and inputValue
            await axios.post('/save-data', { divIndex: selectedDiv, inputValue });

            setMessage('Data saved successfully.');
            navigate('/hosting')

        } catch (error) {
            console.error('Error saving data:', error);
            setMessage('Error saving data. Please try again.');
        }
    };

    return (
        <React.Fragment>
            <div className='container'>
                <div className='container-1'>
                    <img src={Logo} alt='' height={60} />
                </div>

                <div className='l-1'>
                    <h2
                        style=
                        {{
                            fontWeight: 'normal',
                            fontSize: '30px'
                        }}>
                        Welcome
                    </h2>
                    <h4
                        style=
                        {{
                            color: 'gray',
                            fontSize: '20px'
                        }}>
                        Choose From the following
                    </h4>
                </div>
            </div>
            <div className="contain-1">
                <div className="text" onClick={() => handleDivClick('Developer')}>
                    <p>Developer</p>
                </div>
                <div className="text" onClick={() => handleDivClick('Organisation')}>
                    <p>Organisation</p>
                </div>
                <div className="text" onClick={() => handleDivClick('Company')}>
                    <p>Company</p>
                </div>
            </div>
            {selectedDiv !== null && (
                <div className='div-center'>
                    <input
                        type="text"
                        placeholder={selectedDiv}
                        value={inputValue}
                        onChange={handleInputChange}

                    />
                <button className="btn btn-primary" onClick={handleSaveClick}>Submit</button>
                </div>
            )}
        </React.Fragment>
    );
};

export default Organisation;
