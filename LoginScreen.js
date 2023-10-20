import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './firebase';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    loginUser(email, password)
      .then((userCredential) => {
        navigation.navigate('Menu');
      })
      .catch((error) => {
        Alert.alert('¡Credenciales erroneas!');
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          Alert.alert('¡Algo salió mal! Verifica tus credenciales.');
        } else {
          console.log(errorCode);
        }
      })
      .finally(() => {
      });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inicio de Sesión</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={handleEmail}
          placeholder="Ingresa tu correo electrónico"
          style={styles.inputMail}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={handlePassword}
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPassword}
          style={styles.inputPassword}
        />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.iconContainer}>
          <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="black" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar Sesión"
          onPress={handleSubmit}
          color="white"
          style={styles.button}
        />
      </View>
        <Text
          style={{ color: 'red', fontWeight: 'bold' }}
          onPress={handleRegisterPress}
        >
          Regístrate aquí
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    height: '6%',
  },
  inputMail: {
    flex: 1,
    marginLeft: -7,
  },
  inputPassword: {
    flex: 1,
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
  button: {
    backgroundColor: 'green',
  },
  registerText: {
    fontSize: 14,
    marginTop: 20,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: -55,
    color: 'black',
  },
  eyeIcon: {
    fontSize: 24,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default LoginScreen;
