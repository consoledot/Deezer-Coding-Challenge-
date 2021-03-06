import './card-collections.style.scss'
import Browse from '../Browse/browse.component'
import Playlists from '../Playlist/playlist.component'
import NewRelease from '../New Release/new-release.component'
import Loading from '../Loading/loading.component'
import {useEffect} from 'react'
import axios from 'axios'
import {setLatest,addPlaylist} from '../../redux/action'
import {connect} from 'react-redux'


const CardCollection =({latest, setLatestSongs,addPlaylist,mode})=>{
   const corsUrl ='https://cors.bridged.cc/'
   async function getDatas(){
       try{
           const response = await  axios.get(corsUrl+"https://api.deezer.com/chart/0")
            setLatestSongs(response.data)
            addPlaylist(response.data.tracks.data)
       }catch(err){
           console.log(err)
       }
    }
    useEffect(()=>{
        getDatas()
    },[])
    return(
        <div className="card-collection" style={{
            backgroundColor:`${mode? 'white': '#202c37'}`,
            color:`${!mode? 'white': '#202c37'}`
        }}>
            {!latest ? <Loading/> :(
                <>
                 <NewRelease releases={latest.tracks.data} title="New Releases"/>
                  <Playlists playlists={latest.playlists.data} title="Featured Playlist"/>
                  <Browse albums={latest.albums.data} title="Browse"/>
                </>
            )}
        </div>
    )
}
const mapStateToProps = state=>({
    latest:state.latest,
    mode: state.mode
})
const mapDispatchToProps = dispatch=>({
    setLatestSongs: latest=> dispatch(setLatest(latest)),
    addPlaylist: tracks => dispatch(addPlaylist(tracks))
})
export default connect(mapStateToProps, mapDispatchToProps)(CardCollection)