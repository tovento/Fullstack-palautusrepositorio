import React, { useState, useEffect } from "react";
import axios from 'axios'
import Form from './components/Form'
import Results from './components/Results'

const App = () => {
  const [countryInfo, setCountryInfo] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryInfo(response.data)
      })
  }, [])

  const handleTyping = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const countriesToShow = (search) => {
    return (
      countryInfo.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      ))
  }

  const handleButton = (name) => {
    setSearch(name)
  }

  return ( 
    <div>
      <Form value={search} onChange={handleTyping} />
      <Results countries={countriesToShow(search)} funktio={handleButton} />
    </div>
  )
}
export default App;