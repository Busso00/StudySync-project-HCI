//import { useState, useEffect } from 'react';

import { Navbar, Button, ListGroup, ButtonGroup } from 'react-bootstrap';
import { BsBell } from 'react-icons/bs';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile.png';
import { usePage } from '../PageContext';


function MyNavbar(props) {

  const navigate = useNavigate();
  //if props.user defined -> assign to 2nd expr
  
  const resetActiveFilter=props.resetActiveFilter;

  const userId = props.userInfo.id;
  
  const isTeacher = props.isTeacher;
  const siteName = props.siteName;
  
  const hamburgerOpen = props.hamburgerOpen;
  const toggleHamburger = props.toggleHamburger;
  const notifOpen = props.notifOpen;
  const setNotifOpen = props.setNotifOpen;

  const { page } = usePage();
  
  return (

    <Navbar bg="primary" style={{ top: "0", zIndex: "995", position: "fixed", width: "100%", padding: "0" }}>
      <ListGroup horizontal>

        <ListGroup.Item className="upper">
          <Button onClick={() => toggleHamburger(hamburgerOpen)}>
            <GiHamburgerMenu className="navbarIcon" />
          </Button>
        </ListGroup.Item>

        <ListGroup.Item className="upper">
          <Button style={{ fontFamily: "Brush Script MT, cursive", fontSize: "2.5em", padding:0, margin:0 }} onClick={()=>navigate('/Home')}>{siteName}</Button>
        </ListGroup.Item>

        <ListGroup.Item className="ms-auto text-center upper">
          <Button style={{ fontWeight: "bold", fontSize: "1.5em", pointerEvents: "none" }}>{page}</Button>
        </ListGroup.Item>

        <ListGroup.Item className="ms-auto upper">
          <ButtonGroup className="padLeft">

          

            <Button className="navbarButton">
              {isTeacher ? "Mentor" : "Student"}
            </Button>

            <Button className="navbarButton" onClick={()=>{
              setNotifOpen(!notifOpen);
            }}>
              <BsBell id={"notif-bell"} className="navbarIcon"/>
            </Button>

            <Button onClick={() => {
                navigate('/profile/'+userId);
              }} className="navbarButton">
              <img src={profileIcon} alt="Profile" className="navbarIcon" style={{borderRadius:"25px"}} />
            </Button>

            <Button onClick={() => {
                resetActiveFilter();
                navigate('/');
              }} className="navbarButton">
              <MdLogout className="navbarIcon" />
            </Button>

          </ButtonGroup>
        </ListGroup.Item>

      </ListGroup>
    </Navbar>

  );
}

export default MyNavbar;