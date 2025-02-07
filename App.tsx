import React from 'react';
import { Linking, Platform } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import MapView, {Circle, Marker, Polygon, Polyline} from 'react-native-maps';
import { Text, View } from 'react-native';
import { styles } from './styles';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

const BH_CENTER = {
  latitude: -19.922731,
  longitude: -43.945094,
};

const coordinates = [
  { latitude: -19.922731, longitude: -43.945094 }, // Praça Sete (Ponto central)
  { latitude: -19.918383, longitude: -43.938919 }, // Mercado Central
  { latitude: -19.921399, longitude: -43.937744 }, // Palácio das Artes
  { latitude: -19.924739, longitude: -43.936502 }, // Edifício Maletta
  { latitude: -19.922731, longitude: -43.945094 }, // Retorno ao ponto inicial (Praça Sete)
  
];
const destinationDate = {
  "coords": {
    "accuracy": 4.348532508071283,
    "altitude": 860.3961109733209,
    "altitudeAccuracy": 21.612985000444276,
    "heading": -1,
    "latitude": -19.917,
    "longitude": -43.933,
    "speed": 0
  },
  "timestamp": 1738947761666.3015
}

export default function App(): JSX.Element {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null); 
  const [destination, setDestination] = useState<LocationObject | null>(destinationDate);

  // Function to request location permissions
  async function requestLocationPermissions() {
    const {granted} = await requestForegroundPermissionsAsync();
  
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("LOCALIZAÇÃO ATUAL: ", currentPosition);
    }
  }

  // Request location permissions when the component is mounted
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  // Update the location state when the user's position changes
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        pitch: 40,
        center: response.coords
      })
    })
  }, [])

  // Function to open App Google Maps
  const openMaps = (latitude: Number, longitude: Number) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `google.navigation:q=${latitude},${longitude}`,
    });
  
    Linking.openURL(url).catch(err => console.error('Error opening map:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text  style={styles.headerText}>Mapa de localização atual</Text>
      </View>
      {location ? (
        <MapView
          ref={mapRef} 
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            title="Você está aqui!"
            description="Essa é a sua localização atual."
          />

          <Marker
            onPress={() => openMaps(destination.coords.latitude, destination.coords.longitude)}
            coordinate={{
              latitude: destination.coords.latitude,
              longitude: destination.coords.longitude
            }}
            title="Seu destino!"
            description="Essa é localização do seu destino."
            image={require('./assets/icon-map.png')}
          />

          <Polyline
            coordinates={coordinates}
            strokeColor="#000" // Cor da linha
            strokeWidth={3}    // Largura da linha
          />

        <Circle
          center={BH_CENTER}
          radius={450} // Raio de 1km em metros
          strokeWidth={2}
          strokeColor="rgb(251, 157, 3)" // Azul semi-transparente
          fillColor="rgba(251, 157, 3, 0.5)" // Azul claro semi-transparente
        />
        </MapView>
      ) : (
        <Text>Carregando mapa...</Text>
      )}
    </View>
  );
}
