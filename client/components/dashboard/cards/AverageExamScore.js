import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles, useTheme, withStyles} from '@material-ui/styles'
import {
  // Card,
  Paper,
  // CardHeader,
  CardContent,
  // IconButton,
  // Divider,
  Typography
} from '@material-ui/core'
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import TabletMacIcon from '@material-ui/icons/TabletMac';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%',
    width: '27%',
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 'inherit',
    fontWeight: 700,
    margin: '.5em'
    // color: '#1663de'
  },
  chartContainer: {
    position: 'relative',
    height: '100px'
  },
  stats: {
    marginTop: theme.spacing(0),
    display: 'flex',
    justifyContent: 'center'
  },
  score: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  scoreIcon: {
    color: theme.palette.icon
  }
}))

const AverageExamScore = props => {
  const {className, ...rest} = props

  const avgScore =
    props.studentExam.reduce((accumulator, score) => {
      return score.total + accumulator
    }, 0) / props.studentExam.length

  const totalDiff = 1600 - avgScore

  const avgPercentage = `${(avgScore / 1600 * 100).toFixed(1)}%`

  const classes = useStyles()
  const theme = useTheme()

  const data = {
    datasets: [
      {
        data: [avgScore, totalDiff],
        backgroundColor: [
          theme.palette.secondary.light,
          theme.palette.primary.light,
          theme.palette.warning.main
        ],
        borderWidth: 1,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Avg Score', 'Avg Missed']
  }

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 75,
    layout: {padding: 0},
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
    // formatter: value => {
    //   return value
    // }
  }

  const scores = [
    {
      title: 'Avg Score',
      value: avgScore,
      color: theme.palette.primary.main
    },
    {
      title: 'Avg Missed',
      value: totalDiff,
      color: theme.palette.primary.light
    }
  ]

  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <Typography
        className={classes.title}
        color="textSecondary"
        // gutterBottom
        variant="body2"
      >
        AVG EXAM SCORE
      </Typography>
      {/* <CardHeader variant="body2" title="Avg Exam Score" /> */}
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
          {/* <Typography align='center' position='absolute'></Typography> */}
        </div>
        <div className={classes.stats}>
          {/* <span className={classes.deviceIcon}>{device.icon}</span> */}
          <Typography>{avgPercentage}</Typography>
        </div>
      </CardContent>
    </Paper>
  )
}

AverageExamScore.propTypes = {
  className: PropTypes.string
}

export default AverageExamScore
