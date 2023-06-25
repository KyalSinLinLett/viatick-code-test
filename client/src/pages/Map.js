import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
    const { id: mp4FileId } = useParams();
    const [gpsRecords, setGpsRecords] = useState([]);
    const center = [0, 0]; // Default center of the map
    const zoom = 5; // Default zoom level

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .post("http://localhost:4000/gps", { mp4FileId: mp4FileId })
                    .then((res) => {
                        console.log(res.data.data);
                        setGpsRecords(res.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [mp4FileId]);

    const customIcon = new Icon({
        iconUrl: require("../icons8-location-40.png"),
        iconSize: [38, 38],
    });

    return (
        <div className="leaflet-container">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "80vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {gpsRecords.map(({ lat, lon }, index) => (
                    <Marker
                        position={[lat, lon]}
                        key={index}
                        icon={customIcon}
                    />
                ))}
            </MapContainer>
        </div>
    );
};
