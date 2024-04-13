import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Users = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchedData = async () => {
      const response = await axios.get("http://localhost:8000/api/allusers")
      setUser(response.data)
    }
    fetchedData()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      // If the deletion is successful, update the user state to remove the deleted user
      setUser(prevUsers => prevUsers.filter(user => user._id !== userId));
      console.log(response.data); // Assuming you want to log the response data
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to={"/add"} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Add User
      </Link>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr className="hover:bg-gray-100" key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.fname} {user.lname}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.password}</td>
              <td className="border border-gray-300 px-4 py-2">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => handleDelete(user._id)}>Delete</button>
                <Link to={`/edit/`+user._id} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
