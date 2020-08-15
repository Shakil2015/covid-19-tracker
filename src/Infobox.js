import React from 'react'
import './Infobox.css'
import { Card,CardContent,Typography } from '@material-ui/core'

const Infobox = ({title,cases,totalCases,...props}) => {
    return (
        <Card onClick={props.onClick} className='infobox'>
            <CardContent>
             <Typography className='infobox_title' color='textSecondary'>{title}</Typography>
             <h2 className='infobox_cases'>{cases}</h2>
             <Typography className='infobox_totalCases' color='textSecondary'>{totalCases} Total</Typography>
            </CardContent>   
        </Card>
    )
}

export default Infobox
