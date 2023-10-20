import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { createNewAnimal, getAnimalInformation } from './firebase';
import { useNavigation } from '@react-navigation/native';
import AuthContext from './authcontext';

const Menu = () => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [doggyData, setAnimalData] = useState(null);
  const [selectedDog, setSelectedAnimal] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newAnimalData, setNewAnimalData] = useState({
    name: '',
    age: '',
    weight: '',
  });

  useEffect(() => {
    if (currentUser) {
      getAnimalInformation(currentUser)
        .then((dogData) => {
          setAnimalData(dogData);
        })
        .catch((error) => {
          console.error('Error fetching dog information:', error);
        });
    }
  }, [currentUser]);

  const showAnimalDetails = (dog) => {
    setSelectedAnimal(dog);
    setModalVisible(true);
  };

  const createNewAnimal = () => {
    setFormVisible(true);
  };

  const submitNewAnimal = async () => {
    console.log('New Animal Data:', newAnimalData);
    try {
      await createNewAnimal(newAnimalData);
      setFormVisible(false);
      navigation.navigate('Menu');
      setNewAnimalData({ name: '', age: '', weight: '' });
    } catch (error) {
      console.error('Error al guardar el animal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={doggyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.anuncioItem}>
            <Text style={styles.animalName}>{item.name + '              '}</Text>
            <Button title="Details" onPress={() => showAnimalDetails(item)} />
          </View>
        )}
      />
      <View>
        <Button title="New Animal" onPress={createNewAnimal} />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDog && (
              <View>
                <Text style={styles.modalTitle}>Animal Details</Text>
                <Text>Name: {selectedDog.name}</Text>
                <Text>Age: {selectedDog.age}</Text>
                <Text>Weight: {selectedDog.weight}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Animal</Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor="black"
              value={newAnimalData.name}
              onChangeText={(text) => setNewAnimalData({ ...newAnimalData, name: text })}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Age"
              placeholderTextColor="black"
              value={newAnimalData.age}
              onChangeText={(text) => setNewAnimalData({ ...newAnimalData, age: text })}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Weight"
              placeholderTextColor="black"
              value={newAnimalData.weight}
              onChangeText={(text) => setNewAnimalData({ ...newAnimalData, weight: text })}
              style={styles.textInput}
            />
            <Button title="Submit" onPress={submitNewAnimal} />
            <Button title="Close" onPress={() => setFormVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anuncioItem: {
    padding: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo negro con opacidad
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
