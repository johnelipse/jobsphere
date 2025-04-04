"use server";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const baseApi = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { baseApi as api };
