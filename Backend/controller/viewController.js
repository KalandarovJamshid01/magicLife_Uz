const Payme = require("./../models/paymeModel");

const open_kassa = async (req, res, next) => {
  try {
    res.status(200).render("kassa");
  } catch (error) {
    console.log(error);
  }
};

const save_data_kassa = async (req, res, next) => {
  try {
    const amount = req.body.amount;
    const merchant_id = process.env.PAYME_ID;
    const data = await Payme.create({
      amount: amount,
      account: "62f7d36000c721cac80309bd",
    });
    res.status(200).render("payme", {
      data,
      merchant_id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { open_kassa, save_data_kassa };
