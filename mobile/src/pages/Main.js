import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, 
  Text,
  TextInput,
  TouchableOpacity, 
  Modal,
  TouchableHighlight
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import geoLocation from '../services';

import api from '../services/api';

function Main() {
  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState(null);
  const [ techs, setTechs ] = useState('');
  const [ modal, setModal ] = useState(false);
  const [ address, setAddress ] = useState('');
  const [ distance, setDistance ] = useState('');
  const [ professional, setProfessional ] = useState('souther');
  const [ perfil, setPerfil ] = useState(false);
  const [ localJobs, setLocalJobs ] = useState({})



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

        setLocalJobs({
          latitude,
          longitude,
        })
      }
    }

    loadInitialPosition()
  }, []);

  async function loadDevs() {
      const response = await api.get('/search-southers', {
        params: {
          address,
          distance,
          professional,
          techs: techs.toLowerCase()
        }
      });

      setDevs(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  async function currentLocationJob(value) {
    setAddress(value)

    const { lat, lng } = await geoLocation(value)

    const latitude = lat;
    const  longitude = lng;

    setLocalJobs({
      latitude,
      longitude
    })
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
        <Marker style={styles.addressJob} coordinate={localJobs}>
          <Entypo name="location" style={styles.avatarClient} />
        </Marker>
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
        <TouchableOpacity underlayColor="red" onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons  name="search" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableHighlight>
          
        </TouchableHighlight>
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
          <View style={styles.containerSelect}>   
            <RNPickerSelect
              style={styles.selectJob}
              value={address}
              onValueChange={(value) => currentLocationJob(value) }
              items={[
                  { label: 'Agibank', value: 'R. Mariante, 25 - Rio Branco, Porto Alegre/RS' },
                  { label: 'Topazio', value: 'Rua Dezoito de Novembro, 273 - Navegantes, Porto Alegre/RS' },
                  { label: 'Woop sicredi', value: 'Av. Assis Brasil, 3940 - Jardim Lindoia, Porto Alegre - RS' },
                  { label: 'Getnet', value: 'v. Pernambuco, 1483 - São Geraldo, Porto Alegre - RS' },
                  { label: 'Way2 tecnology', value: 'Rodovia SC-401, 4150 km 4. CIA Centro de Inovação Acate, sala 17 - Saco Grande, Florianópolis - SC' },
              ]}
            />
          </View>
          <View style={styles.containerSelect}>
            <RNPickerSelect
              value={professional}
              onValueChange={(value) => setProfessional(value)}
              items={[
                { label: 'Souther', value: 'Souther' },
                { label: 'Outros', value: 'Outros' },
              ]}
            />
          </View>

          <View style={styles.containerSelect}>
            <RNPickerSelect
              value={distance}
              onValueChange={(value) => setDistance(value)}
              items={[
                { label: '10km', value: 10000 },
                { label: '20km', value: 20000 },
                { label: '30km', value: 30000 },
                { label: '40km', value: 40000 },
                { label: '50km', value: 50000 },
                { label: '60km', value: 60000 },
                { label: '70km', value: 70000 },
                { label: '80km', value: 80000 },
                { label: '90km', value: 90000 },
                { label: '100km', value: 100000 },
                { label: '110km', value: 110000 },
                { label: '120km', value: 120000 },
                { label: '130km', value: 130000 },
                { label: '140km', value: 140000 },
                { label: '150km', value: 150000 },
                { label: '200km', value: 200000 },
              ]}
            />
          </View>

          <TextInput
            style={styles.searchInputModal}
            placeholder="tecnologias"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />

          <TouchableOpacity onPress={() => setModal(false)}>
            <MaterialIcons name="cancel" style={styles.closeModal} />
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
  
  containerSelect:{
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginBottom: 10,
  },

  avatarClient: {
    fontSize: 35,
    color: '#fe6e00'
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
    color: '#000',
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

  selectJob: {
    maxWidth: 150,
  },
  
  selectDistance: {
    height: 50,
    width: 300,
    maxWidth: 80,
    backgroundColor: '#fff',
    color: '#fff',
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