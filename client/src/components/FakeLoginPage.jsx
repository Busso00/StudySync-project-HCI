import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import API from '../API.js';
import { useUser } from '../UserContext.jsx';
import { usePage } from '../PageContext.jsx';

export const UserContext = createContext();

function FakeLoginPage (props){

  const selectedUserId = props.selectedUserId;

  const { setPage } = usePage();

  useEffect(()=>{
    setPage('Login');
  }, []);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const {user,setUser} = useUser();

  useEffect(() => {
    API.getUsersData()
      .then(usersData => {
        setUsers(usersData);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleNext = () => {
    if (selectedUserId) {
      const user = users.find(user => user.id.toString() === selectedUserId.toString());
      if (user) {
        setUser(user);
        navigate('/Home');
      }
    }
  };

  const handleChange = (e) => {
    const userId = e.target.value;
    const user = users.find(user => user.id.toString() === userId);
    if (user) {
      setUser(user);
    }
  };

  return (
    
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <Row>
        <Col md={12} className="text-center">
          <Form.Group controlId="formUser">
            <Form.Label>Select user to continue:</Form.Label>
            <Form.Select 
              aria-label="Select user" 
              value={selectedUserId}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {users.map(user => (
                <option key={user.id} value={user.id.toString()}>{user.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button style={{ marginTop: "10px" }} variant="primary" onClick={handleNext}>Next</Button>
          <Button style={{ marginTop: "10px" }} variant="primary" onClick={() => {
            if (Notification.permission !== "granted") {
              Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                  alert("Browser notifications enabled!");
                }
              });
            }}}>
              Enable notifications
          </Button>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
};

export default FakeLoginPage;
