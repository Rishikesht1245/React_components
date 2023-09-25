import { useEffect, useState } from "react";

const Title = () => {
  const [toggle, setToggle] = useState(true);

  const handleClick = useEffect(() => {
    const newIntervalId = setInterval(() => setToggle((prev) => !prev), 2000);

    return () => clearInterval(newIntervalId);
  }, []);
  return (
    <>
      {toggle && <h1>This is a title inside setInterval</h1>}
      <button onClick={handleClick}>Toggle</button>
    </>
  );
};
export default Title;
