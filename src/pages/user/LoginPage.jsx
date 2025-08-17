// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Logo from "../../assets/speakTribe-logo.png";
// import learningImage from "../../assets/undraw_reading-time_gcvc.svg";
// import baseUrl from "../../utils/baseUrl"; // ✅ make sure this points to your backend

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     emailOrUsername: "", // ✅ fix: matches input field
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(`${baseUrl}/v1/login`, {
//         emailOrUsername: formData.emailOrUsername, // ✅ fix: match backend field
//         password: formData.password,
//       });

//       // ✅ Save user + token
//       const userDetails = JSON.stringify(res.data.user);
//       localStorage.setItem("user", userDetails);
//       localStorage.setItem("token", res.data.token);

//       toast.success("Login successful! 🎉");

//       setTimeout(() => {
//         setLoading(false);

//         const parsedUser = JSON.parse(userDetails);

//         // ✅ redirect depending on user data
//         if (!parsedUser.language) {
//           navigate("/about");
//         } else {
//           navigate("/dashboard");
//         }
//       }, 800);
//     } catch (err) {
//       setLoading(false);

//       // ✅ show backend validation errors or custom message
//       if (err.response?.data?.errors) {
//         err.response.data.errors.forEach((error) =>
//           toast.error(error.message || "Invalid input")
//         );
//       } else if (err.response?.data?.error) {
//         toast.error(err.response.data.error);
//       } else if (err.response?.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="width flex flex-wrap gap-[60px] items-center justify-center bg-[#0096871b] p-18 rounded-2xl"
//       >
//         <img
//           src={learningImage}
//           alt="Login Illustration"
//           className="w-[400px] hidden md:block"
//         />

//         <div className="max-w-[400px] w-full p-6 bg-white rounded-2xl shadow-md">
//           <img src={Logo} alt="SpeakTribe Logo" className="w-[80px] mb-4" />

//           <motion.h1
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
//             className="font-bold text-3xl text-[#263238] mb-4"
//           >
//             Welcome back!
//           </motion.h1>

//           <p className="text-sm text-gray-600 mb-6">
//             Please enter your email or username and password to continue.
//           </p>

//           <form onSubmit={handleLogin}>
//             <input
//               type="text"
//               name="emailOrUsername"
//               placeholder="Email or Username"
//               value={formData.emailOrUsername} // ✅ fix: linked to correct state
//               onChange={handleChange}
//               className="w-full p-2 mb-4 border rounded-md outline-none border-[#2632381e] placeholder:text-[13px] placeholder:text-[#333]"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 mb-6 border rounded-md outline-none border-[#2632381e] placeholder:text-[13px] placeholder:text-[#333]"
//               required
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#009688] text-white py-2 rounded-md hover:bg-[#00796B] transition"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>

//           <p className="text-sm mt-4 text-center">
//             Don&apos;t have an account?{" "}
//             <Link to="/signup" className="text-[#009688] font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </motion.div>

//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default LoginPage;






import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Logo from "../../assets/speakTribe-logo.png";
import learningImage from "../../assets/undraw_reading-time_gcvc.svg";
import baseUrl from "../../utils/baseUrl";

const LoginPage = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/v1/login`, formData);

      const userDetails = JSON.stringify(res.data.user);
      toast.success("Login successful! 🎉");
      localStorage.setItem("user", userDetails);

      setTimeout(() => {
        setLoading(false);
        const parsedUser = JSON.parse(userDetails);
        parsedUser.language == null
          ? navigate("/about")
          : navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#E0F2F1]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="width flex flex-wrap gap-[60px] items-center justify-center bg-[#0096871b] p-18 rounded-2xl"
      >
        <img
          src={learningImage}
          alt="Login"
          className="w-[400px] hidden md:block"
        />

        <div className="max-w-[400px] w-full p-6 bg-[#ffffffc7] rounded-2xl shadow-md">
          <img src={Logo} alt="SpeakTribe Logo" className="w-[80px] mb-4" />

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
            className="font-bold text-3xl text-[#263238] mb-4"
          >
            Welcome back!
          </motion.h1>

          <p className="text-sm text-gray-600 mb-6">
            Please enter your email and password to continue.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md outline-none border-[#2632381e] placeholder:text-[13px] placeholder:text-[#333]"
              required
            />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-6 border rounded-md outline-none border-[#2632381e] placeholder:text-[13px] placeholder:text-[#333]"
                required
              />
            <button
              type="submit"
              className="w-full bg-[#009688] text-white py-2 rounded-md hover:bg-[#00796B] transition"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#009688] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginPage;