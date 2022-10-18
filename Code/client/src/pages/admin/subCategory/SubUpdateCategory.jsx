import React, { useState, useEffect } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateSubCategory,
  getSubCategory,
} from "../../../functions/subCategory.functions";
import { getAllCategories } from "../../../functions/category.functions";
import { CategoryForm } from "../../../components/froms/CategoryForm";

export const SubUpdateCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  //list of all categoreis
  const [categories, setCategories] = useState([]);
  //selecting the parent category
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);
  const loadCategories = () => {
    getAllCategories().then((categories) => setCategories(categories.data));
  };
  const loadSubCategory = () => {
    getSubCategory(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSubCategory(slug, { name, parentCategory: parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`Category ${res.data.name} updated successfully`);
        navigate("/admin/sub");
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
            <h4> Update Sub Category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              {/* console.log(parent); */}
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
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
        </div>
      </div>
    </div>
  );
};
