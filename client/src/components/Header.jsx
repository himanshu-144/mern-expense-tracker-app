import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContextUser } from "../context/UserContext";

const Header = () => {
  const { authUser } = useGlobalContextUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLoginInfo");
    navigate("/");
  };

  return (
    <div className="h-[71px] w-full flex items-center justify-between bg-blue-300 p-3">
      <span className="text-3xl text-white font-semibold">Expense Tracker</span>
      <div className="flex items-center gap-4">
        {!authUser?.user?.name ? (
          ""
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{authUser?.user?.name.slice(0,3)}</span>
            </div>
          </div>
        )}
        <button className="btn btn-active btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
