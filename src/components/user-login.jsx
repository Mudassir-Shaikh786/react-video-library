import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

export function UserLogin(){

    const [cookies, setCookies, removeCookies] = useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password:''
        },
        onSubmit : (user)=> {
            axios.get(`http://127.0.0.1:5000/users`)
            .then(response=>{
                var result = response.data.find(item=> item.UserId===user.UserId);
                if(result) {
                    if(user.Password===result.Password) {
                        setCookies('userid', user.UserId);
                        navigate('/user-dash');          
                    } else {
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid UserId');
                }
            })
        }
    })

    return(
        <div className="bground d-flex justify-content-center align-items-center">
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h3 className="text-white bi bi-person-fill">User Login</h3>
                <dl>
                    <dt className="text-white">UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="UserId" /></dd>
                    <dt className="text-white">Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} className="form-control" name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
                <Link className="text-white" to="/user-register">New User Register</Link>
            </form>
        </div>
    )
}