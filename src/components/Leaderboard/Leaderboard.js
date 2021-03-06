import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { backendRoute } from '../../helper';
import { baseUrl } from '../../helper';
import { Card, CardMedia, CardActionArea, Typography, Paper, CardContent, Container } from '@material-ui/core';
import SoundButton from '../Addon';

function Catview(props) {
    return (
        <>
            <Grid item md={3} xs={6}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Image Cat"
                            image={props.src}
                            // height="400px"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Vote: {props.ranking}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}

function Leaderboard(props) {
    const [listCat, setListCat] = useState([]);
    const [allVote, setAllVote] = useState(0);

    useEffect(() => {
        async function loadImage() {
            let leaderboardReq = await fetch(`${backendRoute}/get-leaderboard`);
            let leaderboardRes = await leaderboardReq.json();
            leaderboardRes = leaderboardRes.data;
            setListCat(leaderboardRes);

            let voteReq = await fetch(`${backendRoute}/get-all-vote`);
            let voteRes = await voteReq.json();
            voteRes = voteRes.data;
            setAllVote(voteRes);
        }
        loadImage();
    }, [listCat]);

    return (
        <>
            <Container>
                <Grid container spacing={1} justify="center">
                    <Grid item md={8} xs={12}>
                        <Paper>
                            <Typography variant="h5" style={{ textAlign: "center" }}>
                                Top 10 ch?? m??o ????ng y??u nh???t v?? tr??? ????
                            </Typography>
                        </Paper>
                        <Paper>
                            <Typography variant="h5" style={{ textAlign: "center" }}>
                                Nh???ng ch?? m??o ??? ????y ???? ?????ng ?????u tr??n t???ng s??? {allVote} vote ???? nha ????
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <SoundButton />
                    </Grid>
                    {
                        listCat.map(item => 
                            <Catview src={baseUrl + item.path} ranking={item.ranking} />
                        )
                    }
                    <Grid item md={12}>
                        <Paper>
                            <Typography style={{ textAlign: "center" }}>
                                Ch?? m??o n??o ???????c ch???n nhi???u nh???t t??? t???t c??? qu?? v??? s??? ???????c nh???y l??n tr??n ????y ng???i ?? nha.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Leaderboard;