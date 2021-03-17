import React, {
    useState,
    useEffect,
} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";

export default function DetectedBeacon(props) {

    return (
        <View style={styles.detectedBeacon}>
            <Image source={require("../../assets/beacon.png")} style={styles.image}/>
            <View style={styles.beaconData}>
                <View style={styles.nameDist}>
                    <Text style={styles.beaconName}>{props.beaconName}</Text>
                    <Text style={styles.distance}>{props.distance}m</Text>
                </View>
                <Text style={styles.beaconId}>{props.beaconId}</Text>
            </View>
            <View style={styles.beaconInfos}>
                <Text style={{textAlign:"center"}}>RSSI</Text>
                <Text style={styles.infos}>{props.intensity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detectedBeacon:{
        display:"flex",
        width:'78%',
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingVertical:10
    },
    image:{
        width:50,
        height:50,
        margin:3
    },
    nameDist:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    beaconData:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    beaconId:{
        fontSize:15,
        color:"#a4a4a4",
    },
    beaconName:{
        fontSize:22,
        fontWeight:"bold"
    },
    beaconInfos:{
        display:"flex",
        flexDirection:"column",
	    justifyContent:"center",
	    alignItems:"center",
	    padding:4
    },
    infos:{
	    fontSize:15,
    },
    distance:{
	    fontSize:15,
	    paddingTop:4
    }
});
