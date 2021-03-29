import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  //console.log(currentUser);
  // axios.get('/api/users/currentuser');

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  //console.log("LANDING"); // Is now disable by _app
  //console.log(req.headers); // cookie for the session will be displayed
  // const response = await axios.get('/api/users/currentuser');
  // k get services -n ingress-nginx
  // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
  // return response.data;
  console.log("Running Index");

  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
