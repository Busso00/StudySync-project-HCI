import React,{useState, useEffect} from 'react';
import FilterBarComponent from './FilterBarComponent.jsx';
import UserListComponent from './UsersListComponent';
import { Container } from 'react-bootstrap';
import { useUser } from '../UserContext.jsx';
import { usePage } from '../PageContext.jsx';

const FindPairsPage = ({activeFilter, setActiveFilter, suggestedUsers, setUpdateNotifications, pendingRequest}) => {
  const { user } = useUser();
  
  const [height, setHeight] = useState(0);
  const [searchOpen, setSearchOpen] = useState(true);
  const [showedUsers, setShowedUsers] = useState([]);

  const { setPage } = usePage();

  useEffect(()=>{
    setPage('Find new pairs');
  }, []);
  

  useEffect(() => {
    applyFilter(suggestedUsers, activeFilter);
  },[activeFilter, suggestedUsers]);

  function applyFilter(suggestedUsers, activeFilter){

    const filteredUsers = [...suggestedUsers].filter(userSelf => { //match active search filter
      
      if (userSelf.id === user.id){
        return false;
      }
      for (const [key, value] of Object.entries(activeFilter)){
        if (value.length === 0){
          continue;
        }
        let match = false;
        for (let el of (userSelf[''+key].split(','))){
          if (value.includes(el.trim())){
            match = true;
          }
        }
        if(!match){
          return false;
        }
      }
      return true;
    }
    );

    setShowedUsers(filteredUsers);

  }

  return (
    <Container fluid style={{padding:"0px"}}>

      <FilterBarComponent 
      height={height} 
      setHeight={setHeight} 
      searchOpen={searchOpen} 
      setSearchOpen={setSearchOpen} 
      activeFilter={activeFilter} 
      setActiveFilter={setActiveFilter}
      users={suggestedUsers}
      />

      <div style={{display:"inline-flex", width:"100%", transform:searchOpen?"translateY(0px)":"translateY(-"+height+"px)", transition: "transform 0.3s ease-out"}}>
        {showedUsers.length > 0 ?
        <UserListComponent 
        users={showedUsers} 
        setUpdateNotifications={setUpdateNotifications}
        pendingRequest={pendingRequest}/>:
        <div style={{padding:"30px"}}>There are no user matching your filters. Try to set less restrictive filters.</div>
        }
      </div>

    </Container>
  );
};

export default FindPairsPage;
