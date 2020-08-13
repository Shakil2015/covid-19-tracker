import React,{useState,useEffect} from 'react';
import { FormControl,Select,MenuItem } from '@material-ui/core'
import axios from 'axios'
import './App.css'

function App() {
  const [countries,setCountries] =useState([])
  const [country,setCountry] = useState("WorldWide")
  useEffect(()=>{
    const getCountryData = async ()=>{

      await axios.get('https://disease.sh/v3/covid-19/countries')
                  .then(res=> res.data)
                  .then(data=>{
                    const countries = data.map(country=>(
                      {
                        name:country.country,
                        value:country.countryInfo.iso2
                      }

                    ))
                    setCountries(countries)
                  })
    }
    getCountryData()
  },[])
  const onChangeCountry = (e)=>{
    const countryCode = e.target.value
    console.log('country:',countryCode)
    setCountry(countryCode)

  }
  return (
    <div className="App">
      <div className='app_header'>  
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app_dropdown'>
          <Select
          variant='outlined'
          onChange={onChangeCountry}
          value={country}
          >
            {
              countries.map(country=>(
              <MenuItem value={country.value} key={Math.random()}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
