import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../database/firebase";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 const Lista = (props) => {

    const [list, setlist] = useState([]);

  useEffect(() => {
    firebase.db.collection("Productos").onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, descripcion } = doc.data();
        list.push({
          id: doc.id,
          nombre,
          descripcion,
    
        });
      });
      setlist(list);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("Agregar")}
        title="Create Item"
      />
    {list.map((lista) => {
      return (
        <ListItem
          key={lista.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("Detalles", {
              listaId: lista.id,
            });
          }}
        >
          <ListItem.Chevron />
          <Avatar
          style={styles.pantall}
            source={{
              uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png'
            }}

          />
          <ListItem.Content>
            <ListItem.Title>{lista.nombre}</ListItem.Title>
            <ListItem.Subtitle>{lista.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    })}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pantall: {
    width: windowWidth/6.1,
    height: windowHeight/11,
    marginRight: 20
  }
});

export default Lista;