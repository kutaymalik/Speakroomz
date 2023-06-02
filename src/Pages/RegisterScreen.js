import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LogInput from "../components/LogInput";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { auth, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { ref } from "firebase/database";
//#region Image url
const IMG_URL =
  "https://images.unsplash.com/photo-1534296000128-e754fd87f8dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHdoaXRlJTIwYmxhY2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
const DEFAULT_PIC =
  "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
//#endregion

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigation = useNavigation();

  useLayoutEffect(() => {}, []);

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      res.user.photoURL = photoURL || DEFAULT_PIC;
      res.user.displayName = username;
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.login_container}
    >
        <View style={styles.logo_container}>
          <Text style={styles.logo}>
            Speakroomz
          </Text>
        </View>
        <Text style={styles.register_title}>
          Register
        </Text>
        <LogInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <LogInput
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <LogInput
          placeholder="Password"
          isPassword={true}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
        />
        <LogInput
          placeholder="User Photo"
          onChangeText={(text) => setPhotoURL(text)}
        />
        <View style={tw``}>
          <TouchableOpacity
            onPress={() => register()}
            style={styles.login_button}
          >
            <Text style={styles.login_button_text}>
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.register_button} onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  login_container: {
    backgroundColor: '#f72025',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo_container: {
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    width: 125,
    backgroundColor: '#690d0f',
    flexDirection: 'row',
    flexWrap: "wrap",
    marginRight: 120,
    marginBottom: 20,
    },

  logo: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    flexDirection: 'row',
  },

  register_title: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },

  login_button: {
    width: 300,
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 5,
    borderColor: 'white',
    backgroundColor: '#690d0f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  register_button: {
    width: 300,
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#690d0f',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_text: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 18  ,
    color: '#690d0f',
    padding: 8,
  },

  login_button_text: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 18  ,
    color: 'white',
    padding: 8,
  }
})
