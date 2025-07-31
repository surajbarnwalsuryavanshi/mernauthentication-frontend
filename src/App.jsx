import MyRoutes from "./routes/MyRoutes";

function App() {
  return (
    <>
      <MyRoutes />
      <br />
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Authentication</h1>
        <hr />
        <h2>MERN STACK</h2>
        <hr />
        <p className="lead">
          MERN stack login register system with account activation, login as
          private and protected routes for authenticated users and user's with
          the, role of admin.
        </p>
      </div>
    </>
  );
}

export default App;
