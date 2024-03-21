import { useState } from "react";
import "./InboxCard.scss";

function InboxCard({ room, setCurrentUser }) {
  const handleSetCurrentUsername = () => {
    setCurrentUser(room.users[0]);
  };
  return (
    <div
      // style={{
      //   background: active === room.users[0]?.fullName ? "red" : "",
      // }}
      className="inboxCard"
      onClick={() => handleSetCurrentUsername()}
    >
      <div className="leftInboxCard">
        <img src={`http://${room.users[0]?.avatar}`} alt="" />
      </div>
      <div className="rightInboxCard">
        <h4>{room.users[0]?.fullName}</h4>
        <p>
          <i>role: {room.users[0]?.role}</i>
        </p>
      </div>
    </div>
  );
}
export default InboxCard;
