import React from "react";
import { Button, Container } from "@material-ui/core";
import ClassSlot from "../../components/classSlot/index";
import ClassSlotOption from "../../components/classSlot/ClassSlotOption";
import { Link } from "react-router-dom";


export default function StudentClassPage() {
  return (
    <Container>
      <ClassSlot>
        <ClassSlotOption completed>
          View Class Questions
        </ClassSlotOption>

        <ClassSlotOption incompleted>
          Verify Location (Optional)
        </ClassSlotOption>
      </ClassSlot>

      <Button mt={6} variant="outlined" color="primary" component={Link} to="/student/classList">Back</Button>
    </Container>
  );
}