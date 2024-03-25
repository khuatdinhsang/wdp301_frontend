import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import "./InboxCard.scss";

function InboxCard({ room, setCurrentUser , currentUser}) {
  const handleSetCurrentUsername = () => {
    setCurrentUser(room.users[0]);
  };

  
  return (
    <div
      // style={{
      //   background: active === room.users[0]?.fullName ? "red" : "",
      // }}
      className={room.users[0]?._id === currentUser?._id ?'inboxCard activeInboxCard' : "inboxCard"}
      onClick={() => handleSetCurrentUsername()}
    >
      <div className="leftInboxCard">
        {room.users[0]?.avatar ?<img src={`http://${room.users[0]?.avatar}`} alt="" />: <AccountCircleIcon style={{ width: "40px", height: "40px" }} />  }
        
        
      </div>
      <div className="rightInboxCard">
        <h4>{room.users[0]?.fullName}</h4>
        <p>
          <i>{room.users[0]?.role === 'renter'?'Khách thuê phòng':""}</i>
          <i>{room.users[0]?.role === 'lessor'?'Chủ phòng':""}</i>
          <i>{room.users[0]?.role === 'admin'?'Admin':""}</i>
        </p>
      </div>
    </div>
  );
}
export default InboxCard;
