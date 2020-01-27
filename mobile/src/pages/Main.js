import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput,
  Sele,
  TouchableOpacity, 
  Modal
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState(null);
  const [ techs, setTechs ] = useState('');
  const [ modal, setModal ] = useState(false);
  const [ ref, setRef ] = useState('');
  const [ distance, setDistance ] = useState('');
  const [ professional, setProfessional ] = useState('souther');
  const [ perfil, setPerfil ] = useState(false);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const {  coords }  = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04, 
        })
      }
    }

    loadInitialPosition()
  }, []);

  async function loadDevs() {
    // const { latitude, longitude } = currentRegion;
    const latitude = -30.0390287
    const longitude = -51.2028622
    

    const response = await api.get('/search-southers', {
      params: {
        latitude,
        longitude,
        techs: techs.toLowerCase()
      }
    });

    setDevs(response.data.devs);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  function openModal() {
    setModal(true)
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
        {devs.map(dev => (
          <Marker style={styles.container} key={dev._id} coordinate={{ 
                latitude: dev.location.coordinates[1], 
                longitude: dev.location.coordinates[0]
              }}>
            <View style={styles.backgroundAvatar} backgroundColor={dev.avatar[0]}>
              <Text style={styles.firstLetterAvatar}> { dev.avatar[1] } </Text>
            </View>
            <Callout onPress={() => setPerfil(true)}>
              <View style={styles.callout}>
                <Text style={styles.devName}> { dev.name } </Text>
                <Text style={styles.devOffice}> { dev.office } </Text>
                <Text style={styles.devTechs}> { dev.techs.join(', ') } </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar devs por tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons  name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.plusContainer}>
      <TouchableOpacity onPress={() => setModal(true)} style={styles.plusButton}>
        <MaterialIcons  name="filter-list" size={30} color="#fff" />
      </TouchableOpacity>
      </View>
      <Modal 
        transparent={true}
        animationType={'fade'}
        visible={perfil}
      >
        <View>
          <Text>Perfil do usuario</Text>
        </View>
      </Modal>
      <Modal 
        transparent={true} 
        animationType="slide" 
        visible={modal}
      >
        <View style={styles.modalView}>
          <Text style={styles.titleModal}> 
            Filtro avançado
          </Text>
          <TextInput
            style={styles.searchInputModal}
            placeholder="Endereço da vaga"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={ref}
            onChangeText={setRef}
          />
          <TextInput
            style={styles.searchInputModal}
            placeholder="Raio de busca "
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={distance}
            onChangeText={setDistance}
          />
          <TextInput
            style={styles.searchInputModal}
            placeholder="tecnologias"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />
          <TextInput
            style={styles.searchInputModal}
            placeholder="Profissional "
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={professional}
            onChangeText={setProfessional}
          />
          <TouchableOpacity onPress={() => setModal(false)}>
            <MaterialIcons  name="cancel" style={styles.closeModal} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  backgroundAvatar: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderRadius: 7,
    borderColor: '#fff',
  },

  firstLetterAvatar: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#586173',
  },

  devOffice: {
    textAlign: 'center',
    color: '#586173',
    fontSize: 13,
    marginTop: 3,
  },

  devTechs: {
    fontSize: 12,
    color: '#989689',
    textAlign: 'center',
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fe6e00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  plusContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  plusButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fe6e00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    zIndex: 10,
  },

  filterContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
  },

  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fe6e00'
  },

  titleModal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
    marginBottom: 40,
  },

  searchInputModal: {
    height: 50,
    width: 300,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    marginBottom: 10,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  closeModal: {
    fontSize: 50,
    color: '#fff',
    margin: 20
  }


})

export default Main;