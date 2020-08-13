import React,{useState} from 'react';
import { FormControl,Select,MenuItem } from '@material-ui/core'
import './App.css'

function App() {
  const [countries,setCountry] =useState(['Bangladesh','Turky','Plastine','Iran'])
  return (
    <div className="App">
      <div className='app_header'>  
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app_dropdown'>
          <Select
          variant='outlined'
          value='abc'
          >
            {
              countries.map(country=>(
              <MenuItem value='WorlWide'>{country}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
