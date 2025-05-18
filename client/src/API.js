import dayjs from 'dayjs';
const SERVER_URL = 'https://studysync-project.onrender.com:443';

const getUserData = async (id) => {
    try {
        const response = await fetch(SERVER_URL + `/api/users/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
    }
};

const getUsersData = async () => {
    try {
        const response = await fetch(SERVER_URL + `/api/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const usersData = await response.json();
        return usersData;
    } catch (error) {
        console.log(error);
    }
};

const editUserData = async (id, data) => {
    try {
        const response = await fetch(SERVER_URL + `/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};

const getContactsData = async (id) => {
    try {
       
        const response = await fetch(SERVER_URL + `/api/relationships/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (id, data) => {
    try {
        const response = await fetch(SERVER_URL + `/api/relationships/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async (id, data) => {
    try {
        const response = await fetch(SERVER_URL + `/api/relationships/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};

const getMessagesAndNotifictions = async (id) => {
    try {
        const response = await fetch(SERVER_URL + `/api/messages/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
    }
};

const deleteMessageOrNotification = async (id, timestamp) => {
    try {
        const response = await fetch(SERVER_URL + `/api/messages/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ timestamp }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
}

const sendMessageOrNotification = async (id, data) => {
    try {
        const timestampData = {
            timestamp: dayjs().format('YYYY-MM-DD hh:mm:ss'),
            data
        };
        const response = await fetch(SERVER_URL + `/api/messages/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timestampData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
}


const sendMessageOrNotificationTimestamp = async (id, timestamp, data) => {
    try {
        const timestampData = {
            timestamp: timestamp,
            data
        };
        const response = await fetch(SERVER_URL + `/api/messages/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timestampData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
}

const getRelationship = async (srcUserId, targetUserId) => {
  try {
      const response = await fetch(SERVER_URL + `/api/relationships/${srcUserId}/${targetUserId}`);
      if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const relationship = await response.json();
      return relationship;
  } catch (error) {
      console.log(error);
  }
};

const getTimetable = async (uid) => {
    try {
        const response = await fetch(SERVER_URL + `/api/timetable/${uid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const timetable = await response.json();
        const timeVec = JSON.parse(timetable.timeslot).timetable;
        
        return timeVec;

    } catch (error) {
        console.log(error);
    }
};

const editTimetable = async (uid, data) => {
    try {
        const response = await fetch(SERVER_URL + `/api/timetable/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({timetable:[...data]}),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};



const getMentorsData = async () => {
    try {
        const response = await fetch(SERVER_URL + `/api/mentors`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const usersData = await response.json();
        console.log('mentors: ', usersData);
        return usersData;
    } catch (error) {
        console.log(error);
    }
};

const addMentor = async (id, data) => {
    try {
        console.log('adding mentor and courses:');
        console.log(data); //correct
        const response = await fetch(SERVER_URL + `/api/mentors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};


const modifyMentorData = async (id, data) => {
    try {
        console.log('adding mentor and courses:');
        console.log(data); //correct
        const response = await fetch(SERVER_URL + `/api/mentors/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updateResponse = await response.json();
        return updateResponse;
    } catch (error) {
        console.log(error);
    }
};

export default { getUserData, getUsersData, editUserData, getContactsData, addContact, removeContact, getMessagesAndNotifictions, deleteMessageOrNotification, sendMessageOrNotification, sendMessageOrNotificationTimestamp, getRelationship, getTimetable, editTimetable, getMentorsData, addMentor, modifyMentorData };
