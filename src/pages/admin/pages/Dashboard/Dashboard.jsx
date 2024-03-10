import SidebarAdmin from "../../components/SideBarAdmin/SidebarAdmin";
import "./Dashboard.scss";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Dashboard() {
  const account = useSelector((state) => state.account);
  const Orders = [
    {
      productName: "JavaScript Tutorial",
      productNumber: "85743",
      paymentStatus: "Due",
      status: "Pending",
    },
    {
      productName: "CSS Full Course",
      productNumber: "97245",
      paymentStatus: "Refunded",
      status: "Declined",
    },
    {
      productName: "Flex-Box Tutorial",
      productNumber: "36452",
      paymentStatus: "Paid",
      status: "Active",
    },
  ];

  const [newUser, setNewUser] = useState(0);
  const [newBlog, setNewBlog] = useState(0);
  const getNewUser = () => {
    axios
      .get("/api/auth/weekly-sign-up-count", {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        setNewUser(res.data.weekSignUpCount);
      })
      .catch((err) => toast.warn("Có vấn đề xảy ra"));
  };
  const getNewBlog = () => {
    axios
      .get("/api/blog/weekly-post-count", {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        setNewBlog(res.data.weekPostCount);
      })
      .catch((err) => toast.warn("Có vấn đề xảy ra"));
  };
  useEffect(() => {
    getNewUser();
    getNewBlog();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="dasdboard">
      <SidebarAdmin className="sidebarDas" />
      <main>
        <h1 style={{ fontSize: "36px", textAlign: "center" }}>Thống kê</h1>
        <div className="analyse">
          <div className="sales" onClick={() => navigate("/admin/users")}>
            <div className="status">
              <div className="info">
                <h3>Số người đăng kí trong 1 tuần</h3>
              </div>
              <div className="progress">
                <div className="progress">
                  <h1 style={{ fontSize: "50px", textAlign: "center" }}>
                    {newUser}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="visits">
            <div
              className="status"
              onClick={() => navigate("/admin/blogManager")}
            >
              <div className="info">
                <h3>Số bài viết được đăng trong 1 tuần</h3>
              </div>
              <div className="progress">
                <h1 style={{ fontSize: "50px", textAlign: "center" }}>
                  {newBlog}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="new-users">
          <h2>New Users</h2>
          <div className="user-list">
            <div className="user">
              <img
                src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png"
                alt=""
              />
              <h2>G-Dragon</h2>
              <p>30 Minutes Ago</p>
            </div>
            <div className="user">
              <img
                src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png"
                alt=""
              />
              <h2>VuongNguyen</h2>
              <p>30 Minutes Ago</p>
            </div>
            <div className="user">
              <img
                src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png"
                alt=""
              />
              <h2>G-Dragon</h2>
              <p>30 Minutes Ago</p>
            </div>
            <div className="user">
              <img
                src="https://media.istockphoto.com/id/688550958/vi/vec-to/d%E1%BA%A5u-c%E1%BB%99ng-m%C3%A0u-%C4%91en-k%C3%BD-hi%E1%BB%87u-t%C3%ADch-c%E1%BB%B1c.jpg?s=612x612&w=0&k=20&c=ZJYNJ7-s-CEFxNFaj6y4aYQmLlFe9wETgoAX5xj_wWk="
                alt=""
              />
              <h2>More</h2>
              <p>New User</p>
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Number</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Orders?.map((order) => {
                return (
                  <tr>
                    <td>{order?.productName}</td>
                    <td>{order?.productNumber}</td>
                    <td>{order?.paymentStatus}</td>
                    <td
                      className={`${
                        order.status === "Declined"
                          ? "danger"
                          : order.status === "Pending"
                          ? "warning"
                          : "primary"
                      } `}
                    >
                      {order?.status}
                    </td>
                    <td className="primary">Details</td>
                  </tr>
                );
              })}
            </tbody>
            <a href="">Show All</a>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
