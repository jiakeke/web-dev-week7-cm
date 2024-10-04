import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const address = useField("text");
  const profile_picture = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      username: username.value,
      password: password.value,
      name: name.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
      address: address.value,
      profile_picture: profile_picture.value,
    });
    if (!error) {
      console.log("success");
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="create">
        <h2>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input {...name} />
          <label>UserName:</label>
          <input {...username} />
          <label>Password:</label>
          <input {...password} />
          <label>Phone Number:</label>
          <input {...phoneNumber} />
          <label>Gender:</label>
          <input {...gender} />
          <label>Date of Birth:</label>
          <input {...dateOfBirth} />
          <label>Membership Status:</label>
          <input {...membershipStatus} />
          <label>Address:</label>
          <input {...address} />
          <label>Profile Picture:</label>
          <input {...profile_picture} />
          <button>Sign up</button>
        </form>
      </div>
    );
  }
};

export default Signup;
