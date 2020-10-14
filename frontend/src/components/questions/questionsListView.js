import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function QuestionsListView(props) {
    const answerBox = (answer, i, j) => {
        return (
            <Grid container style={{ margin: '10px' }}>
                <Grid item style={{ margin: '15px' }}>
                    <Typography>
                        {`${String.fromCharCode(j + 97)}.`}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        <TextField
                            defaultValue={answer.text}
                            disabled={props.state.disabled}
                            id="outlined-basic"
                            label="Answer Option"
                            variant="outlined"
                            style={{ width: '150ch' }}
                            onChange={(e) => {
                                answer.text = e.target.value;
                                props.handleAnswerChange(i, j, answer);
                            }}
                        />
                    
                    {/* TODO: Clean up correct checkbox button */}

                    <Checkbox
                            name="facial"
                            color="secondary"
                        type="checkbox"
                        checked={answer.correct}
                        disabled={props.state.disabled}
                        onChange={(e) => {
                            answer.correct = !answer.correct;
                            props.handleAnswerChange(i, j, answer);
                        }}
                        />
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    const questionBox = (question, index) => {
        return (
            <Box mx={35} mb={5}>
                <Card >
                    <CardContent>
                        <Typography>
                            <TextField
                                disabled={props.state.disabled}
                                defaultValue={question.question}
                                id="outlined-basic"
                                label="Question Option"
                                variant="outlined"
                                style={{ width: '156ch' }}
                                onChange={(e) => props.handleQuestionChange(index, e.target.value)}
                            />
                        </Typography>

                        <Divider variant="fullWidth" />

                        <Grid container>
                            <Grid item>
                                {question.answers.map((answer, j) => {
                                    return answerBox(answer, index, j)
                                })}
                            </Grid>
                        </Grid>
                        {/* TODO: Clean up Add/Remove button */}
                        {!props.state.disabled && (
                            <>
                                <Box my={2} display="flex" justifyContent="center" alignItems="center">
                                    <Box mx={2}>
                                        <Button variant="outlined"
                                            color="primary"
                                            onClick={() => props.handleAddAnswerBox(index)}>
                                            Add Response
                                        </Button>
                                    </Box>

                                    <Box mx={2}>
                                        <Button variant="outlined"
                                            color="secondary"
                                            onClick={() => props.handleRemoveAnswerBox(index)}>
                                            Remove Response
                                    </Button>
                                    </Box>
                                </Box>
                            </>
                        )}
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
            {/* TODO: Clean up Add/Remove button */}
            {!props.state.disabled && (
                <>
                    <Box my={2} display="flex" justifyContent="center" alignItems="center">
                        <Box mx={2}>
                            <Button variant="outlined"
                                color="primary"
                                onClick={props.handleAddQuestionBox}>
                                Add Question
                                        </Button>
                        </Box>

                        <Box mx={2}>
                            <Button variant="outlined"
                                color="secondary"
                                onClick={props.handleRemoveQuestionBox}>
                                Remove Question
                                    </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}