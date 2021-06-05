import React, { useEffect } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { CardActions, CardHeader, IconButton } from '@material-ui/core'
import { useAuth } from './auth/AuthContext'
import { gql, useMutation, useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        card: {
            maxWidth: 345,
        },
        warning: {
            color: '#d4cf4e',
        },
        error: {
            color: '#e34949',
        },
        ok: {
            color: '#42c945',
        },
        progress: {
            marginTop: '3%'
        },
    }),
)

export interface Report {
    _id: string
    level: number
    time: string
    title: string
    body: string
    isViewed: boolean
}

export interface ReportData {
    reports: Report[]
}

const REPORTS_QUERY = gql`
query Reports {
  reports {
    _id
    level
    time
    title
    body
    isViewed
  }
}
`

const REMOVE_REPORT = gql`
mutation RemoveReport($id: String!) {
  removeReport(input: {id: $id}) {
    _id
    level
    time
    title
    body
    isViewed
  }
}
`

const VIEW_REPORT = gql`
mutation ViewReport($id: String!) {
  viewReport(input: {id: $id}) {
    _id
    level
    time
    title
    body
    isViewed
  }
}
`

interface ReportsProps {
    setUnviewedCount: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Reports(props: ReportsProps) {
    const { setUnviewedCount } = props
    const classes = useStyles()
    const iconsAvatar = [<CheckCircleIcon className={classes.ok} />,
        <WarningIcon className={classes.warning} />,
        <ErrorIcon className={classes.error} />
    ]

    const setAuthState = useAuth()[1]

    const {loading, error, data, refetch} = useQuery<ReportData>(REPORTS_QUERY)

    const [onRemoveHandler] = useMutation(REMOVE_REPORT, {
        onError: (error) => {
            console.log(error)
        }
    })

    const [onViewHandler] = useMutation(VIEW_REPORT, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if ((error && !data)) {
            setAuthState(false)
        }

        if (data && data.reports) {
            let unviewedCount = 0

            for (let report of data.reports) {
                if (!report.isViewed) {
                    unviewedCount++
                }
            }

            setUnviewedCount(unviewedCount)
        }
    }, [setAuthState, error, data, setUnviewedCount])

    return (
        <Grid container className={classes.root} justify='center' spacing={3}>
            {loading
                ? <CircularProgress className={classes.progress} />
                : data && data.reports.map((report) => (
                <Grid key={report._id} item>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                iconsAvatar[report.level % 3]
                            }
                            title={report.title}
                            subheader={report.time}
                        />
                        <CardContent>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                {report.body}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label='Delete'
                                onClick={ () => {
                                    onRemoveHandler({variables: {id: report._id}})
                                    refetch()
                                }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            {
                                report.isViewed
                                ? ''
                                : <IconButton
                                        aria-label='Viewed'
                                        onClick={ () => {
                                            onViewHandler({variables: {id: report._id}})
                                            refetch()
                                        }}
                                    >
                                    <VisibilityIcon/>
                                </IconButton>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
