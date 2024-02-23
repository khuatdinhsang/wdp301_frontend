import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './EditBlogManager.scss'

function EditBlogManager(){
    const {slug} = useParams();
     const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState();
    const [money, setMoney] = useState();
    const [addressDetail, setAddressDetail] = useState();
    const [totalRoom, setTotalRoom] = useState();
    const [rentalObject, setRentalObject] = useState();
    const [blog, setBlog] = useState()
    const navigate = useNavigate()
    const account = useSelector(state => state.account);

    useEffect(() => {
        axios
        .get(`/api/blog/detail/${slug}`)
        .then(res => {
            const data = res.data.data;
            setBlog(data);
        })
        .catch(err => console.log(err))
    },[])

    const handleChangeTotalRoom = (total) => {
        if(total <= blog?.totalRoom){
            setTotalRoom(total)
        }else{
            console.log("Total Room have to equal or smaller than original Total Room!");
        }
    }

    const handleEditBlog = () => {
        if(title === '' || description === '' || area == '' || money == '' || addressDetail === '' || totalRoom == '' ){
            console.log("Have a blank");
        }else{
            const blogEdit = {
                category: "rent",
                title: title,
                description: description,
                area: +area,
                money: +money,
                image: blog?.image,
                video: blog?.video,
                addressDetail: addressDetail,
                totalRoom: +totalRoom,
                rentalObject: rentalObject
            }

            axios
            .put(`/api/blog/edit/${slug}`,blogEdit,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res =>{
                console.log("Edit successfully!!");
                navigate('/admin/blogManager');
            })
            .catch(err => console.log(err))
        }
    }

    const handleOptionRental = (e) => {
        setRentalObject(e.target.value);
    }
    
    useEffect(() => {
        setTitle(blog?.title);
        setDescription(blog?.description);
        setArea(blog?.area);
        setMoney(blog?.money);
        setAddressDetail(blog?.addressDetail);
        setTotalRoom(blog?.totalRoom);
        setRentalObject(blog?.rentalObject);
        
    },[blog])

    

    return (
         <div className="uploadPage">
               <span style={{cursor: "pointer"}} onClick={() => {navigate('/admin/blogManager')}}><ArrowBackIosRoundedIcon className='backToDashboard' /></span>
            <div className='uploadContain'>
                <h3 className="uploadTitle">Upload Product</h3>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Tiêu đề Blog</label>
                        <input
                            type="text"
                            className='inputName'
                            id='inputName'
                            placeholder='Nhập tiêu đề'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Miêu tả</label>
                        <input
                            type="text"
                            className='inputPrice'
                            id='inputPrice'
                            placeholder='Nhập miêu tả'
                            value={description}
                            onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='description'>Diện tích</label>
                        <input
                            className='inputPrice'
                            id='description'
                            placeholder='Nhập diện tích'
                            type="number"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Giá</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập giá tiền'
                            value={money}
                            onChange={(e)=> setMoney(e.target.value)}/>
                    </div>
                    
                   

                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Địa chỉ</label>
                        <input
                            type="text"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập địa chỉ trọ'
                            value={addressDetail}
                            onChange={e => setAddressDetail(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Tổng số phòng</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập tổng số phòng'
                            value={totalRoom}
                            onChange={(e) => handleChangeTotalRoom(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Đối tượng thuê</label>
                        <div className="inputRadio">
                            <label htmlFor="both">
                                <input 
                                    type="radio" 
                                    className='inputPrice'
                                    name="rental"
                                    id="both"
                                    value={'both'}
                                    checked={rentalObject === 'both'}
                                    onChange={handleOptionRental}
                                />
                                Cả 2
                            </label>
                            <label htmlFor="male">
                                <input 
                                    type="radio" 
                                    className='inputPrice'
                                    id="male"
                                    name="rental"
                                    value={'male'}
                                    checked={rentalObject === 'male'}
                                    onChange={handleOptionRental}
                                />
                                Nam
                            </label>
                            <label htmlFor="female">
                                 <input 
                                    type="radio" 
                                    className='inputPrice'
                                    name="rental"
                                    value={'female'}
                                    id='female'
                                    checked={rentalObject === 'female'}
                                    onChange={handleOptionRental}
                                />
                                Nữ
                            </label>
                            
                        </div>
                    </div>
                    
                    <div className="submitForm">
                        <span className="uploadBtn" onClick={() => handleEditBlog()}>Đăng bài</span>
                    </div>

                </div>

            </div> 
        </div>
    )
}

export default EditBlogManager