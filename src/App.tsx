// import React from "react";
import { Routes, Route } from 'react-router-dom';
import WeatherPage from './Pages/WeatherPage';


const App = () => {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<WeatherPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;