import React, { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './Banner.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { showAds } from '../../../actions/bannerActions';

const Banner = () => {
  const [isHidden, setIsHidden] = useState();
  const dispatch = useDispatch();
  const isShow = useSelector(state => state.banner);

  useEffect(() => {
    isShow === true?setIsHidden(false):setIsHidden(true);
  }, [isShow])


  const handleCloseBanner = () => {
    setIsHidden(true);
    const action = showAds(false);
    dispatch(action);
  };

  return (
    <div className={`banner-container ${isHidden ? 'hidden' : ''}`}  onClick={handleCloseBanner} >
      <div className="banner-content">
        <img src={`http://localhost:9999/file/1710415091261-HOLARENT.png`}alt="Banner" className="banner-image" />
      </div>
      <span className='highlightOffIcon' onClick={handleCloseBanner}><HighlightOffIcon/></span>
    </div>
  );
}

export default Banner;