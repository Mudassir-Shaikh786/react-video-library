import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicers/video-slicer";

export function UserDashboard()
{
    const [cookies, setCookies, removeCookies] = useCookies(['userid']); 
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}]);

    const dispatch = useDispatch();
    
    function LoadVideos(){
        axios.get(`http://127.0.0.1:5000/videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        if(cookies['userid']){
            LoadVideos()
           } else {
            navigate('/user-login');
           }
    },[store.getState().store.videosCount])

    let navigate = useNavigate();

    function handleSignout(){
        removeCookies('userid');
        navigate('/');
    }

    function handleSaveClick(video){
        dispatch(addToSaveList(video));
        alert('video saved');
    }

    return(
        <div className="mt-2">
            <h3 className="d-flex justify-content-between"> <span>User Dashboard</span> <Link to={"/saved-video"}><button className="btn bi bi-clock-history">[ {store.getState().store.videosCount} ]</button></Link>   <span className="bi bi-person-fill"> {cookies['userid']} </span> <button className="btn btn-danger fs-5" onClick={handleSignout}>Signout</button> </h3>
            <div className="my-3 d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className="card m-2 ms-4 p-2 w-25">
                            <iframe src={video.Url} width="100%" height="300"></iframe>
                            <div className="card-header">
                                <h6>{video.Title}</h6>
                            </div>
                            <div className="card-footer">
                                <button className="bi btn bi-eye-fill"> {video.Views} </button>
                                <button className="bi btn mx-2 bi-hand-thumbs-up"> {video.Likes} </button>
                                <button className="bi btn bi-hand-thumbs-down"> {video.Dislikes} </button>
                                <button onClick={()=>handleSaveClick(video)} className="bi bi-floppy-fill btn">Watch Later</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}