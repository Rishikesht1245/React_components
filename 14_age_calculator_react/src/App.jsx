
import { useState } from "react"
import arrow from "./assets/icon-arrow.svg"
function App() {

  const [dob, setDob] = useState({
    day : "",
    month : "",
    year: "",
  });

  const [age, setAge] = useState({
    days : "",
    months : "",
    years : "",
  })

  const handleChange = (e) => {
    setDob((prev) => ({...prev , [e.target.name] : e.target.value}))
  } 



  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    console.log(currentDay, dob.day)

    let ageYear = currentMonth < dob.month ? (currentYear - dob.year-1) : currentYear - dob.year;
    let ageMonth = currentMonth < dob.month ? (12 - dob.month + currentMonth) : currentMonth == dob.month ? "0" : currentMonth - dob.month;
    let ageDay = currentDay < dob.day ? (30 - (dob.day - currentDay)) : currentDay == dob.day ? "0" : currentDay - dob.day;

    setAge(() => ({days: ageDay, months : ageMonth, years : ageYear}))
  }

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-gray-100">
      <div className="w-full sm:w-[850px] h-auto bg-white rounded-[20px] rounded-br-[150px] shadow-md">
        {/* content div */}
        <div className="flex flex-col p-20">
          {/* Day month year + button*/}
          <form className="flex flex-col gap-8 justify-start w-full" onSubmit={handleSubmit}>
            {/* Day month year */}
            <div className="flex gap-8 justify-start">

            {/* Day */}
            <div className="flex flex-col gap-3">
              <label className="input-label" htmlFor="#day">DAY</label>
              <input type="number" name="day" max={31} required value={dob.day}  onChange={handleChange}  placeholder="DD"/>
            </div> 
            {/* Month */}
            <div className="flex flex-col gap-3">
              <label className="input-label" htmlFor="#day">MONTH</label>
              <input type="number" name="month" max={12} required value={dob.month} onChange={handleChange} placeholder="MM"/>
            </div>
            {/* Year */}
            <div className="flex flex-col gap-3">
              <label className="input-label" htmlFor="#day">YEAR</label>
              <input type="number" name="year" required value={dob.year} onChange={handleChange} placeholder="YYYY"/>
            </div>
            </div>
            {/* line and button */}
            <div className="flex justify-center items-center w-full">
              <hr className="w-full"/>
              <button className="rounded-full p-7 bg-violet-600">
                  <img src={arrow} alt="arrow" />
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center">
            <h1><span className="input-placeholder">{age.years ? age.years < 10 ? `0${age.years}` : age.years  : "- -"}</span> years</h1>
            <h1><span className="input-placeholder">{age.months ? age.months < 10 ? `0${age.months}` : age.months : "- -"}</span> months</h1>
            <h1><span className="input-placeholder">{age.days ? age.days < 10 ? `0${age.days}` : age.days : "- -"}</span> days</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
