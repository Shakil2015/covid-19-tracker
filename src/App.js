import React,{useState,useEffect} from 'react';
import { FormControl,Select,MenuItem,Card,CardContent,Typography } from '@material-ui/core'
import axios from 'axios'
import Infobox from './Infobox'
import Map from './Map'
import Table from './Table'
import {sortData,prettyPrintState} from './util'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'
import './App.css'

function App() {
  const [countries,setCountries] =useState([])
  const [country,setCountry] = useState("worldwide")
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  const [mapCenter,setMapCenter] = useState({lat:34.80746,lng:-40.4796})
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([])
  const [casesType,setCasesType] = useState('cases')

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
                    setMapCountries(data)
                    setCountries(countries)
                  })
    }
    getCountryData()
  },[])

  const onChangeCountry = async (e)=>{
    const countryCode = e.target.value
       console.log(countryCode)
    const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode} `
     await axios.get(url)
                 .then(res=>res.data)
                 .then(data=>{
                  setCountry(countryCode)
                  setCountryInfo(data)
                  data.countryInfo ? setMapCenter([data.countryInfo.lat,data.countryInfo.long]):setMapCenter({lat:34.80746,lng:-40.4796})
                  setMapZoom(4)

                 })
    
  }
  //console.log('country:',mapCountries)
  return (
    <div className="app">
      <div className='app_left'>
        <div className='app_header'>  
          <h2 className='app_header_h1'>COVID-19 TRACKER</h2>
          <FormControl className='app_dropdown'>
            <Select
            variant='outlined'
            
            value={country}
            onChange={onChangeCountry}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country=>(
                <MenuItem value={country.value} key={Math.random()}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className='app_status'>
          
          <Infobox 
            
            active= {casesType === 'cases'}
            onClick={e=>setCasesType('cases')} 
            isRed
            title='Coronavirus' 
            cases={prettyPrintState(countryInfo.todayCases)} 
            totalCases={prettyPrintState(countryInfo.cases)}
          />
          <Infobox 
            active= {casesType === 'recovered'}
            onClick={e=>setCasesType('recovered')} 
            title='Recovered' 
            cases={prettyPrintState(countryInfo.todayRecovered)} 
            totalCases={prettyPrintState(countryInfo.recovered)}
          />
          <Infobox 

            active= {casesType === 'deaths'}
            onClick={e=>setCasesType('deaths')} 
            title='Deaths' 
            isRed
            cases={prettyPrintState(countryInfo.todayDeaths)} 
            totalCases={prettyPrintState(countryInfo.deaths)}
          />
            
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className='app_right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries ={tableData}/>
            <h3>WorldWide new {casesType}</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>

      </Card>
      
    </div>
  );
}

export default App;
