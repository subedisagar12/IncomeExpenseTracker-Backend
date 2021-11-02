import Transaction from "../models/Transaction.js";
import { SuccessResponse, ErrorResponse } from "../helper/ResponseHelper.js";
import Sequelize from "sequelize";

const Op = Sequelize.Op;
// Create
export const CreateTransaction = async (req, res) => {
  if (req.body.category === "" || !req.body.category) {
    return ErrorResponse(res, "Category cannot be empty");
  }

  if (req.body.amount === 0 || !req.body.amount) {
    return ErrorResponse(res, "Please enter amount");
  }

  try {
    Transaction.create({
      category: req.body.category,
      amount: req.body.amount,
      note: req.body.note,
      date: req.body.date,
      type: req.body.type,
      userId: req.user.id,
    })
      .then((data) => SuccessResponse(res, "Expense  has been added", data))
      .catch((e) => ErrorResponse(res, "Failed to add expense"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

// Read All
export const GetAllTransaction = (req, res) => {
  try {
    if (req.params.from !== "null" && req.params.to !== "null") {
      Transaction.findAll({
        where: {
          userId: req.user.id,
          date: {
            [Op.between]: [req.params.from, req.params.to],
          },
        },
        order: [["date", "DESC"]],
      })
        .then((data) => SuccessResponse(res, "All data fetched", data))
        .catch((e) => ErrorResponse(res, "Failed to fetch category"));
    } else {
      console.log("No Date filter called");

      Transaction.findAll({
        where: {
          userId: req.user.id,
        },
        order: [["date", "DESC"]],
      })
        .then((data) => SuccessResponse(res, "All data fetched", data))
        .catch((e) => ErrorResponse(res, "Failed to fetch category"));
    }
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

// Read All Transaction of category
export const GetAllTransactionByCategory = (req, res) => {
  try {
    Transaction.findAll({
      where: {
        userId: req.user.id,
        categoryId: req.body.categoryId,
      },
    })
      .then((data) => SuccessResponse(res, "All data fetched", data))
      .catch((e) => ErrorResponse(res, "Failed to fetch data"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

// Read Single
export const GetSingleTransaction = (req, res) => {
  try {
    Transaction.findOne({
      where: {
        userId: req.user.id,
        id: req.params.transactionId,
      },
    })
      .then((data) =>
        SuccessResponse(res, "Transaction has been fetched", data)
      )
      .catch((e) => ErrorResponse(res, "Failed to fetch category"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

// Update
export const UpdateTransaction = (req, res) => {
  if (req.body.category === "" || !req.body.category) {
    return ErrorResponse(res, "Category cannot be empty");
  }

  if (req.body.amount === 0 || !req.body.amount) {
    return ErrorResponse(res, "Please enter amount");
  }

  try {
    Transaction.update(req.body, {
      where: {
        id: req.params.transactionId,
      },
    })
      .then((data) =>
        SuccessResponse(res, "Transaction has been updated", data)
      )
      .catch((e) => ErrorResponse(res, "Failed to update transaction"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};

// Delete

export const DeleteTransaction = (req, res) => {
  try {
    Transaction.destroy({
      where: {
        id: req.params.transactionId,
      },
    })
      .then((data) => SuccessResponse(res, "Transactionhas been deleted"))
      .catch((e) => ErrorResponse(res, "Failed to delete transaction"));
  } catch (e) {
    return ErrorResponse(res, e.message);
  }
};
