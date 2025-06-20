import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({setQuery}) => {
    const {user,logout} = useAuth();
    
  return (
    <nav  className="bg-gray-800 p-4 text-white flex justify-between items-center">
      
        <div className="text-xl font-bold">
          <Link to="/">NoteApp</Link>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white px-3 py-2 rounded-lg outline-none w-64"
          onChange={(e)=> setQuery(e.target.value)}
        />
        <div>
     
      { !user ?(
        <>
         <Link
        to="/login"
        className="text-white bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-700"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 ml-4"
      >
        Register
      </Link>
        </>
      ) :<>  <span className="mr-4">{user.name}</span>
      <button onClick={logout} className="bg-red-500 mx-2 px-4 py-2 rounded" >Logout</button></>}
     
      
      </div>
    </nav>
  );
};

export default Navbar;
