import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "src/pages/join/landing.tsx";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
