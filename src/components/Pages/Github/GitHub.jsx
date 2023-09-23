import React, { useState, useEffect } from 'react';
import Logo from "../../../Images/logo 4.png";
import "./../Github/GitHub.css";
import axios from 'axios';
import { useParams} from 'react-router-dom'; 

const GitHub = () => {
  const { inputValue } = useParams(); // Use the same variable name

  const [repos, setRepos] = useState([]);
  console.log(inputValue)

  useEffect(() => {
    // Fetch GitHub repositories using the GitHub API based on the inputValue
    fetch(`https://api.github.com/users/${inputValue}/repos`)
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error(error));
  }, [inputValue]);

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
      <div className="form-outline" id="box">
        <h1 style={{fontSize:'25px'}}>GitHub Repositories for {inputValue}</h1>
        {repos.length>0?(
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
        ):(
        <p style={{fontSize:'40px',textAlign:'center',fontFamily:'cursive'}}>No data found</p>
        )}
      </div>
    </>
  );
}

export default GitHub;
