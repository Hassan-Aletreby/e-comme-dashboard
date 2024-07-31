const serverErrorHandler = (
  error,
  message = "Something went wrong , please try again"
) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    return (
      error.response.data.error_description ||
      error.response.data.message ||
      error.response.data.msg ||
      error.response.data.error
    );
  } else if (error.request) {
    // The request was made but no response was received
    if (error.code === "ERR_NETWORK") {
      return "Network error, please check your internet connection.";
    }
    return "No response received from the server.";
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || message;
  }
};

export default serverErrorHandler;
