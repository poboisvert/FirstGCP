import axios from "axios";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  console.log(req.headers); // cookie for the session will be displayed
  // const response = await axios.get('/api/users/currentuser');
  // k get services -n ingress-nginx
  // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
  // return response.data;
  console.log("Running Index");

  if (typeof windows === "undefined") {
    // Server Side - Request to forward to Ingress NGINX
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // Browser side
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};

export default LandingPage;
