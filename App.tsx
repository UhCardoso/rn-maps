import { useEffect, useState, useRef } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, View } from 'react-native';
import { styles } from './styles';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null); 

  // Função para solicitar permissão de localização
  async function requestLocationPermissions() {
    const {granted} = await requestForegroundPermissionsAsync();
  
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("LOCALIZÇÃO ATUAL: ", currentPosition);
    }
  }

  // Solicitar permissão de localização ao carregar o aplicativo
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  // Atualizar a localização do usuário em tempo real
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
        </MapView>
      ) : (
        <Text>Carregando mapa...</Text>
      )}
    </View>
  );
}
