import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const Create = () => {
    const navigate = useNavigate()
    const users={
        fname :"",
        lname: "",
        email:"",
        password:""
    }

    const [user, setUser]= useState(users)
    const handleInput=(e)=>{
        const { name, value } = e.target;
        setUser({...user, [name]:value})
        console.log(user)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/create", user);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }    
    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <Link to={"/"} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-block mb-4">
                Back
            </Link>
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <form onSubmit={submitForm}>
                <div className="mb-4">
                    <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" onChange={handleInput} placeholder="Enter first name" id="fname" name="fname" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" onChange={handleInput} placeholder="Enter last name" id="lname" name="lname" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" onChange={handleInput} placeholder="Enter email" id="email" name="email" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" onChange={handleInput} placeholder="Enter password" id="password" name="password" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
            </form>
        </div>
    );
};

export default Create;
