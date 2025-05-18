import dayjs from 'dayjs';
import { useState, useEffect, createContext } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import './App.scss';
import { AddStudyPlane } from './components/AddStudyPlane';

import BecomeAMentor from './components/BecomeAMentor';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { MdArrowBackIosNew } from "react-icons/md";
import FakeLoginPage from './components/FakeLoginPage';
import FindPairsPage from './components/FindPairsComponent';
import ProfilePage from './components/ProfilePage';
import ViewPairs from './components/ViewPairs';
import API from './API';
import ChatBox from './components/ChatBox';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage.jsx';
import ChangeMentorSchedule from './components/ChangeMentorSchedule.jsx'

import { useUser } from './UserContext';
import { useSocket } from './SocketContext.jsx';

import io from 'socket.io-client';
import { usePage } from './PageContext.jsx';
import Swal from 'sweetalert2';
import FindMentorsPage from './components/FindMentorsComponent.jsx';

const pagesNames = ["Find new pairs", "View your pairs", "Add study plan", "View study plan", "Become a mentor", "Find new mentors", "View your mentors", "Assigned students"]; //relative to logged in users
const allPages = ["Home", ...pagesNames, "Profile edit", "Page not found"];
const disabledTeacher = [false, false, false, true, false, false, true, false];
const disabledStudent = [false, false, false, true, false, false, true, true];

//color palette if needed for inline CSS
const primary = "#2e434f";
const dark = "#0f131a";


