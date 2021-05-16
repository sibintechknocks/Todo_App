import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Create_User = ({navigation,route})=>{
    const getDetails = (type) =>{
        if (route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "position":   
                    return route.params.position
                case "email":   
                    return route.params.email    
                case "phone":   
                    return route.params.phone
            }
        }
        return ""
    }
    if(route.params){
        console.log(route.params)
    }

    const [name,setName] = useState(getDetails("name"))
    const [position,setPosition] = useState(getDetails("position"))
    const [email,setEmail] = useState(getDetails("email"))
    const [phone,setPhone] = useState(getDetails("phone"))

    const submitData = ()=>{
        fetch("http://10.0.2.2:3000/send",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                position,
                email,
                phone,
            })
    })
    .then(res=>res.json())
    .then(data =>{
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
          }
          if (!position.trim()) {
            alert('Please Enter Position');
            return;
          }
          if (!email.trim()) {
            alert('Please Enter email');
            return;

          }
          if (!phone.trim()) {
            alert('Please Enter Phone');
            return;
          }
          else{
        Alert.alert(`${data.name} is saved successfully`)
        navigation.navigate("Home")
          }
    }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }
    return(
        <View>
            <KeyboardAvoidingView behavior="position">
            <View style={styles.addView}>
                <Text style={styles.addText}>
                ADD DETAILS
                </Text>
            </View>
            
            <TextInput
                label="Name"
                value={name}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                selectionColor="#008b8b"
                onChangeText= {text => setName(text)}
            />

            <TextInput
                label="Position"
                value={position}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                selectionColor="#008b8b"
                onChangeText= {text => setPosition(text)}
            />
            
            <TextInput
                label="Email"
                value={email}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                selectionColor="#008b8b"
                onChangeText= {email => setEmail(email)}
            />

            <TextInput
                label="Phone"
                value={phone}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                selectionColor="#008b8b"
                onChangeText= {text => setPhone(text)}
            />
        
                <Button 
                    onPress={() => submitData()}
                    style={styles.addButton}
                    icon="content-save"
                        mode="contained">
                       Save
                    </Button>
            </KeyboardAvoidingView>
        </View>
        
    )
}

const theme= {
    colors:{
        primary:"#008b8b"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
       
    },  
    inputStyle:{
        margin:5,
        padding: 0,
        color:'#2f4f4f'

    },
    addText:{
        color:'#2f4f4f',
        fontSize:20,
        marginBottom:20
    },
    addView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60
    },
    addButton:{
        
        width: '40%',
        marginLeft: '30%',
        marginTop:'10%',
        backgroundColor:'#008b8b',
    },
})

export default Create_User