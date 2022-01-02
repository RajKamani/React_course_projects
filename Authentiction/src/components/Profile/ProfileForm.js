import { useContext, useRef, useState } from "react";
import { isDOMComponentElement } from "react-dom/cjs/react-dom-test-utils.production.min";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPass = useRef();
  const auth = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [IsError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const passchnageHandler = (event) => {
    event.preventDefault();

    const newPassText = newPass.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCi_fc3V-qahtwki-iDLIAMShwVBJWxs48",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: auth.token,
          password: newPassText,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log(data.idToken);
        if (data.idToken) {
          setSuccess(true);
        }

        if (data.error) {
          setIsError(data.error.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className={classes.form} onSubmit={passchnageHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPass} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
        {success && <h3 style={{ color: "Green" }}>Password updated!</h3>}
        {isLoading && <h3 style={{ color: "Green" }}>Wait...</h3>}
        {IsError && <h3 style={{ color: "RED" }}>{IsError}</h3>}
      </div>
    </form>
  );
};

export default ProfileForm;
