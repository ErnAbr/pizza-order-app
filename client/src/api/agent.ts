import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/pizza/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
};

const Pizza = {
  getPizzaData: () => requests.get("pizza-data"),
  getPizzaPrice: (values: any) => requests.post("calculate-price", values),
};

const agent = {
  Pizza,
};

export default agent;
