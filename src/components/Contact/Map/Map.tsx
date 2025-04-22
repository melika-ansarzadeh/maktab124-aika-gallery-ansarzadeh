'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
const bazarTehranCoords: LatLngExpression = [35.6785, 51.4174];



export default function Map() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  }, []);

  return (
    <div className="h-[400px] rounded-2xl px-64 overflow-hidden">
      <MapContainer
        center={bazarTehranCoords}
        zoom={17}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={bazarTehranCoords}>
          <Popup>پاساژ دلگشا</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
