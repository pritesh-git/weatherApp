import React, { useState } from 'react'
import Form from './components/Form'
import Titles from './components/Titles'
import Weather from './components/Weather'
const API_KEY = require('./configData')

function App() {
  const [state, setState] = useState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  })
  const getWeather = async e => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const generatedWeatherURL =
      city && country
        ? `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
        : city
          ? `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          : country
            ? `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}&units=metric`
            : alert('City or Country must be provided')

    const api_call = await fetch(generatedWeatherURL)
    console.log('api_call', api_call)
    const data = await api_call.json()
    console.log('data', data)
    if ((city || country) && api_call.ok) {
      setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
      })
    } else if (!api_call.ok) {
      setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: data.message,
      })
    } else {
      setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the values.',
      })
    }
  }
  return (
    <div className="main">
      <div className="title-container">
        <Titles />
      </div>
      <div className="form-container">
        <Form getWeather={getWeather} />
        <Weather
          temperature={state?.temperature}
          humidity={state?.humidity}
          city={state?.city}
          country={state?.country}
          description={state?.description}
          error={state?.error}
        />
      </div>
    </div>
  )
}

export default App
