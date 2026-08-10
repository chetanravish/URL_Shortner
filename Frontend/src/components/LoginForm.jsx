import { useState } from "react";
import { loginUser } from "../api/user_api";


const Login = ({ state }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            await loginUser(email, password);

            console.log("signed in");

        } catch (error) {
            console.log("Login error:", error);

            setError(
                error.response?.data?.message ||
                "Login Failed! Check your credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to your URL Shortener account
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-center text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            outline-none focus:ring-2 focus:ring-indigo-500
                            focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 bg-indigo-600 text-white
                        font-semibold rounded-lg hover:bg-indigo-700
                        active:bg-indigo-800 transition duration-200"
                    >
                        Login
                    </button>
                </div>

                {/* Register */}
                <p className=" cursor-pointer text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <span
                        onClick={() => state(false)}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    );
};

export default Login;