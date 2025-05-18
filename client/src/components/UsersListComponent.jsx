import React, {useRef, useState, useEffect} from 'react';
import UserCardComponent from './UserCardComponent';
import { useUser } from '../UserContext.jsx';

function UserListComponent(props){

    const { user } = useUser();
    const userInfo = user;
    const setUpdateNotifications = props.setUpdateNotifications;

    const users = props.users;
    const isMentors = props.isMentors || false;
    
    const pendingRequest = props.pendingRequest || false;

    const scrollContainer = useRef(null);

    const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true);
    const [isRightButtonDisabled, setRightButtonDisabled] = useState(users.length <= 3);

    let prevLen = 0;

    const pairList = useRef(null);

    useEffect(() => {
      if (props.setHeight){
        props.setHeight(pairList.current.clientHeight+50);
      }
    }, [pairList]);

    useEffect(() => {
        // Measure the height of the fixed navbar and update the state to make all content of the page start with padding= navbar height
        if (prevLen != users.length && scrollContainer.current.firstChild) {
            const cardWidth = scrollContainer.current.firstChild.getBoundingClientRect().width;
            const currentScrollPosition = scrollContainer.current.scrollLeft;

            setLeftButtonDisabled(users.length <= 3 || (scrollContainer.current && currentScrollPosition === 0));
            setRightButtonDisabled(users.length <= 3 || (scrollContainer.current && currentScrollPosition >= scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - cardWidth));

        }
        prevLen = users.length;

    }, [users]); // Run this effect once when the component mounts


    const handleScroll = (direction) => {
      if (scrollContainer.current && scrollContainer.current.firstChild) {
        const cardWidth = scrollContainer.current.firstChild.getBoundingClientRect().width;
        const currentScrollPosition = scrollContainer.current.scrollLeft;
        const cardMargin = parseFloat(getComputedStyle(scrollContainer.current.firstChild).marginRight);
        const cardBorder = parseFloat(getComputedStyle(scrollContainer.current.firstChild).borderRightWidth)*2;
        const newScrollPosition = direction === 'left'
        ? Math.max(currentScrollPosition - cardWidth - 2*cardMargin - 2*cardBorder, 0)
        : Math.min(currentScrollPosition + cardWidth + 2*cardMargin + 2*cardBorder , scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth);
        scrollContainer.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });

        setLeftButtonDisabled(users.length <= 3 || (scrollContainer.current && newScrollPosition === 0));
        setRightButtonDisabled(users.length <= 3 || (scrollContainer.current && newScrollPosition >= scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - cardWidth));
      }
    };
  
    return (<><p style={{paddingLeft:"20px"}}>{"People found: "+users.filter(u=>u.id!=userInfo.id).length}</p> <br/>
        <div className="user-list-container" ref={pairList}>
        
        <button 
          className="scroll-arrow left" 
          onClick={() => handleScroll('left')}
          disabled={isLeftButtonDisabled}>
          &#9664;
        </button>
        <div className="user-cards-container" ref={scrollContainer}>
          {users.filter(u=>u.id!=userInfo.id).map(user => (
            <UserCardComponent key={user.id} 
            userInfo={userInfo}
            isMentors={isMentors}
            otherUserInfo={user} 
            setUpdateNotifications={setUpdateNotifications}
            pendingRequest={pendingRequest}
            />
          ))}
        </div>
        <button 
          className="scroll-arrow right" 
          onClick={() => handleScroll('right')}
          disabled={isRightButtonDisabled}>
          &#9654;
        </button>
      </div>
    </>);
};

export default UserListComponent;
