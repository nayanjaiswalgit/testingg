import axios from "axios";

const getFeedback = async (search) => {
  console.log(search);
  const jwtToken = localStorage.getItem("jwtToken");
  try {
    const response = await axios.get(
      `/api/hiring/feedback/?interview__candidate=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${jwtToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // rethrow the error to handle it in the component
  }
};

export default getFeedback;
