import { useState, useEffect } from "react";

export function SavedVideo(){

    const[videoSlicer, setVideoSlicer]= useState([[{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}]]);

    return(
      <div className="container-fluid">
        <button data-bs-toggle="modal" data-bs-target="#cart">show cart</button>
        <div className="modal fade" id="cart"> 
        <div className="modal-dialog"> 
        <div className="modal-content"> 
        <div className="modal-header"> 
        <h3 className="text-primary">Your Cart Items</h3> 
        <button className="btn btn-close" 
        data-bs-dismiss="modal"></button> 
    </div> 

    <div className="modal-body"> 
        <table className="table table-hover"> 
   
    <tbody> 
    
        {
            videoSlicer.map(video=>
                <div key={video.VideoId} className="card m-2 ms-4 p-2 w-25">
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
    
    </tbody> 
      </table> 
     </div> 
    </div> 
   </div> 
  </div> 
 </div> 
    ) 
    }