const NotificationPanel = ({ users, notifOpen, setNotifOpen, notifications, userId, setUpdateNotifications }) => {

  const { socket } = useSocket();

  useEffect(() => {

    // Code to handle new notifications or cleanup
    if (notifications.length == 0) {
      setNotifOpen(false);
    }
    
  }, [notifications, notifOpen]);


  const acceptNotification = (notification) => {
    if (notification.type === 1) { //only one notification type 1 and 2: user<->user
      API.deleteMessageOrNotification(notification.uid1, notification.timestamp)
        .then((result) => {
          API.addContact(notification.uid1, { uid2: notification.uid2, type: 0 })
            .then((result) => {
              API.sendMessageOrNotification(notification.uid2, { uid2: notification.uid1, text: users.filter(u => u.id == notification.uid2)[0].name + " accepted to be your pair, see him in 'View your pairs'", type: 2 }).then(result => {

                Swal.fire('Pair added successfully.', '', 'success');
                setUpdateNotifications();
                socket.emit('message', 'Update notifications');

              }
              ).catch(error => {
                console.error("Error sending notification:", error);
              });
            }
            )
            .catch(error => {
              console.error("Error adding to contacts:", error);
            });
        }
        )
        .catch(error => {
          console.error("Error deleting messages/notifications:", error);
        });
    }
  };

  const okNotification = (notification) => {
    if (notification.type === 2) {
      API.deleteMessageOrNotification(notification.uid1, notification.timestamp)
        .then((result) => {
          setUpdateNotifications();
          socket.emit('message', 'Update notifications');
        }
        )
        .catch(error => {
          console.error("Error deleting messages/notifications:", error);
        });
    } else {
      API.getMessagesAndNotifictions(notification.uid1)
        .then((result1) => {
          API.deleteMessageOrNotification(notification.uid1, notification.timestamp).then((result) => {
            API.sendMessageOrNotificationTimestamp(notification.uid1, notification.timestamp, {uid2: notification.uid2, type: 3, text: notification.text} ).then((result) => {
              //no update :(, just send same notification with different type)
              setUpdateNotifications();
              socket.emit('message', 'Update notifications');

            }).catch(error => {
              console.error("Error adding message/notifications:", error);
            });

          }).catch(error => {
            console.error("Error deleting messages/notifications:", error);
          });
        }).catch(error => {
          console.error("Error getting messages/notifications:", error);
        });

    }

  };

  const rejectNotification = (notification) => {
    if (notification.type === 1) { //only one notification type: user<->user
      API.deleteMessageOrNotification(notification.uid1, notification.timestamp)
        .then((result) => {
          Swal.fire('Request dismissed successfully.', '', 'success');
          setUpdateNotifications();
          socket.emit('message', 'Update notifications');
        }
        )
        .catch(error => {
          console.error("Error deleting messages/notifications:", error);
        });

    }
  };

  const [notificationsToDisplay, setNotificationsToDIsplay] = useState([]);

  useEffect(() => {

    if (notifications.filter((n) => {
      return ((!(n.uid1 == userId && n.type != 1))&&(n.type != 3))&&(n.uid2 == userId);
    }).length > notificationsToDisplay.filter((n) => {
      return ((!(n.uid1 == userId && n.type != 1))&&(n.type != 3))&&(n.uid2 == userId);
    }).length) { //this condition is equivalent to say if there are more notification for me to display (first part) (uid2) sent by someone other than past time-> ring
    
      const bell = document.getElementById("notif-bell");
      if (bell) {
    
        bell.classList.add("swing-animation"); //swing whenever notifications arrive
    
        setTimeout(() => {
          bell.classList.remove("swing-animation");
        }, 1600);
    
        if (Notification.permission === "granted") {
          new Notification("StudySync", { body: "You have a new notification on StudySync." });
        }
      }
    }

    setNotificationsToDIsplay(notifications.filter((n) => {
      return (!(n.uid1 == userId && n.type != 1))&&(n.type != 3);
    }));

    if (notificationsToDisplay.length == 0){
      setNotifOpen(false);
    }

  }, [notifications, userId]);

  return (<>{
    notificationsToDisplay.length > 0 ? (
      notifOpen ?
        <div className="notification-open" style={{ maxHeight: "80vh", overflowY: "overlay", overflowX: "hidden", width: "25vw" }}>
          {notificationsToDisplay.map((notification, i) => {


            let notifSplit = notification.text;

            if (notification.type === 0) {
              notifSplit = "You have a new message from " + users.filter(u => u.id == notification.uid1)[0].name + ": " + notifSplit;
            }
            else if (notification.type === 1) {

              notifSplit = notifSplit.split(",");

              if (notification.uid1 === userId)
                notifSplit[0] = "I";
              else
                notifSplit[2] = "you";

              notifSplit = notifSplit.join("");
            }


            return (<div key={"notification" + i} className='notif-box'>

              <p className='my-2'>{notifSplit}</p>

              <Row >
                {notification.type === 1 ? <>
                  {notification.uid1 === userId ? //cant accept your own request
                    <></> :
                    <Col>
                      <Button variant='success' className='w-100' onClick={() => acceptNotification(notification)}>Accept</Button>
                    </Col>
                  }
                  {
                    notification.uid1 === userId ?
                      <Col>
                        <Button variant='danger' className='w-100' onClick={() => rejectNotification(notification)}>Dismiss</Button>
                      </Col> :
                      <Col>
                        <Button variant='danger' className='w-100' onClick={() => rejectNotification(notification)}>Reject</Button>
                      </Col>
                  }
                </>
                  :
                  <Col>
                    <Button variant='success' className='w-100' onClick={() => okNotification(notification)}>Mark as seen</Button>
                  </Col>
                }
              </Row>
            </div>);

          })}
          <Button size="sm" variant='danger' className='notification'>{notificationsToDisplay.length}</Button>
        </div> :
        <><Button size="sm" variant='danger' className='notification'>{notificationsToDisplay.length}</Button> </>) :
      <></>
  }</>);
};


function ListOfPages(props) {

  const isTeacher = props.isTeacher;

  const toggleHamburger = props.toggleHamburger;

  const resetActiveFilter = props.resetActiveFilter;

  const navigate = useNavigate();

  return (
    <>
      <ButtonGroup vertical className="sidebar-btn-group">
        {
          pagesNames.map((pageName, i) => {
            if ("Become a mentor" === pageName && isTeacher) {
                pageName = "Change mentor schedule"
            }
            const dis = isTeacher ? disabledTeacher[i] : disabledStudent[i];
            
            return (
              <Button key={"button-sidebar-" + i}
                disabled={dis}
                variant='dark'
                onClick={() => {
                  toggleHamburger();
                  resetActiveFilter();
                  navigate('/' + pageName.replaceAll(" ", ""))
                }
                }

              >
                <div
                  title={dis ? ("Pass to " + (isTeacher ? "student" : "teacher") + " profile to activate functionality") : "Navigate to " + pageName} >
                  {pageName}
                </div>

              </Button>
            );
          }
          )
        }
      </ButtonGroup >
    </>
  );
}

