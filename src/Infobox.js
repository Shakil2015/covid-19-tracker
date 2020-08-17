import React from 'react'
import './Infobox.css'
import { Card,CardContent,Typography } from '@material-ui/core'

const Infobox = ({title,cases,totalCases,active,isRed,...props}) => {
  
    return (
        <Card 
        onClick={props.onClick} 
        className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}
        >
            <CardContent>
             <Typography className='infobox_title' color='textSecondary'>{title}</Typography>
             <h2 className={`infobox_cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
             <Typography className='infobox_totalCases' color='textSecondary'>{totalCases} Total</Typography>
            </CardContent>   
        </Card>
    )
}

export default Infobox
