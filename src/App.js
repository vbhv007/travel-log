import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import { listAllLogs } from './api';

const App = () => {
    const [viewport, setViewport] = useState({
        width:  '100vw',
        height: '100vh',
        latitude:   20.5937,
        longitude:  78.9629,
        zoom:   4
    });

    useEffect(() => {
        (async () => {
            const logs = await listAllLogs();
            console.log(logs);
        })();
    }, []);

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
        />
    );
}


export default App;