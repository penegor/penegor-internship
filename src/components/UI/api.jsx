import React from "react";
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections',
    timeout: 10000
});

export default api;