import axios from "axios";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import * as yup from "yup";

export function UserRegister(){

    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        validationSchema : yup.object({
            UserId : yup.number().required('User Id Required'),
            UserName : yup.string().required('User Name Required').min(4, "Name Too Short"),
            Password : yup.string().required('Password Required').min(3, "Password Too Short"),
            Email : yup.string().required('Email Required'),
            Mobile : yup.string().required('Enter Mobile Number').matches(/\+91\d{10}/, "invalid mobile start with +91")
        }),

        onSubmit : useCallback((user) => {
            axios.post(`http://127.0.0.1:5000/register-user`, user)
            .then(()=>{
                alert('Reigstered Successfully..');
                navigate('/user-login');
            })
        },[])
    })

    function VerifyUser(e){
        axios.get(`http://127.0.0.1:5000/users`)
        .then(response=> {
             var user = response.data.find(item=> item.UserId===e.target.value);
             if(user) {
                 setStatus('User Id Taken - Try Another');
                 setErrorClass('text-danger');
             } else {
                setStatus('User Id Available');
                setErrorClass('text-success');
             }
        })
    }

    return(
        <div className="background mt-2">
            <form className="ms-2" onSubmit={formik.handleSubmit}>
                <h2 className="text-white">Register User</h2>
                <dl>
                    <dt className="text-white">UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" onKeyUp={VerifyUser} /></dd>
                    <dd className={errorClass}>{status}</dd>
                    <dd className="text-danger">{formik.errors.UserId}</dd>
                    <dt className="text-white">User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName"/></dd>
                    <dd className="text-danger">{formik.errors.UserName}</dd>
                    <dt className="text-white">Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                    <dd className="text-danger">{formik.errors.Password}</dd>
                    <dt className="text-white">Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email"/></dd>
                    <dd className="text-danger">{formik.errors.Email}</dd>
                    <dt className="text-white">Mobile</dt>
                    <dd><input type="text"  onChange={formik.handleChange} name="Mobile"/></dd>
                    <dd className="text-danger">{formik.errors.Mobile}</dd>
                </dl>
                <button className="btn btn-primary">Register</button>
            </form>
            <Link className="text-white ms-2 fs-5" to="/user-login">Existing User ?</Link>
        </div>
    )
}