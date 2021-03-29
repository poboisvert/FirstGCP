import axios from "axios";

const buildClient = ({ req }) => {
  //Server Side
  if (typeof window === "undefined") {
    return axios.create({
      // baseURL
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // Browser side
    return axios.create({
      baseUrl: "/", // baseUrl
    });
  }
};

export default buildClient;
