import { lazy, Suspense } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AboutComponent = lazy(() => import("./About"));

const SuspenseFallback = <div>Loading...</div>;

export const Suspenses = () => {
  return (
    <div className="text-center bg-gray-900 text-gray-100 w-screen h-screen p-20">
      <Router>
        <Routes>
          {/* Wrap each Route with Suspense */}
          <Route
            path="/"
            element={
              <Suspense fallback={SuspenseFallback}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AboutComponent />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
