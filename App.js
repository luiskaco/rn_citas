import React , {useState, useEffect} from 'react';
import {Text, StyleSheet , View, FlatList,TouchableHighlight, TouchableWithoutFeedback ,Keyboard, Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Compoenntes
import Cita from './components/cita';
import Formulario from './components/formulario';

const App = () => {
    // mostrar Guardar from
    const [mostrarForm, setMostrarForm] = useState(false);


      // Definir el state de cistas
    const [citas, setCitas] = useState([
      // {id: "1", paciente : "Hook", Propietarios: "Luis", sintomas: "no come"},
      // {id: "2", paciente : "Redux", Propietarios: "Maria", sintomas: "no come"},
      // {id: "3", paciente : "Native", Propietarios: "Paula", sintoma: "no come"},
      // {id: "4", paciente : "Context", Propietarios: "Josefina", sintoma: "no come"},
    ]);


    // Buscando citas en el storage
    useEffect(() => {
       const obtenerCitasStorage = async () => {
          try {
              const citasStorage = await AsyncStorage.getItem('citas');
               console.log(citasStorage);

              if(citasStorage){
                setCitas(JSON.parse(citasStorage))

                // JSON parse: onvierte de string a un arreglo con el objeto
              }

          } catch (error) {
             console.log(error);
          }
       }

       obtenerCitasStorage();
       guardarCitaStorage
    },[]);


 

  // Methos

  // Eliminar paciente del state
  const eliminarPaciente = id => {

    // Citas filtradas | ELiminado del stoagr
     const citasFiltradas =  citas.filter(cita => cita.id !== id)

    // iterando las citas
    // setCitas((citaActuales) => {
    //     return citaActuales.filter(cita => cita.id !== id)
    // })
    setCitas((citasFiltradas))

    // Volvemos a guardar en el storage
    guardarCitaStorage(JSON.stringify(citasFiltradas));

  }

  // Mostrar o ocultaformulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm)
  }

  // Ocultar el teclado
  const cerrarTeclado = () => {
      Keyboard.dismiss(); // cierre el teclado
  }


  // Almaencar las citas storage
  const guardarCitaStorage = async (citasJSON) => {
      try {
        await AsyncStorage.setItem('citas', citasJSON)
        /* Nota: Em asyncstoragare, solo se puede guardar un string, no puede ser un arreglo */
      } catch (error) {
         console.log(error)
      }
  }



  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}> 
      {/* Nota: Es un boton que no se ve */}

    <View style={styles.contenedor}>
         <Text style={styles.titulo}>Administrador de Citas</Text>
         <View>
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
                <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Nueva cita' : 'Crear Nueva Cita'}</Text>
            </TouchableHighlight>
        </View>


          <View style={styles.contenido}>

              {/* // Evaluaamos000 */}

              {mostrarForm ? (
                <>
                  <Text style={styles.titulo}>Crear Nueva Cita</Text>
                  <Formulario 
                    citas={citas}
                    setCitas={setCitas}
                    setMostrarForm={setMostrarForm}
                    // Pasamos al componente el metodo
                    guardarCitaStorage={guardarCitaStorage}
                  />
                </>  
              ) : (
                <>
                   <Text style={styles.titulo}>{citas.length > 0 ? `Administra Tus citas` : `No hay cita, Agrega una!!!`}</Text>

                  <FlatList 
                      style={styles.listado}
                      data={citas}
                      renderItem = {({item}) => 
                      <Cita 
                        cita={item} 
                        eliminarPaciente={eliminarPaciente}  
                      /> }
                        // Funcion que se encarga de como se va ver los item cuando se meustren
                    
                      keyExtractor={cita => cita.id}

                    />
                </>
              )}


              

             
          </View>
    </View>
    {/* // ---Cerranod contenedor principal */}
    </TouchableWithoutFeedback>
  );
};

// Forma de mala perfomace
     {/* {citas.map( cita => (
              <View>
                  <Text>{cita.paciente}</Text>
              </View>
          ))} */}


const styles = StyleSheet.create({
    contenedor:{
      backgroundColor: '#aa076b',
      flex:1,
    },
    titulo:{
       marginTop:Platform.os == 'ios'  ? 40 :  10,
       marginBottom:20,
       color:'#fff',
       fontSize: 25,
       fontWeight:'bold',
       textAlign:'center',
    },
    contenido:{
      flex:1,
      marginHorizontal: '2.5%',
    },
    listado:{
        flex:1,

    },
    btnMostrarForm: {
      padding: 10,
      backgroundColor: '#7d024e',
      marginVertical: 20
  },
  textoMostrarForm:{
      color: "#fff",
      textAlign:'center',
      fontSize: 16,
      fontWeight:'bold'
  }
});

export default App;
