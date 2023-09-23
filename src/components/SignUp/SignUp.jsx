import React, { useState } from 'react';
import Logo from '../../Images/logo 4.png';
import '../../components/SignUp/SignUp.css';
import Image1 from '../../Images/image 6.png';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Link } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstname, lastname, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const PostData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: 'Invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    if (password !== confirmPassword) {
      M.toast({ html: 'Passwords do not match', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        password,
        email,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          M.toast({ html: 'Email sent on your email id', classes: '#43a047 green darken-1' });
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='container'>
        <div className='container-1'>
          <img src={Logo} alt='' height={60} />
        </div>

        <div className='l-1'>
          <h2
            style={{
              fontWeight: 'normal',
              fontSize: '30px',
            }}
          >
            Hello !
          </h2>
          <h4
            style={{
              color: 'gray',
              fontSize: '20px',
            }}
          >
            Create Your Account
          </h4>
        </div>
      </div>

      <img src={Image1} alt='' height={500} width={500} className='picture' />
      <div className='col-sm-3' id='edit'>
        <input
          type='text'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='First Name'
          style={{ marginTop: '1rem' }}
          name='firstname'
          value={firstname}
          onChange={handleChange}
        />
        <input
          type='text'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='Last Name'
          style={{ marginTop: '1rem' }}
          name='lastname'
          value={lastname}
          onChange={handleChange}
        />
        <input
          type='email'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='Email-id'
          style={{ marginTop: '1rem' }}
          name='email'
          value={email}
          onChange={handleChange}
        />
        <input
          type='password'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='Password'
          style={{ marginTop: '1rem' }}
          name='password'
          value={password}
          onChange={handleChange}
        />
        <input
          type='password'
          className='form-control'
          id='exampleFormControlInput1'
          placeholder='Confirm Password'
          style={{ marginTop: '1rem' }}
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />
        <div className='d-grid gap-2 col-12'>
          <button className='btn btn-primary' type='button' style={{ marginTop: '1rem' }} onClick={PostData}>
            Button
          </button>
        </div>
        <h5 style={{ marginTop: '1rem', color: 'grey' }}>OR</h5>
        <div className="s-social-btn">
        <button className='s-button'
          onClick={() => {
            const clientId = '629893813264-9v3k77joudcb57gt87jd3e91d2im1r1d.apps.googleusercontent.com';
            const redirectUri = 'http://localhost:3000/page1';
            // Redirect the user to the authorization URL
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

            window.location.href = authUrl;
          }}
        >
          <FcGoogle className="icon" /> Sign Up with Google
        </button>
        <button
          className="s-button"
          onClick={() => {
            const clientId = '8057a29b9db78d7b6336';
            const redirectUri = 'http://localhost:3000/page1';
            // Redirect the user to the authorization URL
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

            window.location.href = authUrl;
          }}
        >
          <ImGithub className="icon" /> Sign Up with Github
        </button>
      </div>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account ? <Link to="/login">SignIn</Link>
      </p>
      </div>
      

    </>
  );
};

export default SignUp;
