import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from './firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handlePasswordAgain = (text) => {
    setPasswordAgain(text);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    registerUser(email, password)
    alert("Cuenta creada con éxito");
    navigation.navigate('Login');
 };


    const goBack = () => {
    navigation.navigate('Login');
    };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>
        <TextInput
            value={email}
            onChangeText={handleEmail}
            placeholder="Ingresa tu correo electrónico"
            style={styles.input}
            data-test="email"
        />
        <TextInput
            value={password}
            onChangeText={handlePassword}
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
            style={styles.input}
            data-test="password"
        />
            <TextInput
            value={passwordAgain}
            onChangeText={handlePasswordAgain}
            placeholder="Confirma tu contraseña"
            secureTextEntry={true}
            style={styles.input}
            data-test="password"
        />
        <View>
            <View style={styles.buttonContainer}>
            <Button title="Registrarse" onPress={handleSubmit} color="white" />
            </View>
            <View style={styles.buttonContainer}>
            <Button title="Regresar" onPress={goBack} color="white" />
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    marginTop: 70,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
  },
  signInText: {
    fontSize: 12,
    marginTop: 20,
  },
  buttonContainer: {
    width: 230,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
});

export default RegisterScreen;
