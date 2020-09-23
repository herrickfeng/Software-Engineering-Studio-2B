import React, { useState, useRef, useCallback } from "react";
import { Container, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";

import "./styles.css";

export default function GeoFence() {
  const { authState, setAuthState } = React.useContext(AuthContext);

  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 }
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log("The path state is", path);

  if (authState.authenticated) {
    return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" /> : <Redirect to="/student/dashboard" />;
  } else {
    return (
      <Container>
        <h1>UTS Geofence</h1>
        <div className="App">
          <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyCbvf26xF96Lx1RIG6hpCP5-JFjJUkobQg"
            language="en"
            region="us"
          >
            <GoogleMap
              mapContainerClassName="App-map"
              center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
              zoom={12}
              version="weekly"
              on
            >
              <Polygon
                // Make the Polygon editable / draggable
                editable
                draggable
                path={path}
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                onLoad={onLoad}
                onUnmount={onUnmount}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <Button>
          Create
        </Button>
      </Container>
    )
  }
}