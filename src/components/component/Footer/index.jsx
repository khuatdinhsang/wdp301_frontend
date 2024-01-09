
import './style.scss'
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Footer(){
    return (
        <div className='footer'>
            <div className='leftFooter'>
                <span>© 2024 HomeHola,Inc.</span>
                <span>Quyền riêng tư</span>
                <span>Điều khoản</span>
                <span>Sơ đồ trang web</span>
            </div>
            <div className='rightFooter'>
                <div className='language'><LanguageIcon/><span className='vnLanguage'> Tiếng Việt(VN)</span></div>
                <div className='moneyVND'><AttachMoneyIcon/><span> VNĐ</span></div>
                <span>Hỗ trợ và tài nguyên</span>
            </div>
        </div>
    )
}

export default Footer