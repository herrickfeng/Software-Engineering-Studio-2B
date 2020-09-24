import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



export default function QuestionsListView(props) {

    return (
        <Box>
            <Box mx={10} mb={5}>
                <Card >
                    <CardContent>
                        <Typography>
                            What is 1+1?
                        </Typography>

                        <Divider variant="fullWidth" />

                        <Grid container>
                            <Grid item>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            a.
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            b.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            c.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            d.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>

            <Box mx={10} mb={5}>
                <Card >
                    <CardContent>
                        <Typography>
                            What is 1+1?
                        </Typography>

                        <Divider variant="fullWidth" />

                        <Grid container>
                            <Grid item>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            a.
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            b.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            c.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ margin: '10px' }}>
                                    <Grid item style={{ margin: '15px' }}>
                                        <Typography>
                                            d.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <TextField disabled id="outlined-basic" label="Answer Option" variant="outlined" style={{ width: '150ch' }} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>
         </Box>
    );
}