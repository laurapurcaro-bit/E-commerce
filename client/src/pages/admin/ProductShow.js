import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminShowProducts() {
  // context
  const [auth] = useAuth();
  //  hook
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.firstName}`}
        subTitle="Admin Dashboard"
      />
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Products</div>
            {products?.map((p) => (
              <Link key={p._id} to={`update/${p.slug}`}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        className="img img-fluid rounded-start"
                        // Make sure all images are the same size
                        style={{
                          float: "left",
                          width: "150px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
