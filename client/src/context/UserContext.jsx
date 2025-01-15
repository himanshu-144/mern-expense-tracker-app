import React, { createContext, useContext, useEffect, useState } from "react";

const CreateUserContext = createContext();

const UserContext = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("userLoginInfo")) || null
  );
  // console.log(authUser);
  const [allTransactions, setAllTransactions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState({
    amount: "",
    type: "",
    category: "",
    reference: "",
    description: "",
    date: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleEditOpen = () => setEditModal(!editModal);
  const [editModal, setEditModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  return (
    <CreateUserContext.Provider
      value={{
        authUser,
        setAllTransactions,
        allTransactions,
        loading,
        setLoading,
        editModal,
        setEditModal,
        transactions,
        setTransactions,
        open,
        setOpen,
        handleOpen,
        handleEditOpen,
        transactionId,
        setTransactionId,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};

export default UserContext;

export const useGlobalContextUser = () => {
  return useContext(CreateUserContext);
};
