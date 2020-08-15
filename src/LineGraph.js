import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import axios from 'axios'

const options ={
    legend:{
        display:false
    },
    elements:{
        point:{
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:'index',
        intersect:false,
        callbacks:{
            label:(tooltipItem, data)=>{
                return numeral(tooltipItem.value).format('+0.0')

            }
        }
    },
    scales:{
        xAxes:[
            {
                type:'time',
                time:{
                    format:'MM/DD/YY',
                    tooltipFormat:'ll'
                }
            }
        ],
        yAxes:[
            {
                grideline:{
                    display:false
                },
                ticks:{
                    callback:(value,index,values)=>{
                        return numeral(value).format('0a')

                    }
                }
            }
        ]
    }

}

const buildChartData = (data,casesType = 'cases')=>{
    const chartData = []
    let lastDataPoint 
    for(let date in data.cases){
        if(lastDataPoint){
            const newDataPoint = {
                x:date,
                y:data[casesType][date]- lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]      
    }
    return chartData
}
const LineGraph = ({casesType}) => {
    const [data,setData] =useState({})
    useEffect(()=>{ 
             const getData= async()=>{ 
               await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(res=>res.data)
                .then(data=>{
                    const newChartData = buildChartData(data,casesType)
                    setData(newChartData)
                    //console.log('Data:',data)
                })
             }
             getData()
    },[casesType])
    //console.log('Data:',data)
    
    return (
        <div>
            {data?.length>0 &&(
                <Line 
                options={options}
                data={{
                    datasets:[{
                        backgroundColor:'rgba(204,16, 52, 0.5)',
                        borderColor:'#CC1034',
                        data:data
                    }]
                }}
                 />
            )}
            
        </div>
    )
}

export default LineGraph
