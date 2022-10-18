import React from "react";

export const CategoryForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>

          <input
            type="text"
            className="form-control col-3"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            autoFocus
            required
          />
          <br />
          <button className="btn  btn-outline-primary">Save</button>
        </div>
      </form>
    </div>
  );
};
