import React, { Fragment } from "react";
import { motion } from "motion/react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BaseUrl } from "../BaseUrl";
import { setUserData } from "../redux/userSlice";

const Footer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // signout function
  const handleSignout = async () => {
    // console.log("clicked")
    try {
      await BaseUrl.get(`/api/auth/logout`);
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log("handleSignout catch error: ", error);
    }
  };

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
        className="z-10 mx-6 mb-6 mt-24 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 px-8 py-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* left-div */}
          <motion.div
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="flex flex-col gap-4 transform-gpu"
            style={{ transform: "preserve-3d" }}
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              style={{ transform: "translateZ(20px)" }}
            >
              <img src={Logo} alt="Logo" className="h9 w-9 object-contain" />
              <span
                className="text-lg font-semibold bg-gradient-to-br from-white via-gray-300 to-white bg-clip-text text-transparent"
                style={{ textShadow: "0 6px 10px rgba(0,0,0,0.4)" }}
              >
                ExamNotes <span className="text-gray-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-sm">
              ExamNotes AI helps students generate exam-focused notes, revision
              material, diagrams, and printable PDF's using AI.
            </p>
          </motion.div>

          {/* center-div */}
          <div className="text-center">
            <h1 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h1>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => navigate("/notes")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Notes
              </li>
              <li
                onClick={() => navigate("/history")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                History
              </li>
              <li
                onClick={() => navigate("/pricing")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Add Credits
              </li>
            </ul>
          </div>

          {/* right-div */}
          <div className="text-center">
            <h1 className="text-sm font-semibold text-white mb-4">
              Support & Account
            </h1>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => navigate("/auth")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                SignIn
              </li>
              <li
                onClick={handleSignout}
                className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                SignOut
              </li>
              <li className="text-gray-300 hover:text-white transition-colors">
                support@examnotes.com
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="my-6 h-px bg-white/10"></div>

        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ExamNotes AI. All rights reserved.
        </p>
      </motion.div>
    </Fragment>
  );
};

export default Footer;
