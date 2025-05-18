import React,{useState, useEffect} from 'react';
import FilterBarComponent from './FilterBarComponent.jsx';
import UserListComponent from './UsersListComponent';
import { Container } from 'react-bootstrap';
import { useUser } from '../UserContext.jsx';
import { usePage } from '../PageContext.jsx';
import API from '../API.js';

const FindMentorsPage = ({activeFilter, setActiveFilter, setUpdateNotifications, pendingRequest}) => {
  const { user } = useUser();
  
  const [height, setHeight] = useState(0);
  const [searchOpen, setSearchOpen] = useState(true);
  const [showedUsers, setShowedUsers] = useState([]);
 
  const { setPage } = usePage();

  useEffect(()=>{
    setPage('Find new mentors');
    API.getMentorsData().then(result => {
        setShowedUsers(result);
    }).catch(error => {
        console.log(error);
    });
  }, []);

  return (
    <Container fluid style={{padding:"0px"}}>
      <div style={{display:"inline-flex", width:"100%", transform:searchOpen?"translateY(0px)":"translateY(-"+height+"px)", transition: "transform 0.3s ease-out"}}>
        {showedUsers.length > 0 ?
        <UserListComponent 
        users={showedUsers}
        isMentors={true}
        setUpdateNotifications={setUpdateNotifications}
        pendingRequest={pendingRequest}/>:
        <div style={{padding:"30px"}}>There are no user matching your filters. Try to set less restrictive filters.</div>
        }
      </div>

    </Container>
  );
};

export default FindMentorsPage;
