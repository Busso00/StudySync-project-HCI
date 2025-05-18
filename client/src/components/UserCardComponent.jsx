import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import profileIcon from '../assets/profile.png';
import API from '../API.js';
import { useUser } from '../UserContext.jsx';
import Swal from 'sweetalert2';


import { useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext.jsx';


import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css file


const UserCardComponent = ({ otherUserInfo, setUpdateNotifications, pendingRequest, isMentors }) => {

  const navigate = useNavigate();

  const { user } = useUser();

  const { socket } = useSocket();

  const userInfo = user;
  const [alreadyPaired, setAlreadyPaired] = useState(false);

  const { picture, id, name, city, university, degree, major, language, course } = otherUserInfo;

  const handleAboutMeClick = () => {
    navigate(`/profile/${id}?readOnly=true`);
  };

  const askAddContact = () => {

    API.sendMessageOrNotification(userInfo.id, { uid2: id, text: userInfo.name + ", want to add ," + name + ", to pairs", type: 1 }).then(result => {
      Swal.fire('Request sent successfully.', '', 'success');
      setUpdateNotifications();
      socket.emit('message', 'Update notifications');
    })
      .catch(error => {
        console.error("Error sending notification:", error);
      });
  };



  const dismissRequest = (pendingRequest) => {

    if (pendingRequest != null) {
      API.deleteMessageOrNotification(pendingRequest.uid1, pendingRequest.timestamp).then(result => {
        Swal.fire('Request dismissed successfully.', '', 'success');
        setUpdateNotifications();
        socket.emit('message', 'Update notifications');
      })
        .catch(error => {
          console.error("Error deleting notification:", error);
        });
    }
  }

  const addContact = (pendingRequest) => {
    if (pendingRequest != null) {
      API.deleteMessageOrNotification(pendingRequest.uid1, pendingRequest.timestamp).then(result => {
        API.addContact(pendingRequest.uid1, { uid2: pendingRequest.uid2, type: 0 })
          .then((result) => {
            API.sendMessageOrNotification(userInfo.id, { uid2: id, text: userInfo.name + " accepted to be your pair, see him in 'View your pairs'", type: 2 }).then(result => {
              Swal.fire('Pair added successfully.', '', 'success');
              setUpdateNotifications();
              socket.emit('message', 'Update notifications');
            }
            ).catch(error => {
              console.error("Error sending notification:", error);
            });
          })
          .catch(error => {
            console.error("Error adding to contacts:", error);
          });
      })
        .catch(error => {
          console.error("Error deleting notification:", error);
        });
    }
  }

  async function showConfirmDialog() {
    return await Swal.fire({
        title: 'Do you want to remove '+otherUserInfo.name+' from your pairs?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
    });
}

  async function removeContact() {

    const result = await showConfirmDialog();

    if (!result)
      return;

    API.removeContact(userInfo.id, { uid2: id }).then(result => {
      Swal.fire('Pair removed successfully.', '', 'success');
      setUpdateNotifications();
      socket.emit('message', 'Update notifications');
    }).catch(error => {
      console.error("Error sending notification:", error);
    });
  };

  const renderButton = () => {
    if (pendingRequest == "nope" || alreadyPaired) {
      return (<>
        { !isMentors && <Button variant="success" className="btn-custom" onClick={() => navigate('/chat/' + userInfo.id + '/' + id)}><span>go to chat</span></Button> }
        { !isMentors && <Button variant="danger" className="btn-custom" onClick={() => removeContact()}><span>remove from pairs</span></Button> }
      </>);
    } else {

      const iAsked = pendingRequest.filter(r => r.uid1 === userInfo.id && r.uid2 === id);
      const otherAsked = pendingRequest.filter(r => r.uid2 === userInfo.id && r.uid1 === id);

      if (iAsked.length > 0) {
        return (<> { !isMentors && <Button variant="danger" className="btn-custom" onClick={() => dismissRequest(iAsked[0])}><span>dismiss request</span></Button> } </>);
      }
      else if (otherAsked.length > 0) {
        return (
          <>
            { !isMentors && <Button variant="success" className="btn-custom" onClick={() => addContact(otherAsked[0])}><span>accept request</span></Button> }
            { !isMentors && <Button variant="danger" className="btn-custom" onClick={() => dismissRequest(otherAsked[0])}><span>reject request</span></Button> }
          </>);
      }
      else {
        return ( <> { !isMentors && <Button variant="success" className="btn-custom" onClick={() => askAddContact()}><span>request add pair</span></Button> } </>);
      }
    }
  };

  return (
    <Card className="user-card">
      <Card.Body>
        <div className="user-info" style={{ paddingBottom: "100px" }}>
          <div className="icon-container">
            <Card.Img variant="top" src={picture || profileIcon} className='profile-icon' />
            <Card.Title className='user-name'>{name}</Card.Title>
            <Card.Text className='user-major-city'>{university}</Card.Text>
            <Card.Text className='user-major-city'>{degree + ", " + major}</Card.Text>

          </div>
        </div>

        <div className='buttons'>
          <Button variant="primary" className="btn-custom" onClick={handleAboutMeClick}><span>about me</span></Button>
          {
            renderButton()
          }
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCardComponent;
