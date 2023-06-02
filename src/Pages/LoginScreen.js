import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import LogInput from "../components/LogInput";
import { KeyboardAvoidingView, Platform } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//#region Image url
const IMG_URL =
  "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHdoaXRlJTIwYmxhY2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
//#endregion

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.login_container}>
        
        <View style={styles.logo_container}>
          <Text style={styles.logo}>
            Speakroomz
          </Text>
        </View>

        <LogInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <LogInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          isPassword={true}
        />
        <View style={tw``}>
          <TouchableOpacity
            style={styles.login_button}
            onPress={() => login()}
          >
            <Text style={styles.login_button_text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.register_button}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.button_text}>
              Register Page
            </Text>
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