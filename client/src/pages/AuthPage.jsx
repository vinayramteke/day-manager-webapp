import { useState } from "react";
import apiCall from "../api";
import Button from "../components/atoms/Button";
import { AlertCircle, User, Lock, Mail, Loader2 } from "lucide-react";

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = await apiCall(endpoint, "POST", form);
      onLogin(data);
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-black">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-black text-white rounded-xl flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-xl">
          DM
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Day Manager
        </h1>
        <p className="text-gray-500">Treat your time like money.</p>
      </div>
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all ${isLogin ? "border-b-2 border-black text-black" : "text-gray-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all ${!isLogin ? "border-b-2 border-black text-black" : "text-gray-400"}`}
          >
            Register
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-black outline-none font-medium"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-black outline-none font-medium"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-black outline-none font-medium"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-6"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AuthPage;
