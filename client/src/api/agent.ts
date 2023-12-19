import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  delete: (url: string, config: object = {}) =>
    axios.delete(url, config).then(responseBody),
};

const Pizza = {
  getPizzaData: () => requests.get("pizza-data"),
  getClientOrders: (userName: string) =>
    requests.get(`get-order-details/${userName}`),
  getPizzaPrice: (values: any) => requests.post("calculate-price", values),
  savePizzaOrder: (values: any) => requests.post("place-order", values),
  deleteUserOrder: (userName: string, id: number) =>
    requests.delete(`delete-order`, { params: { userName, id } }),
};

const agent = {
  Pizza,
};

export default agent;
