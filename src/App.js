import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listAllLogs } from './api';

const App = () => {
    const [logs, setLogs] = useState([])
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
            setLogs(logs["Logs"]);
        })();
    }, []);

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={setViewport}
        >
            {
                logs.map(log => (
                    <Marker
                        key={log.id}
                        latitude={log.latitude}
                        longitude={log.longitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <div>{log.title}</div>
                    </Marker>
                ))
            }
        </ReactMapGL>
    );
}


export default App;