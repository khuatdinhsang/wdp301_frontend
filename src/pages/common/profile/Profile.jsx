import React, { useEffect, useState } from "react";
import './Profile.scss'
import axios from "axios";
import { useSelector } from 'react-redux';


export default function Profile() {
  const [userDetail, setUserDetail] = useState()
  const account = useSelector(state => state.account);
  useEffect(() => {
    if (!userDetail) {
      axios
        .get(`api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${account?.token}`
          }
        })
        .then(res => {
          const userData = res.data.data
          setUserDetail(userData)
        })
        .catch(error => {
          console.error(error)
        });
    }
  }, [userDetail, account])
  console.log(userDetail);
  return (
    <div className="bottomDetailLessor">
      <div className="leftDetailProfile">
        <div className="card">
          <img className='image' src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" alt="Avatar" />
          <div className="container">
            <h4><b>{userDetail?.fullName}</b></h4>
            <p>{userDetail?.role}</p>
          </div>
        </div>
      </div>
      <div className='blank'></div>
      <div className='rightDetailProfile'>
        <h2>About {userDetail?.fullName}</h2>
        <div className='blank'></div>
        <span className="editBtn">
          Edit Profile
        </span>
        <div className='blank'></div>
        <div className='detailInfo'>
          <i><b>Tên tài khoản: </b>{userDetail?.phone}</i><br></br>
          <i><b>Gender: </b>male</i><br></br>
          <i><b>Gmail: </b>abcd@gmail.com</i><br></br>
          <i><b>Phone number: </b>{userDetail?.phone}</i><br></br>
        </div>
      </div>
    </div>
  );
}
