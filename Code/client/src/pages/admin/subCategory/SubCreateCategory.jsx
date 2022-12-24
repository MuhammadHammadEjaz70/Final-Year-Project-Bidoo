import React, { useState, useEffect } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSubCategory,
  removeSubCategory,
  getAllSubCategories,
} from "../../../functions/subCategory.functions";
import { getAllCategories } from "../../../functions/category.functions";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { CategoryForm } from "../../../components/froms/CategoryForm";
import  SearchFrom  from "../../../components/froms/SearchFrom";

export const SubCreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  //list of all categoreis
  const [categories, setCategories] = useState([]);
  //selecting the parent category
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  // search
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((categories) => setCategories(categories.data));
  };
  const loadSubCategories = () => {
    getAllSubCategories().then((s) => setSubCategory(s.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSubCategory({ name, parentCategory: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`New Category ${res.data.name} created successfully`);
        loadSubCategories();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response.status === 400) toast.error("Admin SubCategory Create",error.response.data);
        else {
          toast.error(error.message);
        }
      });
  };
  const handleRemove = async (slug, name) => {
    if (window.confirm(`Are you sure to delete ${name} category`)) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warning(`${res.data.name} sub-category is deleleted`);
          loadSubCategories();
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
  };
  const searched = (search) => (c) => c.name.toLowerCase().includes(search);
  // const specificSearchedSubs = (subCategory) => (s) =>
  //   s._id.includes(subCategory);

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
            <h4> Create Sub Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Click to Select Parent Category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
          <SearchFrom search={search} setSearch={setSearch} />

          <h5>Existing Sub Categories</h5>
          {subCategory.filter(searched(search)).map((s) => (
            <div key={s._id} className="alert alert-primary">
              {s.name}
              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(s.slug, s.name)}
              >
                <MDBIcon className="text-danger" fas icon="trash" />
              </span>

              <Link to={`/admin/sub-category/${s.slug}`}>
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
