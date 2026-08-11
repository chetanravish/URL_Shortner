import { useState } from "react";
import { registerUser } from "../api/user_api";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const Register = ({state}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

           if(password.length<6){
            setError(`Password must be of atleast 6 character long`)
           }
        setLoading(true); 
        setError("");

        try {
            const data = await registerUser(name, email, password);
            setLoading(false);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})

        } catch (error) {
            setLoading(false);
            setError(
                error.message || "Registration Failed! Please try again"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your URL Shortener account
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-5">

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            outline-none focus:ring-2 focus:ring-indigo-500
                            focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            outline-none focus:ring-2 focus:ring-indigo-500
                            focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            outline-none focus:ring-2 focus:ring-indigo-500
                            focus:border-indigo-500 transition"
                        />
                    </div>


                    {/* Register Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 text-white
                        font-semibold rounded-lg hover:bg-indigo-700
                        active:bg-indigo-800 transition duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </div>

                {/* Login */}
                <p className=" cursor-pointer text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={()=>state(true)}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div> 
        </div>
    );
};

export default Register;