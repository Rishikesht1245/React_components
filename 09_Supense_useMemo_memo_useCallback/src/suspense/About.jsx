import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>This is the about page content.</p>
      <Link to={"/"}>Go To Home</Link>
    </div>
  );
};

export default About;
