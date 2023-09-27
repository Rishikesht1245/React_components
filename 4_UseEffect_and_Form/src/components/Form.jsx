import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    language: "",
    dob: "",
    country: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    gender: "",
    language: "",
    dob: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    if (!value) {
      return setError((prev) => ({
        ...error,
        [name]: `*${name} is Required`,
      }));
    }
    switch (name) {
      case "name":
        value.length <= 2
          ? setError((prev) => ({
              ...error,
              [name]: "*The entered Name is too short!",
            }))
          : setError((prev) => ({
              ...error,
              [name]: "",
            }));
        break;
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$$/.test(value)) {
          setError((prev) => ({
            ...error,
            [name]: "*Please enter a valid email address.",
          }));
        } else {
          setError((prev) => ({
            ...error,
            [name]: "",
          }));
        }
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  };
  return (
    <form action="" className="form-container" onSubmit={handleSubmit}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <p className="error">{error.name}</p>
      </div>
      <div className="form-item">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <p className="error">{error.email}</p>
      </div>
      <div className="form-item">
        <label htmlFor="gender">Gender</label>
        <input
          id="gender"
          type="radio"
          name="gender"
          value={"male"}
          onChange={handleChange}
        />
        <label htmlFor="gender">Male</label>
        <input
          id="gender"
          type="radio"
          name="gender"
          value={"female"}
          onChange={handleChange}
        />
        <label htmlFor="gender">Female</label>
        <p className="error">{error.gender}</p>
      </div>
      <div className="form-item">
        <label htmlFor="language">Language</label>
        <input
          id="language"
          type="checkbox"
          name="language"
          value={"JavaScript"}
          onChange={handleChange}
        />
        <label htmlFor="language">JavaScript</label>
        <input
          id="language"
          type="checkbox"
          name="language"
          value={"PHP"}
          onChange={handleChange}
        />
        <label htmlFor="language">PHP</label>{" "}
        <input
          id="language"
          type="checkbox"
          name="language"
          value={"Python"}
          onChange={handleChange}
        />
        <label htmlFor="language">Python</label>
        <p className="error">{error.language}</p>
      </div>
      <div className="form-item">
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          name="dob"
          value={form.dob}
          placeholder="Enter your DOB"
          onChange={handleChange}
        />
        <p className="error">{error.dob}</p>
      </div>
      <div className="form-item">
        <label htmlFor="dob">Country</label>
        <select
          name="country"
          id="country"
          onChange={handleChange}
          value={form.country}
        >
          <option value="india">India</option>
          <option value="uae">UAE</option>
          <option value="qatar">Qatar</option>
        </select>
        <p className="error">{error.country}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default Form;
