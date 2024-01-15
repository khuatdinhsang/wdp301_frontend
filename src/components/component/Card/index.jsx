import './style.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function Card(){
    const navigate = useNavigate()
    const [status, setStatus] = useState(true)
    const handleFavouriteRoom = () => {
        setStatus(!status)
    }
    return (
        <div className='card' >
            <div className='imageContainer' onClick={() => navigate("/detail")}>
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
            <FavoriteIcon className='heartCard' style={{color: status===true?'':'pink'}} onClick={() => handleFavouriteRoom()}/>
            <div className='favouriteChoosen'><span>Được khách yêu thích</span></div>
        </div>

    )
}

export default Card