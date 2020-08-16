import React from 'react'
import './Infobox.css'
import { Card,CardContent,Typography } from '@material-ui/core'

const Infobox = ({title,cases,totalCases,active,isRed,...props}) => {
      console.log('value_not_get:',active)
    return (
        <Card 
        onClick={props.onClick} 
        className={`infobox ${active ===2 && "infoBox--red"} ${active ===3 && "infoBox--selected"}${active === 4 && "infoBox--green"}`
            }
        >
            <CardContent>
             <Typography className={`infobox_title ${!isRed && "infobox-cases-green"}`} color='textSecondary'>{title}</Typography>
             <h2 className='infobox_cases'>{cases}</h2>
             <Typography className='infobox_totalCases' color='textSecondary'>{totalCases} Total</Typography>
            </CardContent>   
        </Card>
    )
}

export default Infobox
