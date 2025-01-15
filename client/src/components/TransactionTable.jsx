import React, { useEffect, useState } from "react";
import { useGlobalContextUser } from "../context/UserContext";
import axios from "axios";
import moment from "moment";
import TransactionEditModal from "./TransactionEditModal";
import toast, { Toaster } from "react-hot-toast";

const TransactionTable = () => {
  const {
    authUser,
    setAllTransactions,
    allTransactions,
    loading,
    setLoading,
    setEditModal,
    editModal,
    setTransactionId,
  } = useGlobalContextUser();
  console.log(allTransactions);

  const getAllTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/transaction/getAllTransaction",
        { userId: authUser?.user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAllTransactions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [authUser]);

  const handleEditTransaction = (transactionId) => {
    setEditModal(true);
    setTransactionId(transactionId);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/transaction/${transactionId}`
      );
      toast.success("Transaction Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Transaction");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {editModal && <TransactionEditModal />}
      {loading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-md">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions &&
                allTransactions?.map((transaction, index) => {
                  return (
                    <tr key={transaction._id}>
                      <th>{index + 1}</th>
                      <td>{moment(transaction.date).format("l")}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.reference}</td>
                      <div className="flex gap-2 mt-1">
                        <button
                          className="btn btn-outline btn-warning btn-sm"
                          onClick={() => handleEditTransaction(transaction._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline btn-error btn-sm"
                          onClick={() =>
                            handleDeleteTransaction(transaction._id)
                          }
                        >
                          Delete
                        </button>{" "}
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
