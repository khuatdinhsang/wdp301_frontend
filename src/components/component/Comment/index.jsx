
import "./style.scss"
import StarIcon from '@mui/icons-material/Star';


function Comment(){
    return (
        <div className="comment">
            <div className="userComment">
                <div className="avatarComment">
                    <img class="i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" alt="Gaby" decoding="async" elementtiming="LCP-target" src="https://a0.muscache.com/im/pictures/user/4225ae51-026e-4a06-b468-59bbad9b93b8.jpg?im_w=240" data-original-uri="https://a0.muscache.com/im/pictures/user/4225ae51-026e-4a06-b468-59bbad9b93b8.jpg?im_w=240" style={{objectFit: "cover"}}></img>
                </div>
                <div className="detailUserComment">
                    <span className="usernameComment">
                        Khuat Dinh Sang
                    </span>
                    <i className="placeComment">
                        Thach That, Ha Noi
                    </i>
                </div>
            </div>
            <div className="userRating">
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <StarIcon  className='starCard'/>
                <b className="numberStarComment">3 tuần trước</b>
            </div>
            <div className="commentContent">
                <p>Ngôi nhà rất dễ thương, khiến tôi cảm thấy như mình đang ở trong một câu chuyện hư cấu. Ngoài ra còn có một chú mèo con đen xuất hiện để chơi đùa, rất thích đứa con nhỏ.</p>
            </div>
        </div>
    )
}

export default Comment
