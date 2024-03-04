const pathReducer = (state="" , action) => {
    switch(action.type){
        case "PATH_BACK_VIEW_PROFILE":{
            const path = action.payload;
            return path;
        }

        default: 
            return state;
    }
}

export default pathReducer