import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import { EditTasksArgs } from "../pages/Home";

import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTasksArgs) => void;
}

export const TaskItem = ({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleEditingTask() {
    setIsEditing(true);
  }

  function handleCancelEditingTask() {
    setEditTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditingTask() {
    editTask({ taskId: task.id, taskNewTitle: editTaskTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editTaskTitle}
            onChangeText={setEditTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditingTask}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          {isEditing ? (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleCancelEditingTask}
            >
              <Icon name="x" size={18} color="#e80000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={handleEditingTask}
            >
              <Icon name="edit" size={16} color="#aeaeae" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ width: 1, height: 24, backgroundColor: '#d8d8d8'}}></View>
        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
