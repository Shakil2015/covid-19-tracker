import React from 'react'
import { Map as LeafletMap,TileLayer } from 'react-leaflet'
import '../css/Map.css'
import { showDataOnMap } from '../utils/util'

const Map = ({countries,casesType,center,zoom}) => {
    
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries,casesType)}
            </LeafletMap>
            
        </div>
    )
}

export default Map
