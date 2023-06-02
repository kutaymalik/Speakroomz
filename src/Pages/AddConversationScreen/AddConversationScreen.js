import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import tw from "tailwind-react-native-classnames";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { get } from "firebase/database";

const AddConversationScreen = () => {
  const navigation = useNavigation();
  const [userInput, setUserInput] = useState();
  const [image, setImage] = useState();

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: userInput,
        img: image,
      }).then(() => {
        navigation.goBack();
      });
    } catch (err) {
      alert(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Conversation",
    });
  }, []);
  return (
    <View>
      <Input
        onSubmitEditing={createChat}
        placeholder="Add Name for Chat"
        onChangeText={(text) => setUserInput(text)}
        leftIcon={() => (
          <View style={tw.style(`mr-2`)}>
            <Icon name="chat" color="black" size={20} />
          </View>
        )}
      />
      <Input
        onSubmitEditing={createChat}
        placeholder="Add Image for Chat"
        onChangeText={(text) => setImage(text)}
        leftIcon={() => (
          <View style={tw.style(`mr-2 `)}>
            <Icon name="image" color="black" size={20} />
          </View>
        )}
      />
      <Button
        style={tw.style(`w-3/6 m-auto`)}
        buttonStyle={{ backgroundColor: "#070819", borderRadius: 10 }}
        title="Create Chat"
        onPress={() => createChat()}
      />
    </View>
  );
}

export default AddConversationScreen;

const styles = StyleSheet.create({});