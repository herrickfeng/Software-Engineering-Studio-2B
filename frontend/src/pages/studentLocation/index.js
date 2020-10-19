import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container, Button, Box } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import api from "../../helpers/api"
import { geolocated } from "react-geolocated";

function StudentLocation(props) {
  const { authState, setAuthState } = React.useContext(AuthContext);
  const subjectId = props.match.params.subjectId;
  const classId = props.match.params.classId;
  const [path, setPath] = useState(undefined);
  const [state, setState] = useState(undefined);
  const [message, setMessage] = React.useState(undefined);

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    if (subject.path === undefined) {
      subject.path = []
    }
    setState(subject);
    setPath(subject.path);
  };

  useEffect(() => {
    if (path === undefined) {
      fetchData();
    }
  });

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
    },
    []
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  async function verifyLocation() {
    const coords = {
      latitude: props.coords.latitude,
      longitude: props.coords.longitude
    }
    const res = await api.subject.attend.location(authState.user.idToken, subjectId, classId, authState.user.uid, coords)
    setMessage(res.data.data.msg)
  }

  return (
    <Container>
      <h1>Location Authentication</h1>

      <Box my={2} display="flex" justifyContent="center">
        {message ? <p> {message} </p> : null}
      </Box>
      <Box my={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={verifyLocation}>
          Verify my location
        </Button>
      </Box>
      <div>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyCbvf26xF96Lx1RIG6hpCP5-JFjJUkobQg"
          language="en"
          region="us"
        >
          <GoogleMap
            mapContainerClassName="App-map"
            center={{
              lat: props.coords ? props.coords.latitude : -33.8832,
              lng: props.coords ? props.coords.longitude : 151.2005
            }}
            zoom={17}
            version="weekly"
            on
          >
            <>
              <Polygon
                path={path}
                onLoad={onLoad}
                onUnmount={onUnmount}
              />
              {props.coords && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} label="You" />}
            </>
          </GoogleMap>
        </LoadScript>
      </div>
      <Box my={3} display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary" component={Link} to={`/student/subject/${subjectId}/class/${classId}`}>
          Back
        </Button>
      </Box>
    </Container>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
  watchPosition: true,
})(StudentLocation);