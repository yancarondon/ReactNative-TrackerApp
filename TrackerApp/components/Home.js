import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import ProgressBar from "./ProgressBar";

export default function Home({ navigation }) {
  const [newActivity, setNewActivity] = useState("");
  const [toDo, setToDo] = useState([
    {
      id: "1",
      activity: "walk",
      completed: false,
    },
    {
      id: "2",
      activity: "run",
      completed: false,
    },
    {
      id: "3",
      activity: "weight-lift",
      completed: false,
    },
    {
      id: "4",
      activity: "jog",
      completed: false,
    },
  ]);

  const [progress, setProgress] = useState(50);
  
  const toggleComplete = (id) => {
    //map through todo and set matched id to !item.completed
    setToDo((toDoItems) =>
      toDoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    const completedGoals = toDo.filter((item) => item.completed).length; //count of completed goals
    const totalGoals = toDo.length;
    const newProgress = ((completedGoals / totalGoals) * 100).toFixed(2);
    setProgress(parseFloat(newProgress));
  };

  const totalGoals = toDo.length;
  const completedGoals = toDo.filter((item) => item.completed).length;
  const overallProgress = ((completedGoals / totalGoals) * 100).toFixed(2);

  const renderToDoList = ({ item }) => (
    <View style={styles.item}>
      <Checkbox
        status={item.completed ? "checked" : "unchecked"}
        onPress={() => toggleComplete(item.id)}
      />
      <Text style={styles.itemText}>{item.activity}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate("Goals", { goal: item, setToDo })}
      >
        <Text style={[styles.buttonText, { color: "white", padding: 7 }]}>
          GOAL DETAILS
        </Text>
      </TouchableOpacity>
    </View>
  );

  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (parseFloat(overallProgress) >= 100) {
      Alert.alert("COMPLETED", "All goals have been completed.");
    }
  }, [overallProgress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={overallProgress}
          max={100}
          min={0}
          backColor={"gray"}
          barColor={"white"}
          textColor={"white"}
        />
        <Text style={styles.modalText}>
          {overallProgress}% COMPLETED
        </Text>
      </View>

      <FlatList
        style={styles.toDoList}
        data={toDo}
        renderItem={renderToDoList}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(!showModal)}
      >
        <Text style={[styles.buttonText, { color: "black" }]}>ADD A NEW GOAL</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add a new goal below:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewActivity}
              value={newActivity}
            />
            <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setToDo((toDoItems) => [
                  ...toDoItems,
                  {
                    id: (toDoItems.length + 1).toString(),
                    activity: newActivity,
                    completed: false,
                  },
                ]);
                setShowModal(!showModal);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(!showModal)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    padding: 8,
  },
  toDoList: {
    flex: 1,
    alignContent: "stretch",
    width: "100%",
    borderRadius: 5,
  },
  item: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 1,
    backgroundColor: "rgba(30, 30, 30, 1)",
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
  },
  itemText: {
    color: "white",
    flex: 1,
    marginLeft: 10,
  },
  addButton: {
    margin: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
    elevation: 2,
  },
  detailsButton: {
    backgroundColor: "rgba(126, 125, 125, 0.32)",
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    marginLeft: "auto",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    padding: 15,
  },
  modalView: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    color: "white",
    margin: 5,
  },
  input: {
    height: 40,
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",
    color: "black",
  },
  saveButton: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "rgba(213, 213, 213, 0.32)",
    borderRadius: 5,
    padding: 12,
    elevation: 2,
  },
  closeButton: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "rgba(213, 213, 213, 0.32)",
    borderRadius: 5,
    padding: 12,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    // padding: 5,
    // margin: 5,
  },
  buttonsView: {
    flexDirection: "row",
  },
});

