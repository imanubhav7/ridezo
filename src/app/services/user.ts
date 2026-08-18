import axios from "axios";

export const getMe = async () => {
  const { data } = await axios.get("/api/user/me");
  return data;
};
