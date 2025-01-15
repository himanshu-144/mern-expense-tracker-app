import {
  Dialog,
  DialogBody,
  DialogHeader,
  Option,
} from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useGlobalContextUser } from "../context/UserContext";

const TransactionModal = () => {
  
  const {
    loading,
    setLoading,
    authUser,
    transactions,
    setTransactions,
    open,
    handleOpen,
  } = useGlobalContextUser();
  const handleChange = (e) => {
    setTransactions({ ...transactions, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const transactionData = {
        userId: authUser?.user._id,
        amount: transactions.amount,
        type: transactions.type,
        category: transactions.category,
        reference: transactions.reference,
        description: transactions.description,
        date: transactions.date,
      };
      await axios.post(
        "http://localhost:8000/api/v1/transaction",
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Transaction Added Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Transaction");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Dialog
        open={open}
        handler={handleOpen}
        className="flex flex-col items-center"
      >
        <DialogHeader>Add Transaction</DialogHeader>
        <DialogBody>
          <form
            className="p-3 md:p-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-72 flex flex-col gap-3">
              <input
                placeholder="Amount"
                type="text"
                required
                name="amount"
                value={transactions.amount}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />

              <select
                name="type"
                required
                value={transactions.type}
                onChange={(e) => handleChange(e)}
                className="select select-bordered w-full max-w-xs"
              >
                <option selected>Select Type</option>

                <option value="income">Income</option>
                <option value="expense">Expense </option>
              </select>

              <select
                size="lg"
                required
                name="category"
                value={transactions.category}
                onChange={(e) => handleChange(e)}
                className="select select-bordered w-full max-w-xs"
              >
                <option selected>Select Category</option>
                <option value="salary">Salary</option>
                <option value="project">Project</option>
                <option value="food">Food</option>
                <option value="movie">Movie</option>
              </select>

              <input
                placeholder="Reference"
                type="text"
                value={transactions.reference}
                name="reference"
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />

              <input
                placeholder="Description"
                type="text"
                required
                name="description"
                value={transactions.description}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />

              <input
                placeholder="Date"
                name="date"
                type="date"
                value={transactions.date}
                onChange={(e) => handleChange(e)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <button
              type="submit"
              className="btn btn-active btn-accent my-2 text-white"
              onClick={handleOpen}
            >
              {loading ? (
                <span className="loading loading-bars loading-sm"></span>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default TransactionModal;
