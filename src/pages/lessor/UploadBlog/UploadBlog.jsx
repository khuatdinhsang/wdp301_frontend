import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import "./UploadBlog.scss"
import { toast } from "react-toastify";

function UploadBlog(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState();
    const [money, setMoney] = useState();
    const [addressDetail, setAddressDetail] = useState();
    const [totalRoom, setTotalRoom] = useState();
    const [rentalObject, setRentalObject] = useState();
    const [expiredTime, setExpiredTime] = useState();
    const [hospitalImages, setHospitalImages] = useState([]);
    const account = useSelector(state => state.account)
    const [dataImg, setDataImg] = useState([])
    const navigate = useNavigate();



    const getBase64Multiple = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertMultipleImage = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => getBase64Multiple(file));

    Promise.all(promises)
      .then((base64Results) => {
        const newImages = base64Results.map((base64, index) => ({
          file: files[index],
          base64: base64,
        }));
        setHospitalImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };
  const submitMultipleImg = async (e) => {
    e.preventDefault();
    const formImage = new FormData();
    hospitalImages.forEach((image) => {
      formImage.append("files", image.file);
    });
    if (formImage) {
      await axios
        .post(`api/upload/files`, formImage,{
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(async (res) => {
          setDataImg(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh không được để trống");
    }
  };

  const handleOptionRental = (e) => {
    setRentalObject(e.target.value);
  }

  const handleUploadBlog = () => {
    if(title === '' || description === '' || area === '' || money === '' || dataImg === [] || addressDetail === '' || totalRoom === '' || rentalObject === '' || expiredTime === ''){
      toast.warn("Có thông tin chưa điền!!!")
    }else{
        const blog = {
            category: "rent",
            title: title,
            description: description,
            area: +area,
            money: +money,
            image: dataImg,
            video: [
                "http://video1.jpg",
                "http://video2.jpg"
            ],
            addressDetail: addressDetail,
            totalRoom: +totalRoom,
            rentalObject: rentalObject,
            expiredTime: expiredTime
        }
        // console.log(blog);
        
         axios
        .post('api/blog/create', blog, {
            headers: {
                    Authorization: `Bearer ${account?.token}`
                }
        })
        .then(res => {
          toast.success("Tạo blog thành công!!!")
          navigate('/')
        })
        .catch(err=> console.log(err))
    }
  }
 
    return (
            <div className="uploadPage">
               <span style={{cursor: "pointer"}} onClick={() => {navigate('/admin/dashboard')}}><ArrowBackIosRoundedIcon className='backToDashboard' /></span>
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
                         <form onSubmit={submitMultipleImg}>
                            <div className="inputBox">
                                <label htmlFor="">Ảnh</label>
                                <input
                                type="file"
                                multiple="true"
                                className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0 inputPrice"
                                onChange={(e) => {
                                    convertMultipleImage(e);
                                }}
                                name="files"
                                />
                                <button type="submit" className="submitImgUpload" onClick={submitMultipleImg}>Xác nhận</button>
                            </div>
                        </form>
                    </div>
                    {hospitalImages ?  <div className="=listImg">
                            {hospitalImages.map((img,index) => {
                            return <img key={index} src={img.base64} alt="abc" width={100} height={100} />;
                            })}                       
                    </div>:<></>}
                   

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
                            onChange={e => setTotalRoom(e.target.value)}/>
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
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Ngày hết hạn bài đăng</label>
                        <input
                            type="date"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Ngày hết hạn'
                            value={expiredTime}
                            onChange={e => setExpiredTime(e.target.value)}/>
                    </div>
                    <div className="submitForm">
                        <span className="uploadBtn" onClick={() => handleUploadBlog()}>Đăng bài</span>
                    </div>

                </div>

            </div> 
        </div>
    )   
}

export default UploadBlog