import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingGIF from "../../images/loading.gif";

export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    // setInterval: run a function every x seconds
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //  redirect once count is equal to 0
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
    </div>
  );
}