function Sidebar(props) {

  const isTeacher = props.isTeacher;
  const hamburgerOpen = props.hamburgerOpen;
  const toggleHamburger = props.toggleHamburger;
  const resetActiveFilter = props.resetActiveFilter;

  const { page } = usePage();

  return (
    <>
      <div className={`sidebar ${hamburgerOpen ? 'open' : ''}`}>
        <div className="sidebar-back-container" >
          <Button onClick={() => toggleHamburger(hamburgerOpen)} variant='dark' className='sidebar-back-button'>

            <MdArrowBackIosNew className="navbarIcon" style={{ height: "2.5em", width: "auto", position: "absolute", left: "1em" }} />
            <div className='sidebar-back-button-text'>
              {page}

            </div>
          </Button>
        </div>

        <ListOfPages isTeacher={isTeacher} toggleHamburger={() => toggleHamburger(hamburgerOpen)} resetActiveFilter={resetActiveFilter} />
      </div>
    </>
  );
}


dayjs().format('L LT');


export const SocketContext = createContext();

function App() {
  const { user, setUser } = useUser();

  const [isTeacher, setIsTeacher] = useState(false);

  const userInfo = user ? user : {};
  const userId = userInfo ? userInfo.id : 0;

  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { setSocket } = useSocket();

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(allPages.length - 1);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [notifOpen, setNotifOpen] = useState(true);

  const [updateNotifications, setUpdateNotifications] = useState(true); // toogle to trigger an update

  const [teachingTime, setTeachingTime] = useState([]);
  const [studyTime, setStudyTime] = useState([]);

  const [usersContacts, setUsersContacts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const hostname = window.location.hostname;

  const [activeFilter, setActiveFilter] = useState({ //here for persistency after exit of search
    university: [],
    degree: [],
    major: [],
    course: [],
    language: [],
  });

  const resetActiveFilter = () => {
    setActiveFilter({ //here for persistency after exit of search
      university: [],
      degree: [],
      major: [],
      course: [],
      language: [],
    });
  };

  const { page } = usePage();

  //socket management
  useEffect(() => {
    // Connect to the Socket.IO server
    const socket_io = io('https://studysync-project.onrender.com:443'); // Replace with your server URL
    // Listen for a 'connect' event
    socket_io.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for a 'disconnect' event
    socket_io.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Emit a custom event (e.g., 'notification') to the server
    socket_io.emit('message', 'Hello from client');

    // Listen for custom events from the server
    socket_io.on('message', (data) => {
      console.log('Received message from server:', data);
      if (data === 'Update notifications') {
        setUpdateNotifications(true);
      }
    });

    setSocket(socket_io);


    // Cleanup function to disconnect the socket when component unmounts
    return () => {
      socket_io.disconnect();
    };
  }, []); // Run this effect only once on component mount


  useEffect(() => {
    //triggered right after change of page
    // Measure the height of the fixed navbar and update the state to make all content of the page start with padding= navbar height
    const navbarElement = document.querySelector('.navbar');
    if (navbarElement) {
      const height = navbarElement.offsetHeight;
      setNavbarHeight(height);
    }
  }, []); // Run this effect once when the component mounts



  useEffect(() => {

    if (!userId) return;

    API.getMessagesAndNotifictions(userId)
      .then(notifmessData => {

        setNotifications(notifmessData);
        setMessages(notifmessData.filter(nm => nm.type === 0 || nm.type === 3));
        API.getUsersData()
          .then(usersData => {


            API.getContactsData(userInfo.id).then(contactsData => {

              const contacts = contactsData.map(contact => {
                if (contact.uid1 != userInfo.id)
                  return contact.uid1 - 1;
                else
                  return contact.uid2 - 1;
              });

              let move = 0;


              const notContacts = [...Array(usersData.length).keys()].filter(function (val) {

                return contacts.indexOf(val) < 0;

              });

              setUsersContacts(contacts.map((index) => usersData[index]));
              setSuggestedUsers(notContacts.map((index) => usersData[index]));

              if (contacts.length === 0 && page === 'View pairs' && !updateNotifications) { //update Notification trigger is avoided
                Swal.fire('You have no pair yet. \n Add someone to your pair to start chatting.', '', 'warning');
              }

              setUpdateNotifications(false);
              

            }).catch(error => {
              console.error("Error fetching contacts:", error);
            });

          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });

      })
      .catch(error => {
        console.error("Error fetching messages/notifications:", error);
      });

  }, [updateNotifications, userId]);

  useEffect(() => {

    if (!userId) return;

    API.getMentorsData()
      .then(data => {
        const mentor = data.filter(d => d.uid === user.id)[0];
        if (mentor) {
          setUser({ ...user, ...mentor });
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
        }
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      });

    console.log("logged in as");
    console.log(user);
  }, [userId]);


  return (
    <>
      <BrowserRouter>

        <>
          <Sidebar
            isTeacher={isTeacher}
            currentPage={allPages[currentPage]}
            setCurrentPage={(pageN) => setCurrentPage(pageN)}
            toggleHamburger={(h) => setHamburgerOpen(!h)}
            hamburgerOpen={hamburgerOpen}
            resetActiveFilter={resetActiveFilter}
          />

          <div className={hamburgerOpen || notifOpen ? "contentDark" : ""} onClick={() => {
            setHamburgerOpen(false);
            setNotifOpen(false);
          }} />

          <MyNavbar
            isTeacher={isTeacher}
            siteName={"StudySync"}
            toggleHamburger={(h) => setHamburgerOpen(!h)} hamburgerOpen={hamburgerOpen}
            setNotifOpen={setNotifOpen}
            notifOpen={notifOpen}
            userInfo={userInfo}
            resetActiveFilter={resetActiveFilter}
          />


          <NotificationPanel
            users={usersContacts.concat(suggestedUsers)}
            notifOpen={notifOpen}
            setNotifOpen={setNotifOpen} notifications={notifications}
            userId={userInfo.id}
            setUpdateNotifications={() => setUpdateNotifications(true)}
          />


          <div style={{ paddingTop: `${navbarHeight}px` }}>
            <Routes>
              <Route path='Becomeamentor' element={
                <BecomeAMentor
                  teachingTime={teachingTime}
                  setTeachingTime={setTeachingTime}
                  setIsTeacher={setIsTeacher}
                />} />

                <Route path='Changementorschedule' element={
                  <ChangeMentorSchedule
                  teachingTime={teachingTime}
                  setTeachingTime={setTeachingTime}
                  setIsTeacher={setIsTeacher}
                />} />

              <Route path='Findnewpairs' element={
                <FindPairsPage
                  setUpdateNotifications={() => setUpdateNotifications(true)}
                  pendingRequest={notifications.filter(n => n.type === 1)}
                  suggestedUsers={suggestedUsers}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />} />

              <Route path='Findnewmentors' element={
                <FindMentorsPage
                  setUpdateNotifications={() => setUpdateNotifications(true)}
                  pendingRequest={notifications.filter(n => n.type === 1)}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />} />


              <Route path='Profile/:id' element={
                <ProfilePage isTeacher={isTeacher}
              />} />

              <Route path='Addstudyplan' element={
                <AddStudyPlane
                  studyTime={studyTime}
                  setStudyTime={setStudyTime}
                  selectableSubjects={userInfo.course}
                />} />

              <Route path='Viewyourpairs' element={
                <ViewPairs
                  setUpdateNotifications={() => setUpdateNotifications(true)}
                  pendingRequest={notifications.filter(n => n.type === 1)}
                  usersContacts={usersContacts}
                  suggestedUsers={suggestedUsers}
                />} />

              <Route path='/chat/:uid1/:uid2' element={<ChatBox
                messages={messages}
                setUpdateMessages={() => setUpdateNotifications(true)}
                additionalPadding={navbarHeight}

              />} />

              <Route path='/Home' element={<HomePage
                onPageChange={setCurrentPage}
                isTeacher={isTeacher}
              />} />

              <Route path="" element={<FakeLoginPage
                selectedUserId={userId}
              />} />

              <Route path="*" element={<NotFoundPage
              />} />

            </Routes>

          </div>
        </>


      </BrowserRouter>
    </>
  )
}

export default App