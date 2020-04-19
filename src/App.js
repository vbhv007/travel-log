import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listAllLogs } from './api';
import LogEntryForm from './logEntryForm';

let STAR = '⭐';

const App = () => {
    const [logs, setLogs] = useState([]);
    const [popup, setPopup] = useState({});
    const [entryLog, setEntryLog] = useState(null);
    const [viewport, setViewport] = useState({
        width:  '100vw',
        height: '100vh',
        latitude:   20.5937,
        longitude:  78.9629,
        zoom:   4
    });

    const getLogs = async () => {
        const logs = await listAllLogs();
        setLogs(logs["logs"]);
    };


    useEffect(() => {
        (async () => {
            const logs = await listAllLogs();
            setLogs(logs["logs"]);
        })();
    }, []);

    const makeMarker = (event) => {
        const [longitude, latitude] = event.lngLat;
        setEntryLog({
            latitude,
            longitude,
        });
    };

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            doubleClickZoom={false}
            onViewportChange={setViewport}
            onDblClick={makeMarker}
        >
            {
                logs.map(log => (
                    <React.Fragment key={log.id}>
                        <Marker
                            latitude={log.latitude}
                            longitude={log.longitude}
                        >
                            <div
                                onClick={() => setPopup({
                                    [log.id]: true
                                })}
                            >
                                <svg
                                    className="marker yellow"
                                    style={{
                                        height: `${6 * viewport.zoom}px`,
                                        width: `${6 * viewport.zoom}px`,
                                    }}
                                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                                >
                                    <g>
                                        <g>
                                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Marker>
                        {
                            popup[log.id] ? (
                                <Popup
                                    latitude={log.latitude}
                                    longitude={log.longitude}
                                    closeButton={true}
                                    closeOnClick={false}
                                    dynamicPosition={true}
                                    onClose={() => setPopup({})}
                                    anchor="top"
                                >
                                    <div className="popup">
                                        <h3>{log.title} {STAR.repeat(log.rating)} </h3>
                                        <p>{log.description}</p>
                                        <small>Visited on: {new Date(log.created_at).toLocaleDateString()}</small>
                                    </div>
                                </Popup>
                            ) : null
                        }
                    </React.Fragment>
                ))
            }
            {
                entryLog ? (
                    <React.Fragment>
                        <Marker
                            latitude={entryLog.latitude}
                            longitude={entryLog.longitude}
                        >
                            <div>
                                <svg
                                    className="marker red"
                                    style={{
                                        height: `${6 * viewport.zoom}px`,
                                        width: `${6 * viewport.zoom}px`,
                                    }}
                                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                                >
                                    <g>
                                        <g>
                                            <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Marker>
                        <Popup
                            latitude={entryLog.latitude}
                            longitude={entryLog.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            dynamicPosition={true}
                            onClose={() => setEntryLog(null)}
                            anchor="top"
                        >
                            <div className="popup">
                                <LogEntryForm onClose={() => {
                                    setEntryLog(null);
                                    getLogs()
                                }} location={entryLog} />
                            </div>
                        </Popup>
                    </React.Fragment>
                ) : null
            }
        </ReactMapGL>
    );
};


export default App;