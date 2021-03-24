const initPage = ({ color }) => {
  console.log("Client side color is ", color);
  return <h1>Index</h1>;
};

initPage.getInitialProps = () => {
  console.log("I am on the server");

  return { color: "black" };
};

export default initPage;
