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
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../../../../actions/accountActions';

function SidebarAdmin(){
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
            const action = logoutAccount();
            dispatch(action);
            navigate('/');
        
    }

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
                    <a className={pathname?.includes('dashboard')?'active':''} onClick={() => navigate('/admin/dashboard')}>
                        <span className="material-icons-sharp">
                            <DashboardIcon/>
                        </span>
                        <h3>Dashboard</h3>
                    </a>

                    <a >
                        <span className="material-icons-sharp">
                            <PersonIcon/>
                        </span>
                        <h3>Users</h3>
                    </a>
                    <a >
                        <span className="material-icons-sharp">
                            <ReceiptLongIcon/>
                        </span>
                        <h3>History</h3>
                    </a>
                    <a >
                        <span className="material-icons-sharp">
                            <InsightsIcon/>
                        </span>
                        <h3>Analytics</h3>
                    </a>
                    <a >
                        <span className="material-icons-sharp">
                            <MailOutlineIcon/>
                        </span>
                        <h3>Tickets</h3>
                        <span className="message-count">
                            27
                        </span>
                    </a>
                    <a onClick={() => navigate('/admin/blogManager')} className={pathname?.includes('blogManager')?'active':''}>
                        <span className="material-icons-sharp">
                            <InventoryIcon/>
                        </span>
                        <h3>Blogs List</h3>
                    </a>
                    <a >
                        <span className="material-icons-sharp">
                            <ReportGmailerrorredIcon/>
                        </span>
                        <h3>Reports</h3>
                    </a>
                    
                    <a onClick={() => navigate("/lessor/uploadBlog")}>
                        <span className="material-icons-sharp">
                            <AddIcon/>
                        </span>
                        <h3>Upload Blog</h3>
                    </a>
                    <a onClick={() => handleLogout()}>
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