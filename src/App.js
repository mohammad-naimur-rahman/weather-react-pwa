import React, { useState } from 'react'
import { fetchWeather } from './api/fetchWeather'
import './App.css'
import { useInstallPWA } from './hooks/useInstallPWA'

const App = () => {
  const [query, setquery] = useState('')
  const [weatherData, setweatherData] = useState({})

  const [supportsPWA, installPWA] = useInstallPWA()

  const onEnterSearch = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query)
      setweatherData(data)
      setquery('')
    }
  }

  return (
    <div className="main-container">
      <h1 style={{ color: '#fff' }}>Search Weather</h1>
      {supportsPWA && (
        <p onClick={installPWA} style={{ color: '#fff', cursor: 'pointer' }}>
          Install Application
        </p>
      )}
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setquery(e.target.value)}
        onKeyPress={onEnterSearch}
      />
      {weatherData.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weatherData.name}</span>
            <sup>{weatherData.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weatherData.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="city-icon"
            />
            <p>{weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
