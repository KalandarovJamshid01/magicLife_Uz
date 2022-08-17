const { catchErrorAsync } = require("./../utilities/catchError");
const Payme = require("./../models/paymeModel");

const CheckPerformTransaction = (req, res, next) => {

    
};

const CreateTransaction = catchErrorAsync(async (req, res, next) => {});
const PerformTransaction = catchErrorAsync(async (req, res, next) => {});

const CancelTransaction = catchErrorAsync(async (req, res, next) => {});

const CheckTransaction = catchErrorAsync(async (req, res, next) => {});

const GetStatement = catchErrorAsync(async (req, res, next) => {});

const handler = catchErrorAsync(async (req, res, next) => {
  const method = req.body.method;
  switch (method) {
    case "CheckPerformTransaction":
      CheckPerformTransaction();
      break;
    case "CreateTransaction":
      CreateTransaction();
      break;
    case "PerformTransaction":
      PerformTransaction();
      break;
    case "CancelTransaction":
      CancelTransaction();
      break;
    case "CheckTransaction":
      CheckTransaction();
      break;
    case "GetStatement":
      GetStatement();
      break;
  }
});

module.exports = { handler };
