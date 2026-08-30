import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://us-central1-nft-cloud-functions.cloudfunctions.net",
  timeout: 10000,
});

export default apiClient;
