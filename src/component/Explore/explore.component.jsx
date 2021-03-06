import './explore.style.scss'
import {useEffect, useState} from 'react'
import Card from '../Card/card.component'
import Loading from '../Loading/loading.component'
import axios from 'axios'
import {connect} from 'react-redux'
import {addPlaylist, updateIndex} from '../../redux/action'
const Explore = ({match,addPlaylist, updateIndex,mode})=>{
    console.log(match.params.id)
    const [playlist, setPlaylist] = useState('')
    function  getData() {
        const {type,id} = match.params
        const corsUrl ='https://cors.bridged.cc/'
        axios.get(corsUrl+`https://api.deezer.com/${type}/${id}}`)
            .then(data => {
                setPlaylist(data.data)
                addPlaylist(data.data.tracks.data)
            })
    }
    useEffect(()=>{
        updateIndex(0)
        getData()        
    },[])
return(
    <div className="explore"  style={{
        backgroundColor:`${mode? 'white': '#202c37'}`,
        color:`${!mode? 'white': '#202c37'}`
    }}>
        {
            !playlist ? <Loading/> :(
                <>
                <h1>{playlist.description ? playlist.description : playlist.title}</h1>
                <div className="section">
                    {
                    playlist.tracks.data.map((track,index)=> <Card key={track.id} index={index} image={track.album ? track.album.cover_medium :playlist.cover_medium} title={track.title}/>)
                    }
                </div>
                </>
            ) 
        }
        </div>
)
}

const mapDispatchToProps = dispatch=>({
    addPlaylist: playlists=> dispatch(addPlaylist(playlists)),
    updateIndex: index => dispatch(updateIndex(index))
   
})
const mapStateToProps = state=>({
    mode:state.mode
})
export default connect(mapStateToProps, mapDispatchToProps)(Explore)