import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, Button, Alert } from 'react-native';
import firebase from "../database/firebase";
import Lista from './Lista';

const Detalles =(props)=> {

    const initialState = {
        nombre: "",
        descripcion: "",

      };
    
  const [list, setlist] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setlist({ ...list, [prop]: value });
  };

  const getItemById = async (id) => {
    const dbRef = firebase.db.collection("Productos").doc(id);
    const doc = await dbRef.get();
    const list = doc.data();
    setlist({ ...list, id: doc.id });
    setLoading(false);
  };

  const deleteItem = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Productos")
      .doc(props.route.params.listId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Lista");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Desea eliminar este Item?",
      [
        { text: "Yes", onPress: () => deleteItem() },
        { text: "No", onPress: () => console.log("cancelar") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateList = async () => {
    const listrRef = firebase.db.collection("Productos").doc(list.id);
    await listrRef.set({
      nombre: list.nombre,
      descripcion: list.descripcion,
    });
    setlist(initialState);
    props.navigation.navigate("Lista");
  };

  useEffect(() => {
    getItemById(props.route.params.listId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }



  return (
    <ScrollView style={styles.container}>
    <View>
      <TextInput
        placeholder="Nombre"
        autoCompleteType="nombre"
        style={styles.inputGroup}
        value={list.nombre}
        onChangeText={(value) => handleTextChange(value, "nombre")}
      />
    </View>
    <View>
      <TextInput
        autoCompleteType="Descripcion"
        placeholder="Descripcion"
        style={styles.inputGroup}
        value={list.descripcion}
        onChangeText={(value) => handleTextChange(value, "descripcion")}
      />
    </View>
     
    <View style={styles.btn}>
      <Button
        title="Delete"
        onPress={() => openConfirmationAlert('Eliminado')}
        color="red"
      />
    </View>
    <View style={styles.btn}>
      <Button title="Update" onPress={() => updateList()} color="#19AC52" />
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Detalles;