import React, { useState } from 'react';
import Logo from "../../../Images/logo 4.png"
import "./../Hosting/Hosting.css"
import axios from 'axios';
import { Link } from 'react-router-dom'

const Hosting = () => {
    const [selectedTab, setSelectedTab] = useState("selfhosting"); // Initialize with the ID of the first tab

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
                            Welcome
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
                <div className={`box ${selectedTab === "selfhosting" ? "selected" : ""}`}>
                    <Link to="/selfhosting" onClick={() => setSelectedTab("selfhosting")} className='link'>
                        <h3>
                            Self Hosting
                        </h3>
                    </Link>
                </div>
                <div className={`box ${selectedTab === "xerocodee" ? "selected" : ""}`}onClick={() => setSelectedTab("xerocodee")}>
               
                    <h3>
                        XeroCodee Hosting
                    </h3>
                   
                </div>
            </div>
        </>
    )
}

export default Hosting;
