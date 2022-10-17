import React from "react";
import {AdminNavigation} from "../../components/nav/AdminNavigation";
export const AdminDashboard = () => {
  return (
    <>
      <div>
        <>
          <div className="contianer-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNavigation />
              </div>
              <div className="col">Admin Dashboard</div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
