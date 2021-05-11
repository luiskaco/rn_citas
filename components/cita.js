import React from 'react';
import {Text, StyleSheet , View, TouchableHighlight} from 'react-native';


const Cita = ({cita, eliminarPaciente}) => {

    // Funciones
    const dialogoEliminar = id => {
        // console.log(`Eliminado ${id}`);

        // Funcion eliminar
        eliminarPaciente(id);
       
        // 
    }

    return (
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{cita.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{cita.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas: </Text>
                <Text style={styles.texto}>{cita.sintomas}</Text>
            </View>

            {/* // Agregando bonton */}
           
            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(cita.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
{/*             
            TouchableHighlight: Nos permite darle estilo al boton */}


        </View>
      
        
      );
}


const styles = StyleSheet.create({
    cita:{
        backgroundColor: '#fff',
        borderBottomColor: '#e1e1e1',
        borderStyle:'solid',
        borderBottomWidth: 1,
        // Exclusiva de reactNative
        paddingVertical: 20,
        paddingHorizontal: 10,

        marginHorizontal: '2.5%'
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18, 
        marginTop:20 
    },
    texto:{
        fontSize: 16, 
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar:{
        color: "#fff",
        textAlign:'center',
        fontSize: 16,
        fontWeight:'bold'
    }
});

// NOTA IMPORTANTE: En react natie los stilos nos afectan alos hijos
 
export default Cita;
