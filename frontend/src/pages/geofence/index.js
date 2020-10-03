import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import api from "../../helpers/api"

import "./styles.css";

export default function GeoFence(props) {
  const { authState, setAuthState } = React.useContext(AuthContext);
  const subjectId = props.match.params.subjectId;
  const [path, setPath] = useState(undefined);
  const [state, setState] = useState(undefined);

  const fetchData = async () => {
    const subject = (await api.subject.get(authState.user.idToken, subjectId)).data.data;
    if (subject.path === undefined){
      subject.path = [
        { lat: -33.88279028529906, lng: 151.20092378902436 },
        { lat: -33.883389068048494, lng: 151.19960221824647 },
        { lat: -33.88426395513446, lng: 151.20014746494294 },
        { lat: -33.8837497927527, lng: 151.2014797645569 }
      ]
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

  async function savePath() {
    state.path = path;
    console.log(state)
    console.log("Geofence saved");
    await api.admin.subject.update(authState.user.idToken, subjectId, state);
  }

  return (
    <Container>
      <h1>UTS Geofence</h1>
      <div>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyCbvf26xF96Lx1RIG6hpCP5-JFjJUkobQg"
          language="en"
          region="us"
        >
          <GoogleMap
            mapContainerClassName="App-map"
            center={{ lat: -33.8832, lng: 151.2005 }}
            zoom={17}
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
      <Button onClick={savePath}>
        Create
        </Button>
    </Container>
  )
}