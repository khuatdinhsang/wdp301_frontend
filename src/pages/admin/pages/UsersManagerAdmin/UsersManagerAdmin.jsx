import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import './UsersManagerAdmin.scss';
import SidebarAdmin from '../../components/SideBarAdmin/SidebarAdmin';
import { useParams } from 'react-router';
import axios from 'axios';

function UsersManagerAdmin() {
  const { slug } = useParams();
  const account = useSelector(state => state.account);
  const [renters, setRenters] = useState([]);
  const [lessors, setLessors] = useState([]);
  const [userType, setUserType] = useState('renter');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [blockReason, setBlockReason] = useState('');

  useEffect(() => {
    fetchRenterData();
    fetchLessorData();
  }, [account, slug, searchTerm, currentPage]);

  const calculateTotalPages = (totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const fetchRenterData = () => {
    axios.get(`/api/auth/getAllRenter?limit=${itemsPerPage}&page=${currentPage}&search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${account?.token}`
      }
    })
      .then(res => {
        const updatedRenters = res.data.allRenter.map(user => ({
          ...user,
          isBlocked: user.block?.isBlock || false 
        }));
        setRenters(updatedRenters);
        const totalPages = calculateTotalPages(res.data.totalRenter);
        setTotalPages(totalPages);
      })
      .catch(err => console.log(err));
  };

  const fetchLessorData = () => {
    axios.get(`/api/auth/getAllLessors?limit=${itemsPerPage}&page=${currentPage}&search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${account.token}`
      }
    })
      .then(res => {
        const updatedLessors = res.data.allLessor.map(user => ({
          ...user,
          isBlocked: user.block?.isBlock || false 
        }));
        setLessors(updatedLessors);
        const totalPages = calculateTotalPages(res.data.totalLessor);
        setTotalPages(totalPages);
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlockUser = (userId) => {
    console.log("aa",userId);
    setShowModal(true);
    setCurrentUserId(userId); 
  };

  const toggleBlockUser = () => {
    axios.post(`/api/auth/${currentUserId}/toggleBlock`, { blockReason }, {
      headers: {
        Authorization: `Bearer ${account.token}`
      }
    })
      .then(res => {
        setShowModal(false); 
        const updatedRenters = renters.map(user => {
          if (user._id === currentUserId) {
            return { ...user, isBlocked: !user.isBlocked };
          }
          return user;
        });
        setRenters(updatedRenters);
        const updatedLessors = lessors.map(user => {
          if (user._id === currentUserId) {
            return { ...user, isBlocked: !user.isBlocked };
          }
          return user;
        });
        setLessors(updatedLessors);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="userManagement">
      <SidebarAdmin className="sidebarLessorManagement" />
      <main>
        <div className="userManagementContent1">
          <h3>Users Manager</h3>

          <div className="userTypeButtons">
            <button className={userType === 'renter' ? 'active' : ''} onClick={() => { setUserType('renter'); setCurrentPage(1); }}>Renters</button>
            <button className={userType === 'lessor' ? 'active' : ''} onClick={() => { setUserType('lessor'); setCurrentPage(1); }}>Lessors</button>
            <input className="search" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userType === 'renter' && renters.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.fullName}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.email}</td>
                      <td>{user?.address}</td>
                      <td>
                        <button onClick={() => handleBlockUser(user._id)}>
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {userType === 'lessor' && lessors.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.fullName}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.email}</td>
                      <td>{user?.address}</td>
                      <td>
                        <button onClick={() => handleBlockUser(user._id)}>
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              {totalPages > 1 && Array.from(Array(totalPages).keys()).map((number) => (
                <button
                  key={number + 1}
                  className={currentPage === number + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal for block reason */}
      {showModal && (
        <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Reason</h2>
            <input type="text" className="reason" placeholder="Reason" value={blockReason} onChange={(e) => setBlockReason(e.target.value)} />
            <button className="submit" onClick={toggleBlockUser}>Submit</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersManagerAdmin;
