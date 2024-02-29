import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import './UsersManagerAdmin.scss'
import SidebarAdmin from '../../components/SideBarAdmin/SidebarAdmin'
import { useParams } from 'react-router'

function UsersManagerAdmin() {
  const { slug } = useParams();
  const account = useSelector(state => state.account);
  const [renters, setRenters] = useState([])
  const [lessors, setLessors] = useState([])
  const [userType, setUserType] = useState('renter')

  useEffect(() => {
    axios
      .get(`/api/auth/getAllLessors/${slug}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`
        }
      })
      .then(res => {
        console.log(res.data);
        const data = res.data;
        setLessors(data);
      })
      .catch(err => console.log(err))
  }, [account?.token, slug])

  useEffect(() => {
    axios
      .get(`/api/auth/getAllRenter/${slug}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`
        }
      })
      .then(res => {
        console.log(res.data);
        const data = res.data;
        setRenters(data);
      })
      .catch(err => console.log(err))
  }, [account?.token, slug])



  const showRenters = () => {
    setUserType('renter');
  }

  const showLessors = () => {
    setUserType('lessor');
  }

  return (
    <div className="userManagement">
      <SidebarAdmin className="sidebarLessorManagement" />
      <main>
        <div className="userManagementContent1">
          <h3>Users Manager</h3>
          <div className="userTypeButtons">
            <button onClick={showRenters}>Renters</button>
            <button onClick={showLessors}>Lessors</button>
          </div>
          <div className='listUserManagerAdmin'>
            <div className="recent-orders">
              <table>
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {userType === 'renter' && renters?.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.fullName}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.email}</td>
                      <td>{user?.address}</td>
                    </tr>
                  ))}
                  {userType === 'lessor' && lessors?.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.fullName}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.email}</td>
                      <td>{user?.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}

export default UsersManagerAdmin