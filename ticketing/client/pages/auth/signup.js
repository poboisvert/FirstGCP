const signup = () => {
  return (
    <form action="">
      <h1>Signup</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default signup;
