import React, { useEffect, useState } from "react";
import './Profile.scss'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";

export default function Profile() {
  const [userDetail, setUserDetail] = useState()
  const account = useSelector(state => state.account);
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [failPhoneNumber, setFailPhoneNumber] = useState(false)
  const navigate = useNavigate();

  const handleSaveChanges = () => {

    const profile = {
      email: email,
      fullName: fullName,
      phone: phone,
      address: address,
    }

    axios
      .post('api/auth/editProfile', profile, {
        headers: {
          Authorization: `Bearer ${account?.token}`
        }
      })
      .then(res => {
        if (res.data.statusCode === 500) {
          setFailPhoneNumber(!failPhoneNumber)
        }
        else {
          navigate('/')
        }
      })
      .catch(err => console.log(err))

  }

  const handleEdit = () => {
    if (!isEditing) {

    }
    setIsEditing(!isEditing);
  }
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
      <div className='rightDetailProfile'>
        <div className="card">
          <h2>About {userDetail?.fullName}</h2>
          <span className="editBtn" onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </span>
          <div className='detailInfo'>
            {isEditing ? (
              <>
                <b>Full Name: </b> <input className='inputName' type="text" defaultValue={userDetail?.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <br />
                <b>Phone: </b> <input className='inputName' defaultValue={userDetail?.phone} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br />
                <b>Address: </b> <input className='inputName' defaultValue={userDetail?.address} type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <br />
                <b>Email: </b> <input className='inputName' defaultValue={userDetail?.email} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                {failPhoneNumber ? (
                  <>
                    <div className="error"> Phone Number already exists!!! </div>
                  </>
                ) : (
                  <></>
                )}
                <button className="editBtn" onClick={() => handleSaveChanges()}>Save Changes</button>
              </>

            ) : (
              <>
                <i><b>Full Name: </b>{userDetail?.fullName}</i><br />
                <i><b>Gender: </b>{userDetail?.gender ? 'male' : 'female'}</i><br />
                <i><b>Phone number: </b>{userDetail?.phone}</i><br />
                <i><b>Address: </b>{userDetail?.address}</i><br />
                <i><b>Email: </b>{userDetail?.email}</i><br />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



