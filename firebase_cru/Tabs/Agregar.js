import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const Agregar = (props) => {
  const initalState = {
    nombre: "",
    descripcion: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewItem = async () => {
    if (state.nombre === "") {
      alert("please provide a name");
    } else {

      try {
        await firebase.db.collection("Productos").add({
          nombre: state.nombre,
          descripcion: state.descripcion,
        });

        props.navigation.navigate("Lista");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripcion"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.email}
        />
      </View>


      <View style={styles.button}>
        <Button title="Guardar" onPress={() => saveNewItem()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Agregar;