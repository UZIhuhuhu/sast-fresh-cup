import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit * 3
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const ranges = [
    {
      value: '软件研发中心',
      label: 0
    },
    {
      value: '电子部',
      label: 1
    }
  ]

class Correct extends React.Component {
  state = {
    value: '',
    weightRange:''
  }

  handleRadioChange = event => {
    this.setState({ value: event.target.value })
  }
  handleSelectChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { classes } = this.props
    const bull = <span className={classes.bullet}>•</span>

    return (
      <div className="correct-container">
        <div class="search-container">
          <div class="search-textField">
            <TextField
              select
              label="Choose your department"
              className={classNames(classes.margin, classes.textField)}
              value={this.state.weightRange}
              onChange={this.handleSelectChange('weightRange')}
            >
              {ranges.map(option => (
                <MenuItem key={option.label} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="standard-search" label="输入题目的ID" type="search" className={classNames(classes.margin, classes.textField)} margin="normal" />
            <Button variant="contained" color="primary" className={classes.button}>
              搜索
            </Button>
          </div>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup row aria-label="status" name="status" className={classes.group} value={this.state.value} onChange={this.handleRadioChange}>
              <FormControlLabel value="done" control={<Radio color="primary" />} label="已批改" labelPlacement="end" />
              <FormControlLabel value="undone" control={<Radio color="primary" />} label="未批改" labelPlacement="end" />
            </RadioGroup>
          </FormControl>
        </div>
        <div class="card-container">
          <Card className={classNames(classes.margin, classes.card)}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                be
                {bull}
                nev
                {bull}o{bull}
                lent
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Correct)
