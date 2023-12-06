import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/pizza/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
};

const Pizza = {
  getPizzaData: () => requests.get("pizza-data"),
};

const agent = {
  Pizza,
};

export default agent;
