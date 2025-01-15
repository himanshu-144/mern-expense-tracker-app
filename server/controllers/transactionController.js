const Transaction = require("../models/transactionModel")


const addTransaction = async(req, res)=>{

 const {userId, amount, category,type, description, reference, date} = req.body;

 try {
   const transaction = await Transaction.create({
    userId,
    amount, 
    category,
    type,
    description,
    reference,
    date
   })
   return res.status(201).json({
    message: "Transaction Added Successfully",
    transaction,
  });
 } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to Add Transaction",
    });
  }
}

const getAllTransaction=async(req, res)=>{
  const {userId} = req.body
  try {
    const transaction = await Transaction.find({userId});
    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to get all Transaction",
    });
  }
}

const editTransaction=async(req, res)=>{

   const {transactionId} = req.params;
   const {amount, category,type, description, reference, date} = req.body;

   console.log(transactionId);
   
  try {
    await Transaction.findByIdAndUpdate(transactionId,{
    amount, 
    category,
    type,
    description,
    reference,
    date,
    });

    return res.status(200).json("Transaction Updated Successfully")
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Failed to Edit Transaction",
    })
    
  }
}

const deleteTransaction=async(req, res)=>{
  const {transactionId} = req.params;
  try {
    await Transaction.findByIdAndDelete(transactionId);
    return res.status(200).json("Transaction Updated Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Failed to delete Transaction",
    })
    
  }
}

module.exports = {addTransaction, getAllTransaction, editTransaction, deleteTransaction}