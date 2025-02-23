import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-management-server-ten-mu.vercel.app",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
