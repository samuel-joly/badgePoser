import React, {
    useState
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';
import email from 'react-native-email'

const permissions = async () => {
    try {
        const granted =  await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title:"Demande d'acces caméra",
                message:"L'application demande l'acces a"+
                    " votre caméra pour prendre des photos",
                buttonNeutral : "Redemander plus tard",
                buttonPositive: "OK",
                buttonNegative: "Annuler"
            }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            alert("L'application ne peut accéder aux images");
        }
    } catch (err) {
        console.warn(err);
    }
}


export default function FormScreen() {

    const [ beaconId, setBeaconId ]       = useState();
    const [ codeBat, setCodeBat ]         = useState();
    const [ placeSpecs, setPlaceSpecs ]   = useState();
    const [ commentaire, setCommentaire ] = useState();

    const [imageBat, setImageBat ]        = useState();
    const [imagePose, setImagePose ]      = useState();

    const[sending, setSending]            = useState(false);

    const sendForm = () => {
        console.log("sending form....");
        const poseObj = {
            "id_beacon":beaconId,
            "code_batiment":codeBat,
            "précision_pose":placeSpecs,
            "commentaire":commentaire,
            "plan_batiment":imageBat,
            "image_pose":imagePose
        }
        sendMail(poseObj);
        setSending(!sending);
    }

    const sendMail = (poseObj) => {
        const to = 'samuel.joly@laplateforme.io';
        email(to, {
            cc:'samuel.joly@ampmetropole.fr',
            subject:'BeaconPoser Data',
            body:JSON.stringify(poseObj)
        })
    }

    return (
        <View style={styles.main}>
            <View style={styles.form}>
                <View style={styles.inputZone}>
                    <Text style={styles.label}>BeaconID</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ (txt) => setBeaconId(txt) }
                        value={beaconId} />
                </View>
                <View style={styles.inputZone}>
                    <Text style={styles.label}>Code ASTRE batiment</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ (txt) => setCodeBat(txt) }
                    />
                </View>
                <View style={styles.inputZone}>
                    <Text style={styles.label}>Precision emplacement</Text>
                    <TextInput
                        style={styles.bigInput}
                        onChangeText={ (txt) => setPlaceSpecs(txt) }
                        multiline= { true }
                    />
                </View>
                <View style={styles.inputZone}>
                    <Text style={styles.label}>Commentaires *</Text>
                    <TextInput
                        style={styles.bigInput}
                        onChangeText={ (txt) => setCommentaire(txt) }
                        multiline= { true }
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    sendForm();
                    setSending(!sending);
                }}
                style={styles.Btn}>
                <Text style={styles.textButton}>Envoyer</Text>
                {sending ?
                 (<ActivityIndicator color="white" size="large"/>)
                 :
                 null
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
    },
    form:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:5,
    },
    inputZone:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    label:{
        fontSize:20,
        fontWeight:"bold",
    },
    input:{
        backgroundColor:"#f2eff1",
        borderWidth:1,
        borderColor:"#dddddd",
        borderRadius:5,
        width:300,
        height:40,
        fontSize:15,
        color:"black"
    },
    bigInput: {
        height:125,
        backgroundColor:"#f2eff1",
        borderWidth:1,
        borderColor:"#dddddd",
        borderRadius:5,
        width:300,
        fontSize:18,
        color:"black"
    },
    Btn:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"50%",
        borderRadius:6,
        height:40,
        backgroundColor:"#589cfc",
        margin:23
    },
    textButton:{
        color:"white",
        fontSize:20,
    }
})
