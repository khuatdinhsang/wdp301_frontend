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

function Dashboard() {
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

  return (
    <div className="dasdboard">
      <SidebarAdmin className="sidebarDas" />
      <h1 style={{ textAlign: "center" }}>Thống kê</h1>
      <main>
        {/* <h1>Analytics</h1>

                <div className="analyse">
                    <div className="sales">
                        <div className="status">
                            <div className="info">
                                <h3>Total Salse</h3>
                                <h1>$65,000</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={38} cy={38} r={36}></circle>
                                </svg>
                                <div className="percentage">
                                    <p>+81%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="visits">
                        <div className="status">
                            <div className="info">
                                <h3>Site Visit</h3>
                                <h1>24,981</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={38} cy={38} r={36}></circle>
                                </svg>
                                <div className="percentage">
                                    <p>-48%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="searches">
                        <div className="status">
                            <div className="info">
                                <h3>Searches</h3>
                                <h1>14,147</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={38} cy={38} r={36}></circle>
                                </svg>
                                <div className="percentage">
                                    <p>+21%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="new-users">
                    <h2>New Users</h2>
                    <div className="user-list">
                        <div className="user">
                            <img src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png" alt="" />
                            <h2>G-Dragon</h2>
                            <p>30 Minutes Ago</p>
                        </div>
                        <div className="user">
                            <img src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png" alt="" />
                            <h2>VuongNguyen</h2>
                            <p>30 Minutes Ago</p>
                        </div>
                        <div className="user">
                            <img src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png" alt="" />
                            <h2>G-Dragon</h2>
                            <p>30 Minutes Ago</p>
                        </div>
                        <div className="user">
                            <img src="https://media.istockphoto.com/id/688550958/vi/vec-to/d%E1%BA%A5u-c%E1%BB%99ng-m%C3%A0u-%C4%91en-k%C3%BD-hi%E1%BB%87u-t%C3%ADch-c%E1%BB%B1c.jpg?s=612x612&w=0&k=20&c=ZJYNJ7-s-CEFxNFaj6y4aYQmLlFe9wETgoAX5xj_wWk=" alt="" />
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
                                    <td className={`${order.status === "Declined" ? 'danger' : order.status === "Pending" ? 'warning' : 'primary'} `}>{order?.status}</td>
                                    <td className="primary">Details</td>
                                </tr>
                               )
                            })}
                        </tbody>
                        <a href="">Show All</a>
                    </table>
                </div> */}
      </main>

      {/* <div className="right-section">
                <div className="navDash">
                    <button id="menu-btn">
                        <span className="material-icons-sharp">
                            <MenuIcon/>
                        </span>
                    </button>
                    <div className="dark-mode">
                        <button id="menu-btn">
                            <span className="material-icons-sharp active">
                                <LightModeIcon/>
                            </span>
                        </button>
                        <button id="menu-btn">
                            <span className="material-icons-sharp active">
                                <DarkModeIcon/>
                            </span>
                        </button>
                    </div>
                    <div className="profile">
                        <div className="info">
                            <p>Hey, <b>Reza</b></p>
                            <small className="text-muted">
                                Admin
                            </small>
                        </div>
                        <div className="profile-photo">
                            <img src="https://cdn.tuoitre.vn/471584752817336320/2023/2/12/screenshot-2023-02-12-183759-16762018964521677047550.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="user-profile">
                    <div className="logoProfile">
                        <img src="https://res.cloudinary.com/dggciohw8/image/upload/v1705070813/417012680_904990781626845_39715534048793428_n_zj9jly.png" alt="" />
                        <h2>HolaRent</h2>
                        <p>Full Stack Developer</p>
                    </div>
                </div>
                <div className="reminders">
                    <div className="headerReminds">
                        <h2>Reminders</h2>
                        <span className="mateials-icons-sharp">
                            <NotificationsNoneIcon/>
                        </span>
                    </div>

                    <div className="notification">
                        <div className="iconNotify">
                            <span className="mateial-icons-sharp">
                                <VolumeUpIcon/>
                            </span>
                        </div>
                        <div className="contentNotify">
                            <div className="info">
                                <h3>Workshop</h3>
                                <small className="text-muted">
                                    8:00 AM - 12:00 PM 
                                </small>
                            </div>
                            <span className="material-icons-sharp">
                                <MoreVertIcon/>
                            </span>
                        </div>
                    </div>

                    <div className="notification deactive">
                        <div className="iconNotify">
                            <span className="mateial-icons-sharp">
                                <EditIcon/>
                            </span>
                        </div>
                        <div className="contentNotify">
                            <div className="info">
                                <h3>Workshop</h3>
                                <small className="text-muted">
                                    8:00 AM - 12:00 PM 
                                </small>
                            </div>
                            <span className="material-icons-sharp">
                                <MoreVertIcon/>
                            </span>
                        </div>
                    </div>

                    <div className="notification add-reminder">
                        <div >
                            <span className="material-icons-sharp">
                                <AddIcon/>
                            </span>
                            <h3>Add Reminder</h3>
                        </div>
                    </div>
                    
                </div>
            </div> */}
    </div>
  );
}

export default Dashboard;
