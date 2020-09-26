import React from "react";
import { Container, Button, Box } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import TeacherSubjectListPage from "../teacherSubjectList";

export default function HomePage() {
  const { authState, setAuthState } = React.useContext(AuthContext);

  if (authState.authenticated) {
    return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
  } else {
    return (
      <Container>
        <Box display="flex" flexDirection="row-reverse">
            <Box mx={3}>
              <Button variant="outlined"color="primary" to="/login" component={Link}>
              Login
              </Button>
            </Box>
            <Box>
              <Button variant="outlined" color="primary" to="/signup" component={Link}>
              Sign Up
              </Button>
            </Box>
        </Box>
        
        <h1>Welcome to FAST</h1>

        

      <h2>Project Outline</h2>
      <p>The goal of this project was to design and create a multi-level authentication system that checks both teacher and student class attendance. This was to encourage greater accountability amongst both teachers and students for their timely attendance during class and to further engage both parties on a higher level.</p>

      <p>Our team has developed an interactive and intuitive web application that has three levels of authentication:
        <ul>
          <li>Facial recognition</li>
          <li>Real-time verification via interactive questions</li>
          <li>Location based authentication</li>
        </ul>
      </p>

      <h2>Users and Permissions</h2>
      <p>
      The system has three key user groups, where actions that can be accessed on the system differ depending on the user signed into the application.
      </p>

      <p>These user groups and their permissions include:</p>

      <ul>
        <li>Students</li>
          <ul>
            <li>Login and sign out with their student details.</li>
            <li>View subject list and class list for each subject.</li>
            <li>Add a new subject or class by entering a ‘class code’ that they were given by a teacher.</li>
            <li>Verify their location.</li>
            <li>Verify their attendance using facial recognition technology.</li>
            <li>View and answer interactive questions set by the teacher during class.</li>
            <li>View and edit their details in their student profile.</li>
            <li>View their attendance record for their previous classes.</li>      
          </ul>

        <li>Teachers</li>
          <ul>
            <li>Login and sign out with their teacher details.</li>
            <li>View subject list and class list for each subject.</li>
            <li>Add a new subject via a pop-up by entering the the subject name and code.</li>
            <li>Add a new class via a pop-up by entering the class name, date, time, and interactive questions.</li>
            <li>Verify their attendance using facial recognition technology.</li>
            <li>View real-time class roll detailing which authentication levels students have completed.</li>
            <li>Manually mark a students attendance.</li>
            <li>Add or delete a student from the roll.</li>
            <li>Export the class roll.</li>
            <li>Add or delete interactive attendance questions and set their availability duration.</li>
            <li>View and edit their details in their student profile.</li>
          </ul>

        <li>Admin</li>
          <ul>
            <li>Set or edit user roles.</li>
            <li>Add or delete users.</li>
            <li>Change user password and credentials.</li>
          </ul>
      </ul>

      <h2>Storing Information</h2>
      <p>
      This system employs a database using Firebase to store student and teacher information, including their credentials and facial images for authentication. 
      </p>

      <h2>Team Communication</h2>
      <p>
        All tasks were split and assigned to team members on Trello so that it was always transparent which tasks were being worked on, have been completed or still required additional progress.  
      </p>
      <p>
        Microsoft Teams was the main form of communication used for collaborating and holding meetings, while Facebook Messenger was used for general communication. 
        The code for this project can be found at our <a href="https://github.com/herrickfeng/Software-Engineering-Studio-2B">GitHub repository</a>.
      </p>

      <h2>Team Structure</h2>

      <h4>Management Team</h4>
      <ul>
        <li>Herrick Feng: Leader, Frontend Developer</li>
        <li>Andy Lee: Project Manager, Frontend Developer</li>
      </ul>

      <h4>Frontend Team</h4>
      <ul>
        <li>Agid Kaharuba: Frontend Lead</li>
        <li>David Osburn: Frontend Lead</li>
      </ul>

      <h4>Backend Team</h4>
      <ul>
        <li>Mitchell Murphy: Backend Lead</li>
        <li>Bryan Dinh: Backend Developer</li>
        <li>Brendon Tong: Backend Developer</li>
      </ul>

      <h4>Design Team</h4>
      <ul>
        <li>Andrew Do: UI Design, Frontend Developer</li>
        <li>Vanisha Singh: Design Lead, General Developer</li>
      </ul>
      
      <h4>Facial Recognition Team</h4>
      <ul>
        <li>Calvin Dong: Facial Recognition Lead, Backend Developer</li>
      </ul>
      </Container>
    )
  }
}