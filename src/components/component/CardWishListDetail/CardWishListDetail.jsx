import './CardWishListDetail.scss'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router';

function CardWishListDetail(){
    const navigate = useNavigate()
    return (
        <>
        <div className='cardWishListDetail' onClick={() => navigate("/detail")}>
            <div className='imageContainer'>
                <img alt='' src='https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/df0ef78a-3f63-4d16-a5ac-abff6b82f49b.jpeg?im_w=720'/>
            </div>
            <ArrowBackIosRoundedIcon className='backIcon'/>
            <ArrowForwardIosRoundedIcon className='nextIcon'/>
            <div className='infoCard'>
                <div className='titleRow'>
                    <h2 className='titleCard'>Vin Home</h2>
                    <div className='showStar'>
                        <StarIcon  className='starCard'/>
                        <span className='numberStarCard'> 5,0</span>
                    </div>
                </div>
                <span className='dateBuilding'>Được xây vào năm 2020</span>
                <p className='priceCard'><span className='pricePer'>$1098</span> / đêm</p>
            </div>
            <FavoriteTwoToneIcon className='heartCard'/>
            <div className='favouriteChoosen'><span>Được khách yêu thích</span></div>
        </div>

        </>
    )
}

export default CardWishListDetail