import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Button, TextField, Typography } from '@mui/material';
import { useSelector } from "react-redux";


import './editBlog.scss';

function EditBlog() {
    const { slug } = useParams();
    const [blog, setBlog] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]); 
    const [area, setArea] = useState('');
    const [money, setMoney] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [totalRoom, setTotalRoom] = useState('');
    const [rentalObject, setRentalObject] = useState('');
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);

    useEffect(() => {
        axios
            .get(`/api/blog/detail/${slug}`)
            .then(res => {
                const data = res.data.data;
                setBlog(data);
                setTitle(data.title);
                setDescription(data.description);
                setImages(data.image || []); // If the 'images' field is not present in the data, default to an empty array
                setArea(data.area);
                setMoney(data.money);
                setAddressDetail(data.addressDetail);
                setTotalRoom(data.totalRoom);
                setRentalObject(data.rentalObject);
            })
            .catch(err => console.log(err));
    }, [slug]);

    const handleEditBlog = async () => {
        if (title === '' || description === '' || area === '' || money === '' || addressDetail === '' || totalRoom === '') {
            toast.warn('Có thông tin rỗng!!');
            return;
        }

        const blogEdit = {
            category: "rent",
            title: title,
            description: description,
            area: +area,
            money: +money,
            image: [...image, ...newImages.map(image => image.preview)],
            addressDetail: addressDetail,
            rentalObject: rentalObject
        };

        try {
            await axios.put(`/api/blog/edit/${slug}`, blogEdit, {
                headers: {
                    Authorization: `Bearer ${account?.token}`
                }
            });
            toast.success("Chỉnh sửa thông tin blog thành công!!");
            navigate('/blogManager');
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi khi chỉnh sửa blog!!");
        }
    };

    const handleOptionRental = (e) => {
        setRentalObject(e.target.value);
    };

    useEffect(() => {
        setTitle(blog?.title);
        setDescription(blog?.description);
        setArea(blog?.area);
        setMoney(blog?.money);
        setImages(blog?.image || []);
        setAddressDetail(blog?.addressDetail);
        setTotalRoom(blog?.totalRoom);
        setRentalObject(blog?.rentalObject);
    }, [blog]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        const imageObjects = files.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));

        setNewImages([...newImages, ...imageObjects]);
    };

    const removeImage = (index) => {
        if (index < image.length) {
            const updatedImages = [...image];
            updatedImages.splice(index, 1);
            setImages(updatedImages);
        } else {
            const updatedNewImages = [...newImages];
            updatedNewImages.splice(index - image.length, 1);
            setNewImages(updatedNewImages);
        }
    };

    return (
        <div className="uploadPage">
            <span style={{ cursor: "pointer" }} onClick={() => { navigate('/admin/blogManager') }}><ArrowBackIosRoundedIcon className='backToDashboard' /></span>
            <div className='uploadContain'>
                <h3 className="uploadTitle">Edit Blog</h3>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Tiêu đề Blog</label>
                        <input
                            type="text"
                            className='inputName'
                            id='inputName'
                            placeholder='Nhập tiêu đề'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Miêu tả</label>
                        <input
                            type="text"
                            className='inputPrice'
                            id='inputPrice'
                            placeholder='Nhập miêu tả'
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='description'>Diện tích</label>
                        <input
                            className='inputPrice'
                            id='description'
                            placeholder='Nhập diện tích'
                            type="number"
                            value={area}
                            onChange={(e) => setArea(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Giá</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập giá tiền'
                            value={money}
                            onChange={(e) => setMoney(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputImages'>Ảnh</label>
                        <div>
                            {image.map((image, index) => (
                                <div key={index} className="imageItem">
                                    <img
                                        className='previewImage'
                                        src={image.preview}
                                        alt={`Image ${index}`}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                    <button onClick={() => removeImage(index)}>Xóa</button>
                                </div>
                            ))}
                            {newImages.map((image, index) => (
                                <div key={index + image.length} className="imageItem">
                                    <img
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        src={image.preview}
                                        alt={`New Image ${index}`} />
                                    <button onClick={() => removeImage(index + image.length)}>Xóa</button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className='inputImages'
                            id='inputImages'
                            onChange={handleImageUpload}
                            multiple />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Địa chỉ</label>
                        <input
                            type="text"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Nhập địa chỉ trọ'
                            value={addressDetail}
                            onChange={e => setAddressDetail(e.target.value)} />
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
                        <span className="uploadBtn" onClick={() => handleEditBlog()}>Edit Blog</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
