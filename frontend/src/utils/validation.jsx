export const validateLoginData = (email, password) => {
  if (email === "") return "Email is required";
  if (password === "") return "Password is required";

  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );

  const isPasswordVlaid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordVlaid) return "Password is not valid";

  return null;
};

export const validateSignUpData = (firstName, lastName, email, password) => {
  if (firstName === "") return "First Name is required";
  if (lastName === "") return "Last Name is required";

  if (email === "") return "Email is required";
  if (password === "") return "Password is required";

  const isFirstNameValid = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(firstName);
  const isLastNameValid = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(lastName);

  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );

  const isPasswordVlaid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isFirstNameValid) return "First Name is not valid";
  if (!isLastNameValid) return "Last Name is not valid";
  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordVlaid) return "Password is not valid";

  return null;
};
