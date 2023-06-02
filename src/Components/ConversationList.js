import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function ConversationList({ chat }) {
  const navigation = useNavigation();
  const [chatMessage, setChatMessage] = useState(null);

  useEffect(() => {
    const fetchFirstChatMessage = async () => {
      try {
        const ref = collection(db, "chats", chat.id, "messages");
        const orderedMessages = query(ref, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(orderedMessages);
        setChatMessage(snapshot.docs.data());
      } catch (err) {
        console.log(err);
      }
    };
    fetchFirstChatMessage();
  }, []);


  return (
    <TouchableOpacity
      onPress={() => {
        console.log(chat.img)
        navigation.navigate("ChatScreen", {
          id: chat.id,
          chatName: chat.chatName,
          image: chat.img,
        })}
      }
    >
      <ListItem bottomDivider>
        <Avatar
          rounded
          source={{
            uri:
              chat.img ||
              "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={tw`font-bold text-lg`}>
            {chat.chatName}
          </ListItem.Title>
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`text-gray-400 mt-1 text-sm`}
          >
            {chatMessage?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
