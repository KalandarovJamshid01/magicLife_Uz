const AppError = require("./../utilities/AppError");
const User = require("./../models/userModel");
const Code = require("./../models/codeModel");
const jwt = require("jsonwebtoken");
const { catchErrorAsync } = require("./../utilities/catchError");
const Email = require("./../utilities/mail");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 2160000,
  });
};

const saveCodeCookie = (token, res, req) => {
  res.cookie("code", token, {
    maxAge: 60 * 10 * 1000,
    httpOnly: true,
    secure: req.protocol === "https" ? true : false,
  });
};

const sign_up = catchErrorAsync(async (req, res, next) => {
  const randomCode = Math.round(Math.random() * 900000 + 100000);
  let token;
  if (req.body.email) {
    const user = {
      email: req.body.email,
    };
    await new Email(user, randomCode).sendCode();
    const hasEmail = await Code.findOne({ email_or_phone: user.email });
    if (hasEmail) {
      token = createToken(hasEmail._id);
      await Code.findByIdAndUpdate(
        hasEmail._id,
        {
          code: randomCode,
          expired_date: Number(Date.now()) + 600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      const codeSave = await Code.create({
        email_or_phone: user.email,
        code: randomCode,
      });
      token = createToken(codeSave._id);
    }
    saveCodeCookie(token, res, req);
    res.status(200).json({
      status: "succes",
      message: "Jo'natildi",
    });
  }
});

const verify_code = catchErrorAsync(async (req, res, next) => {
  const getCodeEmail = await jwt.verify(
    req.cookies.code,
    process.env.JWT_SECRET
  );

  const user = await Code.findById(getCodeEmail.id);

  if (!user) {
    return next(new AppError("Bunday user mavjud emas"));
  }
  if (!(user.code == req.body.code && user.expired_date > Date.now())) {
    return next(
      new AppError(
        "Usr code xato yoki amal qilish vaqti tugagan qaytadan signup qil"
      )
    );
  }

  await Code.findByIdAndUpdate(
    getCodeEmail.id,
    {
      verified: true,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "succes",
  });
});

const register = catchErrorAsync(async (req, res, next) => {
  const code = await jwt.verify(req.cookies.code, process.env.JWT_SECRET);
  const userEmail = await Code.findById(code.id);
  console.log(userEmail);
  if (!userEmail.verified) {
    return next(new AppError("SIz kodni tasdiqlamagansiz", 404));
  }
  const check = userEmail.email_or_phone.includes("@");
  const user = await User.create({
    account_id: req.body.account_id,
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    photo: req.body.photo,
    phone: check ? "" : userEmail.email_or_phone,
    email: check ? userEmail.email_or_phone : "",
    password: req.body.password,
    password_confirm: req.body.password_confirm,
    phone_active: check ? false : true,
    email_active: check ? true : false,
  });
  res.status(200).json({
    status: "succes",
    data: user,
  });
});
module.exports = { sign_up, verify_code, register };
