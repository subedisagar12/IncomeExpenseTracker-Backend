export const SuccessResponse = (res, message, data, other = null) => {
  return res.send({
    status: "success",
    message: message,
    data: data,
    other: other,
  });
};

export const ErrorResponse = (res, message) => {
  return res.send({
    status: "error",
    message: message,
    data: null,
  });
};
