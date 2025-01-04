import { Link } from "react-router-dom";


export function VideoLibraryIndex(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <div>
                <img className="d-flex ms-5 mb-5" src="Logo.jpg"width={100} height={100}></img>
                <Link to="/user-login" className="btn btn-primary"> User Login </Link>
                <Link to="/admin-login" className="btn btn-warning ms-2"> Admin Login </Link>
            </div>
        </div>
    )
}