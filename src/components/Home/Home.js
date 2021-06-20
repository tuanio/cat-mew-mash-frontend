import { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { backendRoute } from '../../helper';
import { baseUrl } from '../../helper';
import { Card, CardMedia, CardActionArea, Paper, Button, Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';


function Image(props) {
    const vote = async () => {
        let req = await fetch(`${backendRoute}/vote/${props.id}`);
        let res = await req.json();
        console.log(res.data);
    }

    const doVote = () => {
        vote();
        console.log(`vote for cat number ${props.id}`);
    };

    const doSomething = () => {
        doVote();
        props.loadImage();
    };


    return (
        <>
            <Card>
                <CardActionArea onClick={doSomething}>
                    <CardMedia
                        component="img"
                        alt="Image Cat"
                        // height="500px"
                        image={props.src}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        </>
    )
}

function Images(props) {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image
                        src={baseUrl + props.image1.path}
                        id={props.image1.id}
                        loadImage={props.loadImage}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Image
                        src={baseUrl + props.image2.path}
                        id={props.image2.id}
                        loadImage={props.loadImage}
                    />
                </Grid>
            </Grid>
        </>
    )
}

function Home(props) {
    const [image1, setImage1] = useState(0);
    const [image2, setImage2] = useState(0);

    const loadImage = async () => {
        let req = await fetch(`${backendRoute}/get-tournament`);
        let res = await req.json();
        res = res.data;
        setImage1(res[0]);
        setImage2(res[1]);
    }

    useEffect(() => {
        if (image1 === 0) loadImage();
    }, [image1, image2]);
    return (
        <>
            <Grid container spacing={1} justify="center">
                <Grid item md={12}>
                    <Paper>
                        <Button>
                            <Link href={`/leaderboard`}>
                                Bảng phong thần mèo
                            </Link>
                        </Button>
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper>
                        <Typography variant="h5" style={{ textAlign: "center" }}>
                            Chú mèo nào đáng yêu nhất nào.
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>
                            Bạn được toàn quyền quyết định, bạn trẻ à. Mew
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Images image1={image1} image2={image2} loadImage={loadImage} />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;