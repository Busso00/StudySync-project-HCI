import React, { useState, useEffect, useRef } from 'react';
import UserListComponent from './UsersListComponent';
import { useUser } from '../UserContext.jsx';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { usePage } from '../PageContext.jsx';

const ViewPairs = ({usersContacts, suggestedUsers, setUpdateNotifications, pendingRequest }) => {

  const { user } = useUser();
  const userInfo = user;
  
  const { setPage } = usePage();

  useEffect(()=>{
    setPage('View your pairs');
  }, []);
  
  const otherList = useRef(null);

  const [height,setHeight] = useState(0);

  

  useEffect(()=>{
    otherList.current.style.marginTop = height+"px";
  },[height]);

  useEffect(()=>{
    if (usersContacts.length==0){
      Swal.fire('You have no pairs yet. Try to find some pairs in \'Find pairs\'','','warning');
    }
  },[usersContacts.length]);
  

  return (
    <div style={{ padding: '20px', display: 'inline-block'}}>
        <div>
        <h4>Your pairs list:</h4>
        {usersContacts.length > 0?
        <UserListComponent 
          users={usersContacts} 
          userInfo={userInfo} 
          setUpdateNotifications={setUpdateNotifications} 
          pendingRequest={"nope"} 
          setHeight={setHeight}
        />:
        <>You have no pairs yet. Try to find some pairs in 'Find pairs'</>
        }
        </div>
      
      <div className='suggested-pairs' ref={otherList}>
        <h4>Pairs suggested for you:</h4>
        <UserListComponent users={suggestedUsers} userInfo={userInfo} setUpdateNotifications={setUpdateNotifications} pendingRequest={pendingRequest} />
      </div>
    </div>
  );
};

export default ViewPairs;
