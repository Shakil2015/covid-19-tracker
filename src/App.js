import React,{useState,useEffect} from 'react';
import { FormControl,Select,MenuItem,Card,CardContent,Typography } from '@material-ui/core'
import axios from 'axios'
import Infobox from './Infobox'
import Map from './Map'
import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph'
import './App.css'

function App() {
  const [countries,setCountries] =useState([])
  const [country,setCountry] = useState("worldwide")
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])

  useEffect(()=>{
    axios.get('https://disease.sh/v3/covid-19/all')
          .then(res=>res.data)
          .then(data=>{
            setCountryInfo(data)
          })
  },[])
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
                    const sortedData =sortData(data)
                    setTableData(sortedData)
                    setCountries(countries)
                  })
    }
    getCountryData()
  },[])

  const onChangeCountry = async (e)=>{
    const countryCode = e.target.value
    //console.log('country:',countryCode)
    const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode} `
     await axios.get(url)
                 .then(res=>res.data)
                 .then(data=>{
                  setCountry(countryCode)
                  setCountryInfo(data)

                 })
  }
  
  return (
    <div className="app">
      <div className='app_left'>
        <div className='app_header'>  
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>
            <Select
            variant='outlined'
            
            value={country}
            onChange={onChangeCountry}
            >
              {
                countries.map(country=>(
                <MenuItem value={country.value} key={Math.random()}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='app_status'>
          
          <Infobox title='Coronavirus' cases={countryInfo.todayCases} totalCases={countryInfo.cases}/>
          <Infobox title='Recovered' cases={countryInfo.todayRecovered} totalCases={countryInfo.recovered}/>
          <Infobox title='Deaths' cases={countryInfo.todayDeaths} totalCases={countryInfo.deaths}/>
            
        </div>
        <Map/>
      </div>
      <Card className='app_right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries ={tableData}/>
          <h3>WorldWide new cases</h3>
          <LineGraph/>
        </CardContent>

      </Card>
      
    </div>
  );
}

export default App;
