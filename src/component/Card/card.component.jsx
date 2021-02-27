import './card.style.scss'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setIndex,setStatus,setAlbumArt, setIsPlaylist} from '../../redux/action'
import {playerRef} from '../Player/player.component'

const Card = ({image,title, index,id, setIndex,setStatus, match, history,setAlbumArt, isPlaylist,setIsPlaylist, album, player, status})=>{
   async function changeTrack() {
        await setIndex(index)
        if(!status){
            setStatus(true)
         } 
          playerRef.current.play()
    }
    
    function explorePage(){
        if(isPlaylist){
            setIsPlaylist(true)
        }else{
            setIsPlaylist(false)
        }
        if(album){
            setAlbumArt(image)
        }
        history.push(`${match.url}${id}`)
    }
    return(
    <div className="music-card" onClick={()=> {
        if(!isNaN(index)){
            changeTrack()
        }else{
            explorePage()
        }
    }}>
        <div className="image-card">
             {image && <img src={`${image}`} alt="music"/>}
        </div>
        <div className="text">
        {title && <p>{title}</p>}
        </div>
     </div>
)
    }
    const mapDispatchToProps = dispatch=>({
        setIndex: index => dispatch(setIndex(index)),
        setStatus: status => dispatch(setStatus(status)),
        setAlbumArt: image => dispatch(setAlbumArt(image)),
        setIsPlaylist: status => dispatch(setIsPlaylist(status))
    })
    
const mapStateToProps = state=>({
    player:state.player,
    status:state.status
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Card))