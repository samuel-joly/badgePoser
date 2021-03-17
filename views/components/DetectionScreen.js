import React, {
    useState,
    useEffect,
} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    DeviceEventEmitter,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import Beacons from "react-native-beacons-manager";
import DetectedBeacon from "./DetectedBeacon";

export default function DetectionScreen({navigator}) {
    const [distance, setDistance] = useState();
    const [intensite, setIntensite] = useState();
    const [beaconID, setBeaconID] = useState();
    const [beaconStatus, setBeaconStatus] = useState("");
    const [scanning, setScan] = useState(true);
    const [beaconData, setBeaconData] = useState([{
        identifier : "beaconWorkSpace",
        uuid : "b0748cc8-dc11-49bf-8a10-a7917582389d",
        distance:"12.35654",
        intensity: "-58"
    }]);
    const searchBeacon = {
        identifier :"searched",
        uuid: "b0748cc8-dc11-49bf-8a10-a7917582389d"
    }
    
    const Beacon = Beacons.detectIBeacons();
    useEffect(() => {

        Beacons.startMonitoringForRegion(searchBeacon)
            .then(() => console.log("Analyse en cour", searchBeacon))
            .catch(error => console.error("Analyse échouée", error));

        Beacons.startRangingBeaconsInRegion(searchBeacon)
            .then(() => console.log("Ranging en cour", searchBeacon))
            .catch(error => console.error("Ranging échouée", error));

        const beaconDidRange = DeviceEventEmitter.addListener(
            "beaconDidRange",
            (data) => {
                console.log("Beacon a distance", data);
                setBeaconData(data);
            }
        );

        const beaconDidEnter = DeviceEventEmitter.addListener(
            "regionDidEnter",
            ({identifier, uuid}) => {
                console.log("Beacon enter region");
                setBeaconStatus("Beacon à portée");
            }
        );

        const beaconDidExit = DeviceEventEmitter.addListener(
            "regionDidExit",
            ({identifier, uuid}) => {
                console.log("Beacon exit region");
                setBeaconStatus("Beacon hors de portée");
            }
        );
        if(!scanning) {
            beaconDidRange.remove();
            beaconDidEnter.remove();
            beaconDidExit.remove();
            Beacons
                .stopRangingBeaconsInRegion(searchBeacon)
                .then(() => console.log('Beacons ranging stopped succesfully'))
                .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`));
            Beacons
                .stopMonitoringForRegion(searchBeacon)
                .then(() => console.log('Beacons monitoring stopped succesfully'))
                .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));
        }
    }, [scanning]);

    return (
        <View style={styles.detectBox}>
            <ScrollView>
                {
                    beaconData.map( (data, key) =>
                        (
                            <DetectedBeacon
                                beaconName={data.identifier}
                                beaconId={data.uuid}
                                intensity={data.intensity}
                                distance={data.distance}
                                key={key}
                            />
                        )
                    )
                }
            </ScrollView>
            <TouchableOpacity
                style={styles.scanButton}
                onPress={() => setScan(!scanning)}
            >
                <Text style={{color:"white", fontSize:20}}>
                    {(scanning) ?  "Scan en cour..." : "Scanner" }
                </Text>

                { scanning ?
                  <ActivityIndicator color="white" size="large"/>
		          :
		          null
		        }
	        </TouchableOpacity>
	        <Text style={styles.status}>{beaconStatus}</Text>
	    </View>
    )
}

const styles = StyleSheet.create({
    detectBox:{
	    flex:1,
	    flexDirection:"column",
	    justifyContent:"space-between",
	    alignItems:"center",
    },
    status:{
	    fontSize:15,
	    fontWeight:"bold",
    },
    scanButton:{
	    color:"white",
	    display:"flex",
	    flexDirection:"row",
	    justifyContent:"space-evenly",
	    alignItems:"center",
	    width:"50%",
	    borderRadius:6,
	    height:40,
	    backgroundColor:"#589cfc"
    },
})
