import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../Context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogin = useContext(Context);

    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault();
console.log("isLogin",isLogin);
        try {
            let formData = { email, password };

            const response = await axios.get('http://localhost:3001/users', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('User Login:', response.data, email);
           
            let found = response.data.find(function (element) {
                if (element.email === email) {
                    return element
                };
            });
            console.log("Found", found);
            if (found) {
                if (found.password === password) {
                    localStorage.setItem("userData", JSON.stringify(found))
                   
                    {found && found.role === "user" ? (
                        navigate("/userpage")
                      ) : found && found.role === "admin" ? (
                        navigate("/adminpage")
                      ) : (
                        navigate("/techsupportpage")
                      )}
                } else {
                    alert("Incorrect Password")
                }
            }
            else alert("User Not Available")

        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    return (
        <div classNameName='mx-auto p-4'>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" name="email" id="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Enter Username" required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" name="password" id="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login