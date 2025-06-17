import React, { useState } from "react";
import supabase from "../../../utils/supabase";
import { useNavigate } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const AuthComponent = () => {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && name.trim() === "") {
      setError("Name is required for signup.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const table = role === "student" ? "students" : "teachers";

    if (mode === "signup") {
      const { data, error: insertError } = await supabase.from(table).insert([
        {
          email,
          name,
          password,
        },
      ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      alert(`Signed up successfully as ${role}`);
    } else {
      const { data, error: loginError } = await supabase
        .from(table)
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (loginError || !data) {
        setError("Invalid email or password.");
        return;
      }

      alert(`Logged in successfully as ${role}`);
      navigate(role === "student" ? "/student" : "/teacher");
    }
  };

  return (
    <div className="bg-gray-200  flex flex-col">
      <HomeHeader />
      <div className=" grid grid-cols-1 md:grid-cols-[6fr_4fr] md:gap-10 p-2 sm:p-4 lg:p-6 xl:p-8">
        <div
          className={`w-full h-80 md:h-full ${
            mode === "login"
              ? "bg-[url('https://resilienteducator.com/wp-content/uploads/2012/10/GettyImages-170126269.jpg')]"
              : "bg-[url('https://www.prestoninternationalschool.com/_site/data/images/galleries/111/Quiz%20Competition%20Sss1%20vs%20Sss2%20(17).JPG')]"
          } bg-center bg-cover`}
        ></div>
        <div className="w-full flex items-center justify-center py-4 sm:py-6 md:py-8">
          <div className="bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)] rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex justify-center mb-4 sm:mb-6">
              <button
                onClick={() => setMode("login")}
                className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold ${
                  mode === "login"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-blue-600"
                } rounded-l-lg`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold ${
                  mode === "signup"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-blue-600"
                } rounded-r-lg`}
              >
                Sign Up
              </button>
            </div>

            <div className="mb-3 sm:mb-4 text-center text-sm sm:text-base">
              <label className="mr-2 sm:mr-4">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                  className="mr-1"
                />{" "}
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                  className="mr-1"
                />{" "}
                Teacher
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="mb-3 sm:mb-4">
                  <label className="block mb-1 text-xs sm:text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border rounded-md"
                    placeholder="Your name"
                  />
                </div>
              )}

              <div className="mb-3 sm:mb-4">
                <label className="block mb-1 text-xs sm:text-sm font-medium">
                  Email ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border rounded-md"
                  placeholder="Enter your ID"
                  required
                />
              </div>

              <div className="mb-3 sm:mb-4 relative">
                <label className="block mb-1 text-xs sm:text-sm font-medium">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border rounded-md pr-8 sm:pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-6 sm:top-8 right-2 sm:right-3 text-xs sm:text-sm text-blue-600 font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-xs sm:text-sm mb-2 sm:mb-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-1 sm:py-2 text-sm sm:text-base rounded-md hover:bg-blue-700 font-semibold"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default AuthComponent;