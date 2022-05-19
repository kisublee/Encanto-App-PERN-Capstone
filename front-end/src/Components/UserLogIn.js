import axios from "axios";
import React, { useState} from "react"
import {useNavigate } from "react-router-dom"

export default function UserLogIn ({setIsLoggedIn, setCurrentUser}) {

// Set a state for log in
const [input, setInput] = useState({
    password:"",
    email:""
})

//API PATH
const API = process.env.REACT_APP_API_URL;

// Call React Router's useNavigate function
const navigate = useNavigate();

// Event handler to keep track of user's input
const handleChange = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
};

// Event handler to check if the user's input is valid. If it is, log the user in successfully and take them to /user. If not, throw error message
const handleSubmit = async (event) => {
    
    event.preventDefault();

    const fetchData = async () => {
        try {
          console.log("Hitting logIn page");
          console.log("input", input)
          const res = await axios.post(`${API}/login`, input)
          if (res) {
            const user = await axios.get(`${API}/login/${input.email}`)
            setCurrentUser(user.data.payload)
            setIsLoggedIn(true)
            navigate('/users')
          }

        } catch (err) {
          return err;
        }
      };
      fetchData();
};

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id="email"
                    value={input.email}
                    type="text"
                    onChange={handleChange}
                    placeholder="email"
                    required
                    />
                     <input
                    id="password"
                    value={input.password}
                    type="text"
                    onChange={handleChange}
                    placeholder="password"
                    required
                    />
                    <button>Log In</button>
            </form>
        </div>
    )

}