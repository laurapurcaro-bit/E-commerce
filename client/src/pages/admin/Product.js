import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct() {
  // context
  const [auth] = useAuth();

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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>
            <p>Create product from..</p>
          </div>
        </div>
      </div>
    </>
  );
}
