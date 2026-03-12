import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { LoginUser } from "@/services/authService";
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("adminToken");

    const LoginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            email,
            password
        }
        try {
            setLoading(true);
            const response = await LoginUser(payload);
            if (response) {
                toast.success("Login successful");
                localStorage.setItem("adminToken", response?.data?.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }


    return (
        <div className="min-h-screen flex">

            {/* Left Section (Image / Branding) */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 items-center justify-center p-10">
                <div className="text-center text-white">
                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                        alt="ecommerce"
                        className="rounded-xl shadow-lg mb-8"
                    />

                    <h1 className="text-4xl font-bold mb-4">
                        E-Commerce Admin Panel
                    </h1>

                    <p className="text-lg opacity-90">
                        Manage products, orders, users and analytics from one dashboard.
                    </p>
                </div>
            </div>

            {/* Right Section (Login Form) */}
            <div className="flex flex-1 items-center justify-center bg-gray-100 px-6 py-12">

                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Admin Login
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Sign in to manage your store
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={LoginHandler}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="admin@email.com"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                                />

                                {/* Icon */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm">

                            <Link to="#" className="text-indigo-600 hover:underline">
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Login {loading && "..."}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        © 2026 E-Commerce Admin
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Login;