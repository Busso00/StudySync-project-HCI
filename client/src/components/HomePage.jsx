import React, { useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { usePage } from '../PageContext';

function HomePage(props) {
    
    const {setPage} =  usePage();

    useEffect(()=>{
        setPage('Home');
    }, []);

    const navigate = useNavigate(); //don't use links: doesn't work

    const isTeacher = props.isTeacher;

    return (
        <>
            <div style={{ textAlign: "center", paddingTop: "0rem", position: "initial"}}>
                
                    
                    <nav className="navbar">
                        <ul className="nav-list">

                            <li className="nav-item">
                                <a href="#pairs">Pairs</a>
                                <ul className="dropdown-menu">
                                    <li><a onClick={()=>navigate('/Findnewpairs')}>Find new pairs</a></li>
                                    <li><a onClick={()=>navigate('/Viewyourpairs')}>View your pairs</a></li>
                                </ul>
                            </li>
                            
                            
                            <li className="nav-item">
                                <a href="#mentors">Mentors</a>
                                    <ul className="dropdown-menu">
                                    <li><a onClick={()=>navigate('/Findnewmentors')}>Find new mentors</a></li>
                                    <li><a onClick={(ev)=>ev.preventDefault()}>View your mentors</a></li>
                                    </ul>
                            </li>
                            

                            <li className="nav-item">
                                <a href="#plan">Study plan</a>
                                    <ul className="dropdown-menu">
                                    <li><a onClick={()=>navigate('/Addstudyplan')}>Add study plan</a></li>
                                    <li><a onClick={(ev)=>ev.preventDefault()}>View study plan</a></li>
                                    </ul>
                            </li>

                            <>{isTeacher?
                                <li className="nav-item">
                                    <a href="#change mentor schedule">Change mentor shedule</a>
                                        <ul className="dropdown-menu">
                                            <li><a  onClick={()=>navigate('/Changementorschedule')}>Change mentor shedule</a></li>
                                        </ul>
                                </li>
                                :
                                <li className="nav-item">
                                    <a href="#become a mentor">Become a mentor</a>
                                        <ul className="dropdown-menu">
                                            <li><a  onClick={()=>navigate('/Becomeamentor')}>Become a mentor</a></li>
                                        </ul>
                                </li>
                            }
                            </>

                            
                            {isTeacher?
                            <li className="nav-item">
                                <a href="#plan">Assigned students</a>
                                    <ul className="dropdown-menu">
                                    <li><a onClick={(ev)=>ev.preventDefault()}>Assigned students</a></li>
                                    
                                    </ul>
                            </li>:<></>
                            }

                        </ul>
                    </nav>
            
        <div className="home-page-background">
                
                <br />
                
                    <h3>Welcome to StudySync</h3>
                    <br/>
                    <h4>
                In 'Pairs' you can find classmates to study with based on your common necessities.<br/>
                In 'Mentors' you can also find teachers that can assist you during your university carreer.<br/>
                </h4>
                <br/>
                Don't forget to add your own information and study plan to help other students find you easily!<br/>
            
           </div>
        </div>     
        <a href="https://www.freepik.com/free-vector/teen-school-friends-illustration_13146660.htm#query=student%20group%20cartoon&position=42&from_view=search&track=ais&uuid=049f2603-911e-4da7-bac4-56f8de019fba">Image by pch.vector on Freepik</a>
        </>
    );
}

export default HomePage;
