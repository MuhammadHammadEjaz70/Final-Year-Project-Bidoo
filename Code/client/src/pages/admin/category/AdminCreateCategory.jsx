import React, { useState, useEffect } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
  removeCategory,
} from "../../../functions/category.functions";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { CategoryForm } from "../../../components/froms/CategoryForm";
import { SearchFrom } from "../../../components/froms/SearchFrom";

export const AdminCreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // search
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((categories) => setCategories(categories.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`New Category ${res.data.name} created successfully`);
        loadCategories();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
        else {
          toast.error(error.message);
        }
      });
  };
  const handleRemove = async (slug, name) => {
    if (window.confirm(`Are you sure to delete ${name} category`)) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warning(`${res.data.name} category is deleleted`);
          loadCategories();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
          else {
            toast.error(error.message);
          }
        });
    }
  }
    const searched = (search) => (c) => c.name.toLowerCase().includes(search);
  
  return (
    <div className="contianer-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNavigation />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger"> Loading...</h4>
          ) : (
            <h4> Create New Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
          <SearchFrom search={search} setSearch={setSearch}/>
         
          <h5>Existing Categories</h5>
          {categories.filter(searched(search)).map((c) => (
            <div key={c._id} className="alert alert-primary">
              {c.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(c.slug, c.name)}
              >
                <MDBIcon className="text-danger" fas icon="trash" />
              </span>

              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <MDBIcon className="text-warning " far icon="edit" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

