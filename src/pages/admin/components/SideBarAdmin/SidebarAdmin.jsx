import './SidebarAdmin.scss'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InsightsIcon from '@mui/icons-material/Insights';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';

function SidebarAdmin(){
    const navigate = useNavigate();

    return (
        <div className="containerSideBar">
            <aside>
                <div className="toggle">
                    <div className="logo" onClick={() => navigate('/')}>
                        <img src="https://res.cloudinary.com/dggciohw8/image/upload/v1705070813/417012680_904990781626845_39715534048793428_n_zj9jly.png" className='imgLogoDashboard' alt="" />
                        <h2>HOLA<span className='danger'>Rent</span></h2>
                    </div>
                    <div className="close" id='close-btn'>
                        <span className="material-icons-sharp">
                            <CloseIcon/>
                        </span>
                    </div>
                </div>
                <div className="sidebar">
                    <a href="">
                        <span className="material-icons-sharp">
                            <DashboardIcon/>
                        </span>
                        <h3>Dashboard</h3>
                    </a>

                    <a href="">
                        <span className="material-icons-sharp">
                            <PersonIcon/>
                        </span>
                        <h3>Users</h3>
                    </a>
                    <a href="" >
                        <span className="material-icons-sharp">
                            <ReceiptLongIcon/>
                        </span>
                        <h3>History</h3>
                    </a>
                    <a href="" className='active'>
                        <span className="material-icons-sharp">
                            <InsightsIcon/>
                        </span>
                        <h3>Analytics</h3>
                    </a>
                    <a href="" >
                        <span className="material-icons-sharp">
                            <MailOutlineIcon/>
                        </span>
                        <h3>Tickets</h3>
                        <span className="message-count">
                            27
                        </span>
                    </a>
                    <a href="" >
                        <span className="material-icons-sharp">
                            <InventoryIcon/>
                        </span>
                        <h3>Sale List</h3>
                    </a>
                    <a href="" >
                        <span className="material-icons-sharp">
                            <ReportGmailerrorredIcon/>
                        </span>
                        <h3>Reports</h3>
                    </a>
                    
                    <a href="" >
                        <span className="material-icons-sharp">
                            <AddIcon/>
                        </span>
                        <h3>New Login</h3>
                    </a>
                    <a href="" >
                        <span className="material-icons-sharp">
                            <LogoutIcon/>
                        </span>
                        <h3>Logout</h3>
                    </a>
                </div>

            </aside>
        </div>
    )
}

export default SidebarAdmin