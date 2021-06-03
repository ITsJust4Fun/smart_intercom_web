import React, {useEffect} from 'react'
import ReactPlayer from 'react-player'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Typography from '@material-ui/core/Typography'
import { gql, useMutation, useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useAuth } from './auth/AuthContext'
import Button from '@material-ui/core/Button'

interface Video {
    _id: string
    link: string
    time: string
    thumbnail: string
}

interface VideoData {
    videos: Video[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        card: {
            maxWidth: 360,
        },
        removeButton: {
            marginLeft: 'auto',
        },
        cardContent: {
            paddingBottom: 0,
        },
        progress: {
            marginTop: '3%'
        }
    }),
)

const VIDEOS_QUERY = gql`
query Videos {
  videos {
    _id
    time
    link
    thumbnail
  }
}
`

const REMOVE_VIDEO = gql`
mutation RemoveVideo($id: String!) {
  removeVideo(input: {id: $id}) {
    _id
    time
    link
    thumbnail
  }
}
`

export default function Videos() {
    const classes = useStyles()
    const setAuthState = useAuth()[1]

    const { loading, error, data, refetch } = useQuery<VideoData>(VIDEOS_QUERY)

    const [onRemoveHandler] = useMutation(REMOVE_VIDEO, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if ((error && !data)) {
            setAuthState(false)
        }
    }, [setAuthState, error, data])

    return (
        <Grid container className={classes.root} justify="center" spacing={3}>
            { loading ? (
                <CircularProgress className={classes.progress} />
            ) : data && data.videos.map(video => (
                <Grid key={video._id} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <ReactPlayer
                                allowFullScreen
                                height="203px"
                                width="360px"
                                justify="center"
                                url={video.link}
                                light={video.thumbnail}
                                controls
                                volume={1}
                                playing={true}
                            />
                        </CardActionArea>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="body1" color="textSecondary" component="span">
                                {'Time: ' + video.time}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant='contained'
                                className={classes.removeButton}
                                color='primary'
                                size='small'
                                startIcon={<DeleteForeverIcon />}
                                onClick={() => {
                                    onRemoveHandler({ variables: { id: video._id } })
                                    refetch()
                                }}
                            >
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}