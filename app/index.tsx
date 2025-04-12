import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { Component } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
// import avaterImg from '../assets/images/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
export default function index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,

      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: false,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: true,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
    {
      id: 7,
      title: "Todo 7",
      isDone: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity
          onPress={() => {
            alert("Clicked");
          }}
        >
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("Clicked");
          }}
        >
          <Image
            style={styles.avaterImg}
            source={require("../assets/images/alexander-hipp-iEEBWgY_6lA-unsplash.jpg")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" />
        <TextInput placeholder="search..." clearButtonMode="always" />
      </View>

      <FlatList
        style={styles.todoContainer}
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoBoxContainer}>
            <View style={styles.todoBox}>
              <Checkbox value={item.isDone} />
              <Text>{item.title}</Text>
            </View>
            <AntDesign name="delete" size={24} color="red" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#eaeaea",
  },
  avaterImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headers: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 10,
    alignItems: "center",
  },
  todoContainer: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  todoBox: {
    flexDirection: "row",
    margin: 4
  },
  todoBoxContainer:{
    flexDirection: 'row',
    backgroundColor: "#eaeaea",
    padding: 10,
    margin: 10,
    justifyContent: 'space-between'
  }
});
