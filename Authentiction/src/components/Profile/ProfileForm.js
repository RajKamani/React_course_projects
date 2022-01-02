import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPass = useRef();
  const auth = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const passchnageHandler = (event) => {
    event.preventDefault();

    const newPassText = newPass.current.value;
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
        console.log(data.idToken);
        if (data.idToken) {
          setSuccess(true);
        }

        if (data.error) {
          alert(data.error.errors[0].message);
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
      </div>
    </form>
  );
};

export default ProfileForm;
