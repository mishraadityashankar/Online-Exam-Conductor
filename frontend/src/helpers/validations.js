export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const validateMobile = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validateExpertise = (subjects) => {
  const re = /^[a-zA-Z0-9\x20]*$/;
  return re.test(subjects);
};
