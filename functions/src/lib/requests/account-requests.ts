import joi from "joi";

const AccountSignup = joi.object({
  username: joi.string().email().trim().required(),
  password: joi
    .string()
    .trim()
    .pattern(/^[A-Z]/, "Password should start with a capital letter")
    .pattern(
      /(?=.*\d)/,
      "Password should contain atleast contain 1 numeric value"
    )
    .pattern(
      /(?=.*[@#$!%*?&])/,
      "Password should atleast contain 1 special character"
    )
    .pattern(/[A-Za-z\d@$!%*?&]{7,}/, "Password should be 8 characters length")
    .required(),
});

export const SignupRequest = {
  body: joi.object({
    firstname: joi.string().trim().required(),
    lastname: joi.string().trim().required(),
    middlenme: joi.string().trim().optional(),
    address: joi.string().trim().required(),
    photoUrl: joi.string().trim().optional(),
    account: AccountSignup,
  }),
};
