import React, { useState, useEffect } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  updateCategory,
  getCategory,
} from "../../../functions/category.functions";
import { useNavigate, useParams } from "react-router-dom";

export const AdminUpdateCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params);
    singleCategory();
  }, []);

  const singleCategory = () => {
    getCategory(slug).then((c) => setName(c.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(` ${res.data.name} updated successfully`);
        navigate("/admin/category");
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

  const updateCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Category New Name</label>

        <input
          type="text"
          className="form-control col-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button className="btn  btn-outline-primary">Save</button>
      </div>
    </form>
  );
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
            <h4> Update Category</h4>
          )}
          {updateCategoryForm()}
          <hr />
        </div>
      </div>
    </div>
  );
};
