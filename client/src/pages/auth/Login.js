import Jumbotron from "../../components/cards/Jumbotron";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  // state
  const [email, setEmail] = useState("laura@gmail.com");
  const [password, setPassword] = useState("1234567890");
  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    // Prevent the default behavior of the browser to reload the page
    e.preventDefault();

    try {
      //
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // Save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        // Put context
        // spread operator: ...auth
        setAuth({ ...auth, user: data.user, token: data.token });
        toast.success("Login successful.");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" />
      {/* mt-5: margin-top 5 */}
      <div className="container mt-5">
        <div className="row">
          {/* offset: have space */}
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter you password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
