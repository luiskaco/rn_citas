import React, {useState} from 'react';
import {Text, StyleSheet , View, TouchableHighlight, TextInput, Button, Alert, ScrollView} from 'react-native';

// ShortID
import shortid from 'shortid';

// Importando
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({citas, setCitas, setMostrarForm, guardarCitaStorage}) => {

        const [paciente, setPaciente] = useState('');
        const [propietario, setPropietario] = useState('');
        const [telefono, setTelefono] = useState('');
        const [fecha, setFecha] = useState('');
        const [hora, setHora] = useState(''); 
        const [sintoma, setSintoma] = useState('');


    // TODOS EL CODIGO
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

        // Date | Muestra y ocutl el date
        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handleConfirmFecha = (date) => {
            // Medoto Tolocale
            const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
            setFecha(date.toLocaleDateString('es-ES', opciones));
            hideDatePicker();
          
        };


        // Time | Muestra y oculta el time piker
        const showTimePicker = () => {
            setTimePickerVisibility(true);
        };

        const hideTimePicker = () => {
            setTimePickerVisibility(false);
        };

        const handleConfirmHora = (hora) => {
       
            //Guardar hora
            const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
            setHora(hora.toLocaleString('es-ES', opciones));

            
            hideTimePicker();
        };

    // END TODOS EL CODIGO


    // Creando nuev acita

    const crearNuevaCita = () => {
        // alidaciones
        if(paciente.trim() == ''|| 
            propietario.trim() == '' || 
            telefono.trim() == '' || 
            fecha.trim()=='' ||
            hora.trim() == '' ||
            sintoma.trim() == '' ){

                mostrarAlerta();
                return;
        }

        // Crear nueva Cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintoma}
        cita.id = shortid.generate();

        // console.log(cita);

        // Agregar al State

        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        // PAsar las citas a storage
        guardarCitaStorage(JSON.stringify(citasNuevo));  // Nota: convertimos el arreglo en un string

        // Ocultar formualrio
        setMostrarForm(false)

        //Limpiar formularo
        
    }

    // Muestra alerta si falla la valdiacion
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',// Titulo
            'Todos los campos son obligatorio',  // Mensaje
              //Arreglo de botones  
            [{
                text: 'ok' // Arreglo
            }]
        );

    }

    return ( 
        <>  
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={texto => setPaciente(texto)}
                        // Quedan por default
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={texto => setPropietario(texto)}
                       
                    />
                </View>
                <View>
                    <Text style={styles.label}>Télefono</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={texto => setTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha</Text>
                    <Button title="Selecionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmFecha}
                        onCancel={hideDatePicker}

                        // Props
                        locale='es_Es'
                         // Solo para IOS
                        headerTextIOS="Elige una Fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"

                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora</Text>
                    <Button title="Selecionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmHora}
                        onCancel={hideTimePicker}

                        // Props
                        locale='es_Es'
                        // Solo para IOS
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                        
                        // is24Hour
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Síntomas</Text>
                    <TextInput 
                        multiline
                        style={styles.input}
                        onChangeText={texto => setSintoma(texto)}
                        
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Registrar</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
           
            
        </>
     );
}


const styles = StyleSheet.create({
    formulario:{
        backgroundColor: "#fff",
        paddingHorizontal:20,
        paddingVertical:10,

        marginHorizontal: '2.5%',
        
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18, 
        marginTop:20 
    },
    input:{
        marginTop:10,
        height:50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        color:'#000'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 20
    },
    textoSubmit:{
        color: "#fff",
        textAlign:'center',
        fontSize: 16,
        fontWeight:'bold'
    }
});
 
export default Formulario;