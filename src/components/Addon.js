import { useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core'; 
import ReactPlayer from 'react-player'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import { IconButton } from '@material-ui/core';

function SoundButton(props) {
    const [buttonIcon, setButtonIcon] = useState(<VolumeMuteIcon />);
    const [flag, setFlag] = useState(true);
    
    const doClick = () => {
        if (flag === true) {
            setButtonIcon(<VolumeUpIcon />);
        } else {
            setButtonIcon(<VolumeMuteIcon />);
        }
        setFlag(!flag);
    };

    return (
        <>
            <Grid container justify="center">
                <Grid item md={12} xs={12}>
                    <Paper>
                        <IconButton color="primary" onClick={doClick}>
                            {
                                buttonIcon
                            }
                            <Typography>
                                cute songs to help you cope with depression
                            </Typography>
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper>
                        <ReactPlayer
                            url="https://youtu.be/eSH7QSzkhQg"
                            loop
                            playing={flag}
                            width={0}
                            height={0}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default SoundButton;