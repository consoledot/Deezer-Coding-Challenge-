const INITIAL_STATE = {
    newRelease: null,
    index: 0,
    status: false,
    albumArt:""
}

const reducer = (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case "ADD_PLAYLIST":
            return{
                ...state,
                newRelease: action.payload
            }
        case "SET_INDEX":
            return{
                ...state,
                index: action.payload
           }
        case "UPDATE_INDEX":
            return{
                ...state,
                index: action.payload
            }
        case "SET_STATUS":
            return{
                ...state,
                status: action.payload
            }
        case "SET_ALBUM_ART":
            return{
                ...state,
                albumArt: action.payload
            }
        default:
            return state
    }
}

export default reducer