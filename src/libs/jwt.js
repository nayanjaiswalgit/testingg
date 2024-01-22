export const encodeData = (data) => {
  const sign = require("jwt-encode");
  const jwtToken = sign(data, "secret");
  console.log("jwtToken", jwtToken);
  localStorage.setItem("jwtToken", jwtToken);
};
