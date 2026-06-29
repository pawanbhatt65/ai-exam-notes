import React from "react";
import { useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

const History = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await BaseUrl.get(`/api/notes/getnotes`);
        // console.log(res.data);
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log("History.js > myNotes catch error: ", error.message);
      }
    };
    myNotes();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blur-xl px-8 py-7 items-start flex justify-between md:items-center gap-4 flex-col md:flex-row shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
        {/* left-side */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            ExamNotes AI
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            AI-powered exam oriented notes and revision tool
          </p>
        </div>

        {/* right-sdie */}
        <div className="flex item-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-xl">💠</span>
            <span>{credits}</span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold"
            >
              ➕
            </motion.span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-white text-2xl"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </motion.header>

      {/* sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, dumping: 30 }}
              className="fixed lg:static top-0 left-0 z-5 lg:z-auto w-72 lg:h-[75vh] lg:col-span-1 bg-black/90 lg:bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-5 overflow-y-auto"
            >
              <button>Button</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default History;
