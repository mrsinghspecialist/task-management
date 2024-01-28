import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        fontSize: "xx-large",
        height: "90vh",
        textAlign: "center",
        alignItems: "center",
        width: "500px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        You're not authorized to view the page.
        <br></br>
        <Link to="/" style={{ marginTop: "20px" }}>
          Visit Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
