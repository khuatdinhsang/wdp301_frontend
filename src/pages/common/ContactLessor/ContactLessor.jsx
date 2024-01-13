import { useNavigate } from 'react-router';
import './ContactLessor.scss'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useEffect} from 'react';


function ContactLessor(){
    const navigate = useNavigate();
    const pathBack = localStorage.getItem('pathDetail')
    
    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div className='contactLessor'>
            <div className="backIconContact">
                    <span style={{cursor: "pointer"}} onClick={() => navigate(pathBack)}><ArrowBackIosRoundedIcon className='backIconLogin' /></span>
            </div>
            <div className="container">
                <div className="hostTitle">
                    <div className="leftHostTitle">
                        <h2 className='hostName'>Liên hệ Vương Nguyễn</h2>
                        <i>Thường phản hồi trong vòng 1 giờ</i>
                    </div>
                    <div className="rightHostTitle">
                      <img className="imgHost i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" alt="Satish là chủ nhà siêu cấp. Tìm hiểu thêm về Satish." decoding="async" elementtiming="LCP-target" src="https://a0.muscache.com/im/pictures/user/8c2644b3-c718-46bb-bd79-d4803a56393f.jpg?im_w=240" data-original-uri="https://a0.muscache.com/im/pictures/user/8c2644b3-c718-46bb-bd79-d4803a56393f.jpg?im_w=240" style={{objectFit: 'cover'}}/>
                    </div>
                </div>
                <div className="aboutRenter">
                    <div className="aboutStudent">
                        <h3>Hầu hết sinh viên đều quan tâm</h3>
                    </div>
                    <div className="priceAndPrivacy">
                        <h4>Đi tới đó</h4>
                        <ul>
                            <li>Chỗ đỗ xe miễn phí, an toàn.</li>
                            
                        </ul>
                    </div>
                    <div className="priceAndPrivacy">
                        <h4>Giá cả và tình trạng còn phòng</h4>
                        <ul>
                            <li>Giá cả được niêm yết, làm việc rõ ràng trong hợp đồng.</li>
                            <li>Hoàn tiền hợp đồng đầy đủ khi hoàn thành thời gian hợp đồng</li>
                        </ul>
                    </div>
                </div>
                <div className="questionForHost">
                    <h2>Bạn vẫn còn thắc mắc? Nhắn tin cho chủ nhà</h2>
                    <textarea className="question"  cols="20" rows="5"></textarea>
                    <button className='sendQuestion'>Gửi tin nhắn</button>
                </div>
            </div>
        </div>
    )
}

export default ContactLessor