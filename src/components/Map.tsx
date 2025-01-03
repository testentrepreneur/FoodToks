import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Restaurant } from '@/types';

interface MapProps {
  restaurants: Restaurant[];
  onMarkerClick: (id: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.006
};

const Map = ({ restaurants, onMarkerClick }: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
        {restaurants.map((restaurant) => (
          <MarkerF
            key={restaurant.id}
            position={{
              lat: restaurant.latitude,
              lng: restaurant.longitude
            }}
            onClick={() => onMarkerClick(restaurant.id)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#1a1a1a',
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#ffffff',
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;