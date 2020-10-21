import axios from "axios";
import { getCognitoIdToken } from "../lib/cognito";
import { NotFoundError, NetworkError, PermissionError } from "../lib/errors";

export const handleErrors = (e: any): never => {
  if (!!e.isAxiosError && !e.response) {
    throw new NetworkError();
  }

  switch (e.response.status) {
    case 401:
      throw new PermissionError();
    case 404:
      throw new NotFoundError();
    default:
      throw e;
  }
};

export const getHttpClient = async () => {
  const token = await getCognitoIdToken();
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { Authorization: token },
  });
};
