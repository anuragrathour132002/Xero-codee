import React, { useEffect, useState } from 'react'
import Logo from '../../Images/logo 4.png'
import '../../components/Login/Login.css'
import Image1 from "../../Images/image 6.png"
import { useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Link } from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { firstName, lastName } = useParams();


    // Redirect the user to the authorization URL


    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    //    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "Signed In successfully", classes: "#43a047 green darken-1" })
                    navigate('/page1')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <>

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
                        Welcome Arya soni{firstName}
                    </h2>
                    <h4
                        style=
                        {{
                            color: 'gray',
                            fontSize: '20px'
                        }}>
                        Login To Your Account
                    </h4>
                </div>

            </div>

            <img src={Image1} alt='' height={500} width={500} className='picture' />
            <div className="col-sm-3" id='edit' >
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email-id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" style={{ marginTop: '1rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div class="d-grid gap-2 col-12">
                    <button class="btn btn-primary" type="button" style={{ marginTop: '1rem' }}
                        onClick={() => PostData()}
                    >Login</button>
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
                        <FcGoogle className="icon" /> Sign In with Google
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
                      <ImGithub className="icon" /> Sign In with Github
                    </button>
                </div>
                <p style={{marginTop:'1rem',textAlign:'center'}}>
                  Don't have an account? <Link to="/signup">SignUp</Link>
                </p>
            </div>

        </>
    )
}

export default Login;

