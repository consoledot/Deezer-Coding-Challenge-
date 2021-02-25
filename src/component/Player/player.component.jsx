import './player.style.scss'
import {connect} from 'react-redux'
import {useRef} from 'react'
import {setStatus, updateIndex} from '../../redux/action'


const Player = ({playlist,index, status, setStatus, updateIndex,albumArt})=>{

const player = useRef()
function playSong(){
    status ?  player.current.pause() : player.current.play()
    setStatus(!status)
}
function nextSong(){
    let newIndex = index + 1
   newIndex >= playlist.length ? updateIndex(0) : updateIndex(newIndex)
   setStatus(false)
}
function prevSong(){
    let newIndex = index - 1
    newIndex < 0 ? updateIndex(playlist.length -1) : updateIndex(newIndex)
    setStatus(false)
}

return(
    <div className="player-panel">
        <div className="image">
       {playlist && <img src={playlist[index].album ? playlist[index].album.cover_medium : albumArt} alt="music"/>}
        </div>
        {playlist &&<div className="title">{playlist[index].title}</div>}
        <div className="controls">
            <i className="fa fa-step-backward" aria-hidden="true" onClick={()=> prevSong()}></i>
            <i className={`fa ${status ? 'fa-pause-circle': 'fa-play-circle'}`} aria-hidden="true" onClick={()=> playSong()}></i>
            <i className="fa fa-step-forward" aria-hidden="true" onClick={()=> nextSong()}></i>
        </div>
        <div className="bar">
            <div className="progress"></div>
        </div>
        <div className="options">
            <i className="fa fa-heart" aria-hidden="true"></i>
            <i className="fa fa-random" aria-hidden="true"></i>
            <i className="fa fa-retweet" aria-hidden="true"></i>
            <i className="fa fa-volume-up" aria-hidden="true"></i>
        </div>
        {playlist && <audio ref ={player}src={`${playlist[index].preview}`}/>}
    </div>
)
}
const mapStateToProps = state=>({
    playlist: state.newRelease,
    index: state.index,
    status: state.status,
    albumArt: state.albumArt
})
const mapDispatchToProps = dispatch=>({
    setStatus: status => dispatch(setStatus(status)),
    updateIndex: index => dispatch(updateIndex(index))
})
export default connect(mapStateToProps,mapDispatchToProps)(Player)