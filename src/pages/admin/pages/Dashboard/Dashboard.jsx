import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard() {
 
    const [countNewUser, setCountNewUser] = useState();
    const [countNewBlog, setCountNewBlog] = useState();
    const [monthlyRevenue, setMonthlyRevenue] = useState();
    const [lastMonthlyRevenue, setLastMonthRevenue] = useState();
    const [improveRevenue, setImproveRevenue] = useState();
    const [chartDay, setChartDay] = useState([]);
    const [blogPostDay, setBlogPostDay] = useState([]);
    const [incomesDay, setIncomesDay] = useState([]);
    const [chartMonth, setChartMonth] = useState([]);
    const [blogPostMonth, setBlogPostMonth] = useState([]);
    const [incomesMonth, setIncomesMonth] = useState([]);

    const account = useSelector(state => state.account);
    var today = new Date();

    useEffect(() => {
        axios
        .get(`/api/auth/weekly-sign-up-count`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.weekSignUpCount;
            setCountNewUser(data);
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/blog/weekly-post-count`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.weekPostCount;
            setCountNewBlog(data);
        })
        .catch(err => console.log(err))

        var date = new Date();
        var currentMonth = date.getMonth();
        currentMonth+=1;
        axios
        .get(`/api/transaction/monthly-revenue?month=${currentMonth}`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.totalRevenue;
            setMonthlyRevenue(data);
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/transaction/monthly-revenue?month=${currentMonth-1}`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.totalRevenue;
            setLastMonthRevenue(data);
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/transaction/chart`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.totalRevenue;
            setChartDay(data.days);
            setBlogPostDay(data.postBlogs);
            setIncomesDay(data.incomes);
        })
        .catch(err => console.log(err))

        axios
        .get(`/api/transaction/chartMonth`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            const data = res.data.totalRevenue;
            setChartMonth(data.days);
            setBlogPostMonth(data.postBlogs);
            setIncomesMonth(data.incomes);
        })
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        var last = lastMonthlyRevenue;
        lastMonthlyRevenue===0?last=1:last=lastMonthlyRevenue;
        var improve = (monthlyRevenue - last)/last;
        setImproveRevenue(improve.toFixed(1));
    },[lastMonthlyRevenue, monthlyRevenue])

    const chartDayData = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: "Số blog và doanh thu trong tháng  " + (today.getMonth() + 1),
            align: 'center'
        },
        subtitle: {
            text: 'Source: ' +
                'HOLA RENT',
            align: 'left'
        },
        xAxis: [{
            categories: chartDay,
            crosshair: true
        }],
        yAxis: [{

            title: {
                text: 'Doanh thu (VNĐ)'
            }
        }, {
            title: {
                text: 'Blogs'
            },
            opposite: true
        }],
        legend: {
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 60,
            floating: true,
            backgroundColor: 'rgba(255,255,255,0.25)'
        },
        tooltip: {
            shared: true
        },

        series: [{
            name: 'Blog',
            type: 'column',
            yAxis: 1,
            data: blogPostDay,
            tooltip: {
                valueSuffix: ' blogs'
            }

        }, {
            name: 'Doanh thu',
            type: 'spline',
            data: incomesDay,
            tooltip: {
                valueSuffix: 'VNĐ'
            }
        }]
    }

    const chartMonthData = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: "Doanh thu và Blogs trong các tháng trong năm " + (today.getFullYear() ),
            align: 'center'
        },
        subtitle: {
            text: 'Source: ' +
                'HOLA RENT',
            align: 'left'
        },
        xAxis: [{
            categories: chartMonth,
            crosshair: true
        }],
        yAxis: [{

            title: {
                text: 'Doanh thu (VNĐ)'
            }
        }, {
            title: {
                text: 'Blogs'
            },
            opposite: true
        }],
        legend: {
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 60,
            floating: true,
            backgroundColor: 'rgba(255,255,255,0.25)'
        },
        tooltip: {
            shared: true
        },

        series: [{
            name: 'BlogPost',
            type: 'column',
            yAxis: 1,
            data: blogPostMonth,
            tooltip: {
                valueSuffix: ' Blogs'
            }

        }, {
            name: 'Doanh thu',
            type: 'spline',
            data: incomesMonth,
            tooltip: {
                valueSuffix: 'VNĐ'
            }
        }]
    }

    const handleExportExcelChartDay =( ) => {
        const newChartIncomes = ['Doanh thu']
        const newChartBlogs = ['Số Blogs']
        const newChartDays = ['']  
        var totalBlog =0;
        var totalIncomes = 0;

        for(var day of chartDay){
            newChartDays.push(day);
        }

        for(var income of incomesDay){
            newChartIncomes.push(income);
            totalIncomes+=income;
        }

        for(var blog of blogPostDay){
            newChartBlogs.push(blog);
            totalBlog+=blog;
        }
        newChartDays.push('Tổng')
        newChartBlogs.push(totalBlog);
        newChartIncomes.push(totalIncomes);

        const data = [
            newChartDays,
            newChartBlogs,
            newChartIncomes
        ]

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `StatisticPerDayOfMonth${today.getMonth() + 1}.xlsx`);
    }

    const handleExportExcelChartMonth =( ) => {
        const newChartIncomes = ['Doanh thu']
        const newChartBlogs = ['Số Blogs']
        const newChartDays = ['']  
        var totalBlog =0;
        var totalIncomes = 0;

        for(var day of chartMonth){
            newChartDays.push(day);
        }

        for(var income of incomesMonth){
            newChartIncomes.push(income);
            totalIncomes+=income;
        }

        for(var blog of blogPostMonth){
            newChartBlogs.push(blog);
            totalBlog+=blog;
        }
        newChartDays.push('Tổng')
        newChartBlogs.push(totalBlog);
        newChartIncomes.push(totalIncomes);

        const data = [
            newChartDays,
            newChartBlogs,
            newChartIncomes
        ]

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `StatisticPerMonthOfYear${today.getFullYear()}.xlsx`);
    }

  return (
    <div className="dasdboard">
      <SidebarAdmin className="sidebarDas" />
      {/* <h1 style={{ textAlign: "center" }}>Thống kê</h1> */}
      <main>
        <h1>Thống kê</h1>

                <div className="analyse">
                    <div className="sales">
                        <div className="status">
                            <div className="info">
                                <h3>Tổng doanh thu</h3>
                                <h1>{monthlyRevenue?.toLocaleString("vi", {
                                    style: "currency",
                                    currency: "VND",
                                    })}</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={38} cy={38} r={36}></circle>
                                </svg>
                                <div className="percentage">
                                    <p>+{improveRevenue}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="visits">
                        <div className="status">
                            <div className="info">
                                <h3>Số blog trong tuần</h3>
                                <h1>{countNewBlog} Blogs</h1>
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
                                <h3>Số User mới trong tuần</h3>
                                <h1>{countNewUser} Users</h1>
                            </div>
                            <div className="progress">
                                <svg>
                                    <circle cx={38} cy={38} r={36}></circle>
                                </svg>
                                <div className="percentage">
                                    <p><PersonAddIcon className='personAddIcon'/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="new-users">
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
                </div> */}
                <div className="chartDiv">
                    <div className="chartDay">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartDayData}
                        />
                        <button className="buttonExport" onClick={() => handleExportExcelChartDay()}><FileDownloadIcon className="iconBtn" /> Export</button> 
                    </div>
                    <div className="chartMonth">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartMonthData}
                        />
                        <button className="buttonExport" onClick={() => handleExportExcelChartMonth()}><FileDownloadIcon className="iconBtn" /> Export</button> 
                    </div>
                </div>

                {/* <div className="recent-orders">
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