import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import SidebarAdmin from "../../components/SideBarAdmin/SidebarAdmin";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

function UsersManagerAdmin() {
  const { slug } = useParams();
  const account = useSelector((state) => state.account);
  const [renters, setRenters] = useState([]);
  const [lessors, setLessors] = useState([]);
  const [userType, setUserType] = useState("renter");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [isBlock, setIsBlock] = useState(false);
  useEffect(() => {
    fetchRenterData();
    fetchLessorData();
  }, [account, slug, searchTerm, currentPage, isBlock]);

  const calculateTotalPages = (totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const fetchRenterData = () => {
    axios
      .get(
        `/api/auth/getAllRenter?limit=${itemsPerPage}&page=${currentPage}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        }
      )
      .then((res) => {
        const updatedRenters = res.data.allRenter.map((user) => ({
          ...user,
          isBlocked: user.block?.isBlock || false,
        }));
        setRenters(updatedRenters);
        const totalPages = calculateTotalPages(res.data.totalRenter);
        setTotalPages(totalPages);
      })
      .catch((err) => console.log(err));
  };

  const fetchLessorData = () => {
    axios
      .get(
        `/api/auth/getAllLessors?limit=${itemsPerPage}&page=${currentPage}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${account.token}`,
          },
        }
      )
      .then((res) => {
        const updatedLessors = res.data.allLessor.map((user) => ({
          ...user,
          isBlocked: user.block?.isBlock || false,
        }));
        setLessors(updatedLessors);
        const totalPages = calculateTotalPages(res.data.totalLessor);
        setTotalPages(totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlockUser = (userId) => {
    setShowModal(true);
    setCurrentUserId(userId);
  };

  const toggleBlockUser = () => {
    axios
      .post(
        `/api/auth/${currentUserId}/toggleBlock`,
        { blockReason },
        {
          headers: {
            Authorization: `Bearer ${account.token}`,
          },
        }
      )
      .then((res) => {
        setShowModal(false);
        const updatedRenters = renters.map((user) => {
          if (user._id === currentUserId) {
            return { ...user, isBlocked: !user.isBlocked };
          }
          return user;
        });
        setRenters(updatedRenters);
        const updatedLessors = lessors.map((user) => {
          if (user._id === currentUserId) {
            return { ...user, isBlocked: !user.isBlocked };
          }
          return user;
        });
        setLessors(updatedLessors);
        setIsBlock(isBlock ? false : true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarAdmin className="sidebarLessorManagement" />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div className="userManagementContent1">
          <Typography variant="h3" gutterBottom>
            Users Manager
          </Typography>

          <div className="userTypeButtons">
            <Button
              variant={userType === "renter" ? "contained" : "outlined"}
              onClick={() => {
                setUserType("renter");
                setCurrentPage(1);
              }}
            >
              Renters
            </Button>
            <Button
              variant={userType === "lessor" ? "contained" : "outlined"}
              onClick={() => {
                setUserType("lessor");
                setCurrentPage(1);
              }}
            >
              Lessors
            </Button>
            <TextField
              className="search"
              variant="outlined"
              size="medium"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{ float: "right" }}
            />
          </div>

          <div className="listUserManagerAdmin">
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Full name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Lí do</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userType === "renter" &&
                      renters.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user?.fullName}</TableCell>
                          <TableCell>{user?.phone}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.address}</TableCell>
                          <TableCell>{user?.createdAt.split("T")[0]}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleBlockUser(user._id)}
                              variant={
                                user.isBlocked ? "contained" : "outlined"
                              }
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </Button>
                          </TableCell>
                          {user.block?.isBlock ? (
                            <TableCell style={{ color: "red" }}>{`${
                              user?.block?.content
                            }/ ${user?.block.day.split("T")[0]}`}</TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                        </TableRow>
                      ))}
                    {userType === "lessor" &&
                      lessors.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user?.fullName}</TableCell>
                          <TableCell>{user?.phone}</TableCell>
                          <TableCell>{user?.email}</TableCell>
                          <TableCell>{user?.address}</TableCell>
                          <TableCell>{user?.createdAt.split("T")[0]}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleBlockUser(user._id)}
                              variant={
                                user.isBlocked ? "contained" : "outlined"
                              }
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </Button>
                          </TableCell>
                          {user.block?.isBlock ? (
                            <TableCell style={{ color: "red" }}>{`${
                              user?.block?.content
                            }/ ${user?.block.day.split("T")[0]}`}</TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={totalPages * itemsPerPage}
                page={currentPage - 1}
                onPageChange={(event, page) => handlePageChange(page + 1)}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[]}
              />
            </Paper>
          </div>
        </div>
      </Box>

      {showModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Paper
            sx={{
              width: 300,
              padding: 2,
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Reason for blocking
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter reason"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              sx={{ marginBottom: 1 }}
            />
            <Button onClick={toggleBlockUser} variant="contained">
              Submit
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default UsersManagerAdmin;
