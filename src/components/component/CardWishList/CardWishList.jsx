import { useNavigate } from 'react-router'
import './CardWishList.scss'

function CardWishList(){
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/wishlist/1231')
    }

    return (
        <div className="cardWishListPage" onClick={() => handleNavigate()}>
            <div className='imageWishList'>
                <img src="https://www.travelandleisure.com/thmb/_XsBCRprdQriog2hTCkuiT3f7lc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-airbnb-listing-NEWAIRBNB1123-a67a0e07c4e846e2ae4e653d201e47af.jpg" alt="" />
            </div>
            <div className="titleWishList">
                <h4>Cabin 2024</h4>
                <i>Đã lưu 2 mục</i>
            </div>
        </div>
    )
}

export default CardWishList