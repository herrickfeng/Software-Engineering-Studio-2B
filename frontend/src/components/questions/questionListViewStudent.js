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

export default function QuestionsListView(props) {
    const answerBox = (answer, i, j) => {
        return (
            <Grid container style={{ margin: '10px' }}>
                <Grid item style={{ margin: '15px' }}>
                    {/* TODO add radio button */}
                    <Typography>
                        {`${String.fromCharCode(j + 97)}.`}
                    </Typography>
                </Grid>
                <Grid item >
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

                        <Grid container>
                            <Grid item>
                                {/* TODO radio group */}
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