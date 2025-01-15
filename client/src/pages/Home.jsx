import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex items-center justify-center pt-20">
      <div className="flex flex-col gap-10">
        <h2 className="text-5xl">Expense Tracker App</h2>
        <div className="flex gap-2 justify-center">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
