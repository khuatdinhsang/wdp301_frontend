import { useState } from 'react';
import HeaderNoSearch from '../../../components/component/HeaderNoSearch/HeaderNoSearch'
import InboxCard from '../../../components/component/InboxCard/InboxCard'
import './ChatWithLessor.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function ChatWithLessor(){

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
        setMessages([...messages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');
        }
    };

    return (
        <div className="chatWithLessor">
            <HeaderNoSearch/>
            <div className="chatContent">
                <div className="leftChat">
                    <div className="topLeftChat">
                        <h3>Tin nhắn</h3>
                    </div>
                    <div className="bottomLeftChat">
                        <InboxCard/>
                        <InboxCard/>
                        <InboxCard/>
                        <InboxCard/>
                    </div>
                </div>

                <div className="rightChat">
                    <div className="topRightChat">
                        <h3 className='lessorNameChat'>Satish</h3>
                        <i>Thời gian phản hồi: 1 giờ</i>
                    </div>
                    <div className="bottomRightChat">
                        <div className="chatBox">
                            <div className="chatMessages">
                                {messages.map((message, index) => (
                                <div key={index} className={`message ${message.sender}`}>
                                    {message.text}
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="inputContainer">
                            <div className='divSendMessage'>
                                <input 
                                    type="text"
                                    placeholder='Nhập tin nhắn'
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    className='inputMessage'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); 
                                          handleSendMessage();
                                        }
                                      }}
                                />
                                <button className='uploadMessage' style={{opacity: newMessage === "" ? 0 : 1}} onClick={() => handleSendMessage()}><span><ArrowUpwardIcon/></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWithLessor