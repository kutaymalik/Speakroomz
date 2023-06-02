import React, { Children, useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db, auth } from "../firebase";
import { getDocs, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { child, ref } from "firebase/database";

export default function ChatScreen({chat}) {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatName, id, image} = route.params;
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const docRef = collection(db, "chats", id, "messages");
    await addDoc(docRef, {
      timestamp: serverTimestamp(),
      email: auth.currentUser.email,
      message: userInput,
    });
    setUserInput("");
    Keyboard.dismiss();
  };

  

  useLayoutEffect(() => {
    const fetchMessages = async () => {
      try {
        const docRef = collection(db, "chats", id, "messages");
        const messagesOrdered = query(docRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(messagesOrdered);
        setMessages(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))

        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [id]);

  useLayoutEffect(() => {
    
    navigation.setOptions({
      title: chatName,
      headerTitle: () => (
        <View style={tw.style(`flex-row items-center`)}>
          <Avatar rounded source={{uri: image}}/>
          <Text style={tw.style(`text-white text-xl ml-2`)}>{chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={tw`flex-row`}>
          <TouchableOpacity>
            <Icon name="phone" color="white" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="videocamera"
              style={tw`mr-3 ml-3`}
              color="white"
              size={28}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={tw`h-full`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{
                paddingTop: 20,
              }}
              style={tw`flex-1 h-full flex-col-reverse`}
            >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={tw`w-full flex-row-reverse mt-4 mb-4`}>
                    <View style={tw` w-4/6 flex-row-reverse items-center`}>
                      <Avatar
                        rounded
                        source={{
                          uri:
                            data.photoURL ||
                            "https://www.faistroquer.fr/public/img/user_placeholder.png",
                        }}
                        style={tw`mr-3 ml-3 w-8 h-8`}
                      />
                      <Text style={tw`bg-white p-3 rounded-xl text-sm ml-3`}>
                        {data.message}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View key={id} style={tw`w-full flex-row mt-4 mb-4`}>
                    <View style={tw`w-4/6 flex-row items-center`}>
                      <Avatar
                        rounded
                        source={{
                          uri:
                            data.photoURL ||
                            "https://www.faistroquer.fr/public/img/user_placeholder.png",
                        }}
                        style={tw`mr-3 ml-3 w-8 h-8`}
                      />
                      <Text
                        style={tw.style(
                          `p-3 rounded-xl text-sm ml-3 text-white`,
                          { backgroundColor: "#070819" }
                        )}
                      >
                        {data.message}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>

            {/* Footer */}
            <View style={tw`flex-row items-center border-t-2 border-gray-200`}>
              <TextInput
                onChangeText={(text) => setUserInput(text)}
                style={tw`h-12 text-xl p-4 w-full `}
                placeholder="message"
                onSubmitEditing={sendMessage}
                value={userInput}
              />
              <TouchableOpacity onPress={() => sendMessage()}>
                <FeatherIcon name="send" color="gray" size={28} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
