import CardWishList from '../../../components/component/CardWishList/CardWishList'
import './WishList.scss'

function WishList(){
    return(
        <div className="wishListPage">
            <h2 className='favouriteWishList'>Yêu thích</h2>
            <div className="container">
                <div className="listCardWishList">
                    <CardWishList/>
                    <CardWishList/>
                    <CardWishList/>
                    <CardWishList/>
                </div>
            </div>
        </div>
    )
}

export default WishList