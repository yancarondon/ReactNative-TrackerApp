import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

export default function Goals({ route, navigation }) {
  const { goal, setToDo } = route.params;
  const [completed, setCompleted] = useState(goal.completed);
  const [header, setHeader] = useState(goal.activity) // default value here

  const toggleCompletion = () => {
    setCompleted(!completed);
    setToDo((toDoItems) =>
      toDoItems.map((item) =>
        item.id === goal.id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const [editedActivity, setEditedActivity] = useState(goal.activity);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>{header}</Text>
        <View style={styles.buttonsView}>
          {/* Update checkbox */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              toggleCompletion(route.params.setToDo);
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>
              {goal.completed ? "Mark Incomplete" : "Mark Complete"}
            </Text>
          </TouchableOpacity>

          {/* Edit goal */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEditedActivity(goal.activity);
              setShowEditModal(true);
            }}
          >
            <Text style={styles.buttonText}>Edit Goal</Text>
          </TouchableOpacity>

          {/* Delete goal */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // update the toDo list by filtering out the item with the matching id
              setToDo((toDoItems) => toDoItems.filter((item) => item.id !== goal.id));
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Delete Goal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal edit */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showEditModal}
        onRequestClose={() => {
          setShowEditModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit goal:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditedActivity}
              value={editedActivity}
            />
            <View style={styles.buttonsView}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {

              setHeader(editedActivity)
                  setToDo((toDoItems) =>
                    toDoItems.map((item) =>
                      item.id === goal.id
                        ? { ...item, activity: editedActivity }
                        : item
                    )
                  );
                  setShowEditModal(false);
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowEditModal(false)}
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.9)",
  },
  goalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 20, 0.97)",
    padding: 30,
    borderRadius: 8,
    marginTop: 40,
    // marginRight: 15,
    // marginLeft: 15,
    margin: 15,
  },
  goalText: {
    fontSize: 26,
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    padding: 3,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 13,
    margin: 4,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
  },
  buttonsView: {
    flexDirection: "row",
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
});
