import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Radio } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

export default function QuestionsListView(props) {
    const answerBox = (answer, i, j) => {
        return (
            <Grid container style={{ margin: '10px' }}>
                <Grid container item style={{ margin: '15px' }} 
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        checked={answer.correct}
                        onChange={(e) => {
                            console.log(answer)
                            answer.correct = !answer.correct;
                            props.handleAnswerChange(i, j, answer);
                        }}
                    />
                    <Typography>
                        {answer.text}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    const questionBox = (question, index) => {
        return (
            <Box mx={10} mb={5}>
                <Card >
                    <CardContent>
                        <Typography>
                            {question.question}
                        </Typography>

                        <Divider variant="fullWidth" />

                        <Grid 
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid 
                                item 
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                {question.answers.map((answer, j) => {
                                    return answerBox(answer, index, j)
                                })}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }

    return (
        <Box>
            {props.state.questions.map((question, index) => {
                return questionBox(question, index)
            })}
        </Box>
    );
}