import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import API from '../API';
import { useSocket } from '../SocketContext';
import { RiCheckDoubleFill } from "react-icons/ri";
import './ChatBox.css'; // 引入样式文件
import { usePage } from '../PageContext';


function groupMessagesByDate(messages) {
    const groups = {};
    messages.forEach(message => {
        const date = message.timestamp.split(' ')[0]; // 假设消息对象中有一个 'date' 字段
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
    });
    return Object.entries(groups).map(([date, messages]) => ({ date, messages }));
}

function ChatBox(props) {

    
    //const userInfo = props.userInfo;
    //const userId = props.userInfo.id;

    const additionalPadding = props.additionalPadding;

    const setUpdateMessages = props.setUpdateMessages;

    const [usersContacts, setUsersContacts] = useState([]);


    const { uid1, uid2 } = useParams();

    const { socket } = useSocket();

    // 使用 userId 和 chatId 进行逻辑处理

    const chatBoxRef = useRef(null);
    //对聊天框进行自动滚动功能的添加

    const { setPage } = usePage();

    const [message, setMessage] = useState('');

    const textboxRef = useRef(null);

    useEffect(() => {
        // Focus on the textbox when the component mounts
        textboxRef.current.focus();

        // Set cursor position
        const cursorPosition = 5; // Example cursor position
        textboxRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }, []);

    
    
    const messages = props.messages.filter(mex=>{
        //console.log(uid1); //don't remove: elsewhere compiler doesn't see them
        //console.log(uid2); //don't remove: elsewhere compiler doesn't see them
        return ((uid1 == mex.uid1 && uid2 == mex.uid2) || (uid1 == mex.uid2 && uid2 == mex.uid1));
    });

    const groupedMessages = groupMessagesByDate(messages);

    const navigate = useNavigate();

    useEffect(() => {

        if (uid1) {
            API.getUsersData()
                .then(usersData => {

                    API.getContactsData(uid1).then(contactsData => {

                        const contacts = contactsData.map(contact => {
                            if (contact.uid1 != uid1)
                                return contact.uid1 - 1;
                            else
                                return contact.uid2 - 1;
                        });
                        setUsersContacts(contacts.map((index) => usersData[index]));
                        
                        setPage("Chat with "+ usersData[uid2-1].name);
                        
                    }).catch(error => {
                        console.error("Error fetching contacts:", error);
                    });

                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
        }
    }, [uid1, uid2]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            //获取当前时间并进行格式化
            //current date authomatically set by API
            const data = {

                uid2: uid2,
                type: 0,
                text: message
            };
            API.sendMessageOrNotification(uid1, data).then(result => {
                setUpdateMessages();
                socket.emit('message', 'Update notifications');
                setMessage('');
                // 在这里可以添加发送消息到后端的逻辑
            })
                .catch(error => {
                    console.error("Error sending notification:", error);
                });




        }
    };

    const handleQuitClick = () => {
        navigate('/Viewyourpairs'); // 替换 '/some-path' 为您想要跳转到的路径
    };

    const changechat = (newUid) => {
        navigate('/chat/' + uid1 + '/' + newUid);
    }

    
    useEffect(() => {

        //滚动到 chatBox 底部
        const element = chatBoxRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
            
        }
    }, [groupedMessages]); //依赖于 groupedMessages 的变化


    return (
        <div>
            <div className="sidebar-contacts" style={{height:`${window.innerHeight-additionalPadding}px`}}>
                {
                    usersContacts.map(c => 
                        <button className={"btn btn-light contact-box "+(c.id==uid2?" selected":"")} key={c.id} onClick={() => changechat(c.id)}>
                            {c.name}
                        </button>
                    )
                }

                <button className="quit-box btn btn-danger" onClick={handleQuitClick}>
                    quit the chat
                </button>
            </div>

           
            <div className="chat-box" style={{top:`${additionalPadding}px`}} ref={chatBoxRef}>
                {groupedMessages.map(group => (
                    <div key={group.date}>
                        <div className="message-date">{group.date}</div>
                        {group.messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.uid1==uid1?"me":"other"}`}>
                                <div className="message-text">{msg.text}</div>
                                <div className='message-time'>{msg.timestamp.split(' ')[1]}</div>
                                <span>{msg.type==3?<RiCheckDoubleFill/>:<></>}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <textarea
                    ref={textboxRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && !e.shiftKey && sendMessage()
                    }}
                    style={{ margin: "5px 15px", borderRadius: "20px" }}
                />
                <button className='btn btn-primary' onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}

export default ChatBox;