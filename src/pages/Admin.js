import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { AdminProvider } from "../context/AdminProvider";
import Courses from "../components/Admin/Courses/Courses";
import Chapters from "../components/Admin/Courses/Chapters";
import Topic from "../components/Admin/Courses/Topic";
import Index from "../components/Admin/Index";
import Media from "../components/Admin/Media";
import Payment from "../components/Admin/Payment";
import InvalidPage from "./InvalidPage";
import Helmet from "react-helmet";
import Mcqs from "../components/Admin/Mcqs";
import Mcq from "../components/Admin/Mcq";
import Results from "../components/Admin/Results";
import Result from "../components/Admin/Result";

const Admin = () => {
  return (
    <div className="font-sans text-lg h-full w-full grid grid-cols-1 md:grid-cols-5">
      <Helmet>
        <title>Admin | Aakhyaan Academy</title>
      </Helmet>
      <Sidenav />
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/media" element={<Media />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/mcqs" element={<Mcqs />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:id" element={<Result />} />
          <Route path="/mcqs/:id" element={<Mcq />} />
          <Route path="/courses/:courseId/:subjectId" element={<Chapters />} />
          <Route path="/courses/:courseId/:subjectId/:chapterId/:topicId" element={<Topic />} />
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      </AdminProvider>
    </div>
  );
};

const Sidenav = () => (
  <div className="flex flex-col bg-blue-50 px-6 pt-1 relative">
    <SidenavHeader />
    <SidenavMenu />
    <SidenavFooter />
  </div>
);

const SidenavHeader = () => (
  <div className="flex items-center ml-1">
    <div className="select-none md:flex min-w-[100px] max-w-[120px] mb-3 ">
      <img src="/aakhyaanText.png"></img>
    </div>
  </div>
);

const SidenavMenu = () => {
  const location = useLocation()
  const [activePage, setActivePage] = useState("");
  let loc = location.pathname.split('/')
  loc = loc[1]

  useEffect(() => {
    if (loc) setActivePage(loc)
    else setActivePage("dashboard")
  }, [location, setActivePage])

  return (
    <nav className="space-y-2">
      <Link to="/"
        onClick={() => setActivePage('dashboard')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "dashboard"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Dashboard</div>
      </Link>
      <Link to="/courses"
        onClick={() => setActivePage('courses')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "courses"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Courses</div>
      </Link>
      <Link to="/mcqs"
        onClick={() => setActivePage('mcqs')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "mcqs"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Mcqs</div>
      </Link>
      <Link to="/results"
        onClick={() => setActivePage('results')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "results"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Results</div>
      </Link>
      <Link to="/media"
        onClick={() => setActivePage('media')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "media"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Media</div>
      </Link>
      <Link to="/payment"
        onClick={() => setActivePage('payment')}
        className={`flex items-center no-underline p-3 rounded-md ${activePage === "payment"
          ? "bg-green-500"
          : "transition-all hover:cursor-pointer hover:text-blue-800 hover:translate-x-0.5 hover:translate-y-0.5"
          }`}>
        <div className="font-bold pl-3">Payment</div>
      </Link>
    </nav>
  )
}

const SidenavFooter = () => (
  <div className="">
    <a
      className="p-3 pl-6 font-bold flex items-center hover:text-blue-800 "
      href="https://aakhyaan.org">
      Go Home
    </a>
    <p className="md:absolute md:bottom-0 text-center text-gray-500 text-xs mt-2 md:mb-5">
      Aakhyaan © 2022 aakhyaan.org. All Rights Reserved
    </p>
  </div>
);

export default Admin;
