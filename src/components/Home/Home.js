import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { backendRoute } from '../../helper';
import { baseUrl } from '../../helper';
import { Card, CardMedia, CardActionArea, Paper, Button, Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import SoundButton from '../Addon';

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
                        height={"500em"}
                        image={props.src}
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
        </>
    );
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
            <Container>
                <Grid container spacing={1} justify="center">
                    <Grid item md={8} xs={12}>
                        <Paper>
                            <Button>
                                <Link href={`/leaderboard`}>
                                    <Typography variant="h6" style={{ fontFamily: "Open Sans" }}>
                                        B???ng phong th???n m??o
                                    </Typography>
                                </Link>
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <SoundButton />
                    </Grid>
                    <Grid item md={12}>
                        <Paper>
                            <Typography variant="h6" style={{ textAlign: "center" }}>
                                Ch?? m??o n??o ????ng y??u nh???t n??o
                            </Typography>
                            <Typography style={{ textAlign: "center" }}>
                                B???n ???????c to??n quy???n quy???t ?????nh, b???n tr??? ??. Meoww
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={12}>
                        <Images image1={image1} image2={image2} loadImage={loadImage} />
                    </Grid>
                    <Grid item md={12}>
                        <Paper>
                            <Typography style={{ textAlign: "center" }}>
                                C??? ch???n ch?? m??o n??o b???n th??ch, h??? th???ng s??? g???i cho b???n xem nh???ng ch?? m??o kh??c, r???i ch??ng s??? l???i ?????u v???i nhau. Nh???ng ch?? m??o ???????c ch???n nhi???u nh???t s??? n???m tr??n top b???ng phong th???n ????.
                            </Typography>
                        </Paper>
                        <Paper>
                            <Typography style={{ textAlign: "center" }}>
                                Made with ???? by tuanio. But tuanio s??? kh??ng ch???u tr??ch nhi???m khi t??? d??ng c?? m???t c?? h???, s?? t??? hay l?? ch?? ch?? n??o ???? gi??? d???ng m??o ????? ??i v??o cu???c thi n??y ????u nha. 
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home;