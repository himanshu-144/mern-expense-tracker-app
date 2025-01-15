import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import TransactionModal from "../components/TransactionModal";
import TransactionTable from "../components/TransactionTable";
import Analytics from "../components/Analytics";
import { useGlobalContextUser } from "../context/UserContext";

const DashBoard = () => {
  const { handleOpen } =
    useGlobalContextUser();

  return (
    <div className="h-full w-full flex flex-col p-2">
      <div className="flex items-center shadow-lg p-4">
        <Button onClick={handleOpen} variant="gradient">
          Add New
        </Button>

        <TransactionModal />
      </div>
      
      <div>
        <TransactionTable />
      </div>

      <div>
        <Analytics />
      </div>
    </div>
  );
};

export default DashBoard;
