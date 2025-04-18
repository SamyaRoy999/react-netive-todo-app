import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type todoType = {
  id: number;
  title: string;
  isDone: boolean;
};
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

const [allTodos, setAllTodos] = useState<todoType[]>(todoData); // original
const [todos, setTodos] = useState<todoType[]>(todoData);       // filtered

  const [todosText, setTodosText] = useState<string>();
  const [searchQuary, setSearchQuary] = useState<string>("");

  // get todos async store
  useEffect(() => {
    const getData = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-key");
        if (todos !== null) {
          const parsedTodos = JSON.parse(todos);
          setAllTodos(parsedTodos);
          setTodos(parsedTodos);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  
    //  search functionlity
    const onSearch = (query: string) => {
      const filtered = allTodos.filter((item) =>
        item.title?.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filtered);
    };
    
    useEffect(() => {
      onSearch(searchQuary)
    }, [searchQuary])

  // set async store update data
  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todosText || '',
        isDone: false,
      };
      const updatedTodos = [...allTodos, newTodo];
      setAllTodos(updatedTodos);
      setTodos(updatedTodos);
      setTodosText("");
      Keyboard.dismiss();
      await AsyncStorage.setItem("my-key", JSON.stringify(updatedTodos));
    } catch (e) {
      console.log(e);
    }
  };
  

  // delete func
  const deleteFun = async (id: number) => {
    try {
      const updatedData = allTodos.filter((item) => item.id !== id);
      setAllTodos(updatedData);
      setTodos(updatedData);
      await AsyncStorage.setItem("my-key", JSON.stringify(updatedData));
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity
          onPress={() => {
            // alert("Clicked");
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
        <TextInput
          placeholder="search..."
          onChangeText={(text) => setSearchQuary(text)}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        style={styles.todoContainer}
        data={todos.reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem todo={item} deleteFun={deleteFun} />
        )}
      />
      <KeyboardAvoidingView style={styles.footer}>
        <TextInput
          value={todosText}
          onChangeText={(text) => setTodosText(text)}
          style={styles.addInput}
          placeholder="Add new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TodoItem = ({
  todo,
  deleteFun,
}: {
  todo: todoType;
  deleteFun: (id: number) => void;
}) => (
  <View style={styles.todoBoxContainer}>
    <View style={styles.todoBox}>
      <Checkbox value={todo.isDone} />
      <Text>{todo.title}</Text>
    </View>
    <TouchableOpacity onPress={() => deleteFun(todo.id)}>
      <AntDesign name="delete" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

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
    padding: 15,
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
    margin: 4,
  },
  todoBoxContainer: {
    flexDirection: "row",
    backgroundColor: "#eaeaea",
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
  },
  // button
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  addInput: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    flex: 1,
    padding: 5,
    margin: 2,
  },
  addButton: {
    backgroundColor: "#9ae19d",
    padding: 15,
  },
});
