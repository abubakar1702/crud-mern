import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const initialUserData = {
    fname: "",
    lname: "",
    email: ""
  };
  const { id } = useParams();
  const [user, setUser] = useState(initialUserData);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getOne/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/update/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Link to={"/"} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-block mb-4">
        Back
      </Link>
      <h3 className="text-xl font-semibold mb-4">Update User</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" value={user.fname} onChange={handleInputChange} placeholder="Enter first name" id="fname" name="fname" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" value={user.lname} onChange={handleInputChange} placeholder="Enter last name" id="lname" name="lname" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" value={user.email} onChange={handleInputChange} placeholder="Enter email" id="email" name="email" autoComplete="off" className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500" />
        </div>
        <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default Update;
