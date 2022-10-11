import React, { useState } from "react";
import UserNavigation from "../../components/nav/UserNavigation";
import { getAuth, updatePassword } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  //   const newPassword = getASecureRandomPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword === confirmPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          setLoading(false);
          setNewPassword(" ");
          setConfirmPassword(" ");
          toast.success("Password updated successfully");
          navigate("/user/history");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } else {
      setLoading(false);
      toast.error("Password dose not match");
    }
    return;
  };

  const passwordUpdateForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            disabled={loading}
            defaultValue={newPassword}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confrimPassword">
          <Form.Label>Confrim Password</Form.Label>
          <Form.Control
            disabled={loading}
            defaultValue={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!(newPassword && confirmPassword) || loading}
        >
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNavigation />
          </div>
          <div className="col">
            {loading ? (
              <h3 className="text-danger">Loading...</h3>
            ) : (
              <h3>Update Password</h3>
            )}

            {passwordUpdateForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
