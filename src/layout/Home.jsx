import React from 'react';
import Login from "../pages/Login.jsx";

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[url('../public/bgLogin2.png')] bg-cover w-full bg-center">
            <Login/>
        </div>
    );
};

export default Home;