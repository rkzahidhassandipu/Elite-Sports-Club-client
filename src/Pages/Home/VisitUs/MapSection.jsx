// components/MapSection.jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Helmet } from "react-helmet-async";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
};

const center = {
  lat: 3.139, // Kuala Lumpur latitude
  lng: 101.6869, // Kuala Lumpur longitude
};

const MapSection = () => {
  return (
    <div className="p-6">
      <Helmet>
        <title>Elite Sports Club | Map</title>
      </Helmet>

      <h2 className="text-2xl font-bold text-white mb-4" data-aos="fade-up">
        📍 Our Location
      </h2>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapSection;
