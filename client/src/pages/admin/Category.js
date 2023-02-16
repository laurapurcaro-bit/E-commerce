import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import CategoryForm from "../../components/forms/CategoryForms";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategory() {
  // context
  const [auth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name: name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // Show the newly created category
        loadCategory();
        toast.success(`Category ${data.name} created`);
        setName("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />
            <div className="col">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  className="btn btn-outline-primary m-3"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
