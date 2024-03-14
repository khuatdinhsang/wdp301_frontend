const pathReducer = (state="" , action) => {
    switch(action.type){
        case "PATH_BACK_VIEW_PROFILE":{
            const path = action.payload;
            return path;
        }
        case "STATUS_ADS":{
            const status = action.payload;
            return status;
        }

        default: 
            return state;
    }
}

export default pathReducer