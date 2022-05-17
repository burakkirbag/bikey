const validationRules = {
  username: [
    {
      required: true,
      message: "Please enter your username.\n",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter your password.\n",
    },
  ],
};

export default validationRules;
