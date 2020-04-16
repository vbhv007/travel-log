import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
    const [viewport, setViewport] = useState({
        width:  400,
        height: 600,
        latitude:   12.9716,
        longitude:  77.5946,
        zoom:   8
    });

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
        />
    );
}


export default App;