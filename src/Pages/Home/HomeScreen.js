import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import ConversationList from "../../Components/ConversationList";
import { useNavigation } from "@react-navigation/native";
import AntIcon from "react-native-vector-icons/AntDesign";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";
import { fetchChats } from "../../redux/firebaseCalls";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginScreen", { screen: "LoginScreen" });
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(!user) {
        navigation.replace("LoginScreen");
      }
      console.log(auth.currentUser.displayName);
    })
    fetchChats(dispatch);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Conversations",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => logout()}>
            <Image
              style={tw.style(`h-8 w-8 rounded-full ml-3`, {
                resizeMode: "contain",
              })}
              source={{
                uri: auth.currentUser.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={tw.style(`flex-row items-center justify-between  w-20`)}>
          <TouchableOpacity style={tw.style(`mr-1`)} onPress={() => {}}>
            <AntIcon name="camerao" color="white" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddConversationScreen");
            }}
          >
            <EvilIcon name="pencil" color="white" size={40} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView>
        {chats.map((chat) => (
          <ConversationList key={chat.id} chat={chat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});