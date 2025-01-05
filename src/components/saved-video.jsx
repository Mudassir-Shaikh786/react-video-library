import store from "../store/store";

export function SavedVideo(){
        
    return(
      <div className="container-fluid d-flex flex-wrap">
    
        {
                 store.getState().store.videos.map(video=>
                <div key={video.Videoid} className="card m-2 ms-4 p-2 w-25">
                    <iframe src={video.Url} width="100%" height="300"></iframe>
                    <div className="card-header">
                        <h6>{video.Title}</h6>
                    </div>
                    <div className="card-footer">
                        <button className="bi btn bi-eye-fill"> {video.Views} </button>
                        <button className="bi btn mx-2 bi-hand-thumbs-up"> {video.Likes} </button>
                        <button className="bi btn bi-hand-thumbs-down"> {video.Dislikes} </button>
                    </div>
                </div>
            )
        }
    
  </div> 
    ) 
    }