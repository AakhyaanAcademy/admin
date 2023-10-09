import React from "react";
import { Link, useParams } from "react-router-dom";
import Helmet from "react-helmet";

export default function () {
  return (
    <div className="bg-back w-full h-full flex col-span-4">
      <Helmet>
        <title>Page Not Found | Aakhyaan Academy</title>
      </Helmet>
      <div className="m-auto flex flex-col p-10">
        <div className="mx-auto dark:hidden max-w-[250px]">
          <img alt="" src="aakhyaanText.png"></img>
        </div>
        <div className="invisible dark:visible max-w-[250px]">
          <img alt="" src="aakhyaanTextWhite.png"></img>
        </div>
        <span className="font-sans">
          <span className="font-bold">404</span>. That's an error
        </span>
        <span className="mt-5 font-sans">
          The requested URL{" "}
          <strong>
            {window.location.href.replace(process.env.REACT_APP_FRONTEND, "")}&nbsp;
          </strong>
          was not found on this server.
          <span className="font-thin">That’s all we know.</span>
        </span>
        <Link
          to="/"
          className="mt-5 font-sans text-xl hover:underline transition-all text-blue-600"
        >
          Goto Home
        </Link>
      </div>
    </div>
  );
}