import React from 'react'

const Results = ({countries, funktio}) => {
    if (countries.length>10){
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
    if (countries.length===1){
      return(
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(countries[0].languages).map(language => 
              <li key={language}>{language}</li>)}
          </ul>
          <img src={countries[0].flags.svg} style={{width: '150px'}} alt="flag"/>
        </div>
      )
    }
    return (
      <div>
        {countries.map(country => 
          <p key={country.name.common}>{country.name.common}
          <button onClick={()=>funktio(country.name.common)}>show</button></p>)}
      </div>
    )
}
export default Results