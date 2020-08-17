import React from 'react'
import numeral from 'numeral'
import '../css/Table.css'

const Table = ({countries}) => {
    return (
        <div type='table' className='table'>
                {
                countries.map(({country,cases})=>(
                    <tr key={Math.random()}>
                        <td>{country}</td>
                        <td>
                          <strong>{numeral(cases).format('0,0')}</strong>
                        </td>
                    </tr>

                ))
            }
                
        </div>
    )
}

export default Table
