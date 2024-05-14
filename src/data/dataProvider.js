import default_token_generator from "django.contrib.auth.tokens";
import axios from "axios";

export const req = axios.create({
  baseURL: process.env.API_BASE_URL,
  params: {
    format: "json",
  },
});
