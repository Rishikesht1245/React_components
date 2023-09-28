import { useContext, useState } from "react";
import { Button } from "./subcomponents/Button";
import { Input } from "./subcomponents/input";
import { AuthContext } from "../context/AuthContext";

export const Form = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [validationError, setValidationError] = useState(false);

  //accessing store
  const { auth, dispatch } = useContext(AuthContext);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (value) setError((prev) => ({ ...prev, [name]: false }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;
    if (email === "") setError((prev) => ({ ...prev, email: true }));
    if (password === "")
      return setError((prev) => ({ ...prev, password: true }));

    if (email === "test" && password === "test") {
      setValidationError(false);
      return dispatch({ type: "login" });
    }
    setValidationError(true);
  };

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 rounded-[5px] shadow-md shadow-gray-500 text-white max-w-md sm:w-[600px] w-full  bg-black p-10"
      >
        <h2 className="text-center text-[32px] font-[700]">Sign In</h2>
        {validationError && (
          <span className="border border-red-600 text-red-500 rounded-[5px] text-center p-2">
            Invalid Credentials
          </span>
        )}
        <Input
          type="text"
          placeholder="Email or phone number"
          value={form.email}
          error={error.email}
          handleChange={handleChange}
          name="email"
        />
        <Input
          type="text"
          placeholder="Password"
          value={form.password}
          error={error.password}
          handleChange={handleChange}
          name="password"
        />

        <Button
          type="submit"
          text={"Sign In"}
          className={"bg-red-600 p-2 hover:bg-red-500"}
        />
        <a
          href="/"
          className="text-right text-[12px] mt-[-20px] text-gray-400 px-1 hover:text-white"
        >
          Forgot Password ?
        </a>
        <p className="text-center text-[12px] text-gray-400 px-1">
          New to MovieApp?{" "}
          <a href="/" className="hover:text-white">
            Sign up now
          </a>
        </p>
      </form>
    </div>
  );
};
