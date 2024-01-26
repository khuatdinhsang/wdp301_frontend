import axios from "axios";
import { useState } from "react";
import "./UploadBlog.scss"

function UploadBlog(){

    const [hospitalImages, setHospitalImages] = useState([]);


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
        .post(`api/upload/files`, formImage)
        .then(async (res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh bệnh viện không được để trống");
    }
  };

  const [hospitalImage, setHospitalImage] = useState({
    file: "",
    base64: "",
  });

  const getBase64 = (file) => {
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
  const convertImage = (e) => {
    const file = e.target.files?.[0];
    getBase64(file).then((res) => {
      setHospitalImage({
        file: file,
        base64: res,
      });
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    const formImage = new FormData();
    formImage.append("file", hospitalImage.file);
    if (hospitalImage.file.name) {
      await axios
        .post(`api/upload/file`, formImage)
        .then(async (res) => {
          console.log("res", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("Ảnh bệnh viện không được để trống", 1);
    }
  };
    return (
            <div className="uploadPage">
            <div className='uploadContain'>
                <h3 className="uploadTitle">Upload Product</h3>
                <form onSubmit={submit}>
                    <input
                    type="file"
                    className="hospitalImage absolute bottom-0 right-0 w-8 h-8 rounded-[50%] cursor-pointer opacity-0"
                    onChange={(e) => {
                        convertImage(e);
                    }}
                    name="file"
                    />
                    <img src={hospitalImage.base64} alt="abc" width={100} height={100} />
                    <button type="submit">Submit</button>
                </form>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Tiêu đề Blog</label>
                        <input
                            type="text"
                            className='inputName'
                            id='inputName'
                            placeholder='Nhập tiêu đề'/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Miêu tả</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputPrice'
                            placeholder='Nhập miêu tả'/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='description'>Diện tích</label>
                        <textarea
                            className='inputPrice'
                            id='description'
                            placeholder='Nhập diện tích'/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Giá</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập giá tiền'/>
                    </div>
                    <div className="inputBox">
                         <form onSubmit={submitMultipleImg}>
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
                            {hospitalImages.map((img) => {
                            return <img src={img.base64} alt="abc" width={100} height={100} />;
                            })}
                            <button type="submit">Xác nhận Ảnh</button>
                        </form>
                    </div>

                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Địa chỉ</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập địa chỉ trọ'/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Tổng số phòng</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập tổng số phòng'/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Đối tượng thuê</label>
                        <select >
                            <option value="">Nam</option>
                            <option value="">Nữ</option>
                            <option value="">Cả nam và nữ</option>
                        </select>
                    </div>
                    <div className="inputBox">

                    </div>
                    <div className="submitForm">
                        <button className='uploadBtn' >Upload</button>
                    </div>

                </div>

            </div> 
        </div>
    )   
}

export default UploadBlog