import store from "../store/store";
import { useState } from "react";

export function SavedVideo(){
    const[btn, setBtn] = useState(false);

        let videos = store.getState().store.videos

        
    function handleSignIn(){
        setBtn(true);
    }

    function handleSignout(){
        setBtn(false);
    }

    return(
      <div className="container-fluid d-flex flex-wrap">
    
        {
                    videos.map(video=>
                <div key={video.Videoid} className="card m-2 ms-4 p-2 w-25">
                    <iframe src={video.Url} width="100%" height="300"></iframe>
                    <div className="card-header">
                        <h6>{video.Title}</h6>
                    </div>
                    <div className="card-footer">
                        <button className="bi btn bi-eye-fill"> {video.Views} </button>
                        {
                        (btn===true)?<button onClick={handleSignout} className="bi bi-hand-thumbs-up-fill btn mx-2">{video.Likes+1}</button>:
                        <button className="bi bi-hand-thumbs-up btn mx-2" onClick={handleSignIn}>{video.Likes}</button>
                        }
                        <button className="bi btn bi-hand-thumbs-down"> {video.Dislikes} </button>
                    </div>
                </div>
            )
        }
    
  </div> 
    ) 
    }