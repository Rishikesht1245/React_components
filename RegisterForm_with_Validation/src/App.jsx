import { useState } from "react";
import TextInput from "./components/textInputs/TextInput";
import RadioInput from "./components/radioInputs/RadioInput";
import SelectInput from "./components/selectInputs/SelectInput";

import "./App.css";

function App() {
  // state for form fieldss
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    country: "",
    skills: [],
  });

  // state for errors
  const [error, setError] = useState({
    name: false,
    email: false,
    gender: false,
    dob: false,
    country: false,
    skills: false,
  });

  // function to validate the fields
  const isValidInputs = () => {
    console.log(formFields);
    let error = {
      name: false,
      email: false,
      gender: false,
      dob: false,
      country: false,
      skills: false,
    };
    // empty validation need to check for all inputs so don't use else if
    if (formFields.name === "") {
      error.name = true;
    }
    if (formFields.email === "") {
      error.email = true;
    }
    if (formFields.gender === "") {
      error.gender = true;
    }
    if (formFields.dob === "") {
      error.dob = true;
    }
    if (formFields.country === "") {
      error.country = true;
    }
    if (formFields.skills.length === 0) {
      error.skills = true;
    }

    // .some returns true or false
    if (Object.values(error).some((item) => item === true)) {
      setError(error);
      // if any of the field is not valid return false
      return false;
    }
    return true;
  };

  // function to handle submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidInputs()) {
      console.log("From is Valid");
      console.log(formFields);
    } else {
      console.log("Invalid Form");
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    let err = false;

    if ((name === "name" && value === "") || value.length < 3) {
      err = true;
    } else if (name === "email" && (value === "" || !isValidEmail(value))) {
      err = true;
    } else if (name === "dob" && value === "") {
      err = true;
    } else if (name === "country" && value === "") {
      err = true;
    }

    setError((prev) => ({ ...prev, [name]: err }));
  };

  // Function to validate email using a regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // function to handle normal inputs other than check boxes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
    handleBlur(event);
  };

  // function to handle check boxes
  const handleCheckBoxChange = (event) => {
    let updatedSkills = [...formFields.skills];
    const { name, value, checked } = event.target;
    if (checked) {
      updatedSkills.push(value);
    } else {
      updatedSkills = updatedSkills.filter((item) => item !== value);
    }
    setFormFields((prev) => ({ ...prev, [name]: updatedSkills }));
    handleBlur(event);
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Registration Form</h1>
        <p className="caption">Please fill the form to register with us.</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <TextInput
            name="name"
            type={"text"}
            text={"Name"}
            placeholder="Enter Your Name"
            handleChange={handleChange}
            error={error}
            handleBlur={handleBlur}
          />
          <TextInput
            name="email"
            type={"email"}
            text={"Email"}
            placeholder="Enter Your Email"
            handleChange={handleChange}
            error={error}
            handleBlur={handleBlur}
          />
          <TextInput
            name="dob"
            type={"date"}
            text={"Date of Birth"}
            placeholder="Enter Your Email"
            handleChange={handleChange}
            error={error}
            handleBlur={handleBlur}
          />

          <SelectInput
            name="country"
            text="Country"
            options={["UAE", "India", "Qatar"]}
            handleChange={handleChange}
            error={error}
            handleBlur={handleBlur}
          />

          <RadioInput
            name="gender"
            type={"radio"}
            text={"Gender"}
            inputs={["Male", "Female"]}
            handleChange={handleChange}
            error={error}
          />
          <RadioInput
            name="skills"
            text={"Skills"}
            type="checkbox"
            inputs={["JavaScript", "React", "CSS", "HTML"]}
            handleChange={handleCheckBoxChange}
            error={error}
          />
          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
