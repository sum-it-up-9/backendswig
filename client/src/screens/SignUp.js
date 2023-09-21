import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const[name,Setname]=useState("");
  const[email,Setemail]=useState("");
  const[password,Setpassword]=useState("");
  const navigate = useNavigate();

  const handleSubmit=async (event)=>{
    event.preventDefault();
    const response = await fetch("http://localhost:5000/signup", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, password: password})

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      //localStorage.setItem('token', json.authToken)
      navigate("/login");
      alert("Signed Up successful, Log in to continue");

    }
    else {
      alert("Account with given email alredy exists, proceed to login!")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" value={name} onChange={(e) => { Setname(e.target.value) }} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => { Setemail(e.target.value) }} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => { Setpassword(e.target.value) }} />
        </label>
        <br />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;
