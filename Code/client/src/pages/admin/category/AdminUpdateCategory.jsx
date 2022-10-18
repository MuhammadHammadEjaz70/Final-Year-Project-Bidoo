import React, { useState, useEffect } from "react";
import { AdminNavigation } from "../../../components/nav/AdminNavigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  updateCategory,
  getCategory,
} from "../../../functions/category.functions";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryForm } from "../../../components/froms/CategoryForm";

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
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
          {/* Input Field */}
        </div>
      </div>
    </div>
  );
};
