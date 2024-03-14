const bannerReducer = (state = true, action) => {
    switch(action.type){
        case "STATUS_ADS":{
            const status = action.payload;
            return status;
        }
        default: 
            return state;
    }
}

export default bannerReducer