import { useNavigate } from 'react-router';
import './DetailWishList.scss'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CardWishListDetail from '../../../components/component/CardWishListDetail/CardWishListDetail';



function DetailWishList(){
    const navigate = useNavigate();
    
    return (
        <div className="detailWishList">
            <div className="leftDetailWishList">
                <span style={{cursor: "pointer"}} onClick={() => navigate('/wishlist')}><ArrowBackIosRoundedIcon className='backIconLogin' /></span>
                <div className="titleWishListDetail">
                    <h3>Cabin 2024</h3>
                </div>
                <div className="listCardDetail">
                    <CardWishListDetail/>
                    <CardWishListDetail/>
                    <CardWishListDetail/>
                    <CardWishListDetail/>
                </div>
            </div>
            <div className="rightDetailWishList">
                <iframe className='mapDetailWishList' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59592.02141507682!2d105.48416189938982!3d21.012617066548483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1705087795747!5m2!1svi!2s" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default DetailWishList