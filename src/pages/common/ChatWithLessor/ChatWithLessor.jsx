import HeaderNoSearch from '../../../components/component/HeaderNoSearch/HeaderNoSearch'
import InboxCard from '../../../components/component/InboxCard/InboxCard'
import './ChatWithLessor.scss'

function ChatWithLessor(){
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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatWithLessor