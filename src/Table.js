import React from 'react'
import './Table.css'

const Table = ({countries}) => {
    return (
        <div type='table' className='table'>
                {
                countries.map(({country,cases})=>(
                    <tr key={Math.random()}>
                        <td>{country}</td>
                        <td>
                          <strong>{cases}</strong>
                        </td>
                    </tr>

                ))
            }
                
        </div>
    )
}

export default Table
