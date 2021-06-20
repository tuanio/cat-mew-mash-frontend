import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { backendRoute } from '../../helper';
import { baseUrl } from '../../helper';
import { Card, CardMedia, CardActionArea, Typography } from '@material-ui/core';

function Catview(props) {
    console.log(props.src);
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
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}

function Leaderboard(props) {
    const [listCat, setListCat] = useState([]);

    useEffect(() => {
        async function loadImage() {
            let req = await fetch(`${backendRoute}/get-leaderboard`);
            let res = await req.json();
            res = res.data;
            setListCat(res);
        }
        loadImage();
        console.log(listCat);
    }, [listCat])


    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h5" style={{textAlign: "center"}}>
                        Top 10 chú mèo đáng yêu nhất vũ trụ
                    </Typography>
                </Grid>
                {
                    listCat.map(item => 
                        <Catview src={baseUrl + item.path} />
                    )
                }
                <Grid item md={12}>
                    <Paper>
                        <Typography style={{textAlign: "center"}}>
                            Chú mèo nào được chọn nhiều nhất từ tất cả quý vị sẽ được nhảy lên trên đây ngồi á nha.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Leaderboard;