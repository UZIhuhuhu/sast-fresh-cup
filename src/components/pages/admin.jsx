import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Alert from '../plugin/alert'
import api from '../../api/index.js'
import admin from '../../style/admin.css'
import axios from "axios";

const styles = theme => ({
  container: {
    display: 'block',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  input: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
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

class Admin extends React.Component {
  state = {
    weightRange: ''
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <div className="admin-container">
        <div class="container-column">
          <div className="container-content">
            <h2>批量注册</h2>
            <div className="button-container">
              <Button variant="contained" color="primary" className={classes.button} onClick={this.downloadRegisterExcelRequest}>
                下载模版
              </Button>
            </div>
            <h4 className={classes.margin}>未选择文件</h4>
            <div className="button-container">
              <Button variant="contained" color="primary" className={classes.button}>
                选择文件
              </Button>
              <Button variant="contained" color="default" className={classes.button} onClick={this.uploadResgisterExcelRequest}>
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </div>
          </div>
          <div className="container-content">
            <h2>批量添加题目</h2>
            <div className="button-container">
              <Button variant="contained" color="primary" className={classes.button} onClick={this.downloadQuestionExcelRequest}>
                下载模版
              </Button>
            </div>
            <h4 className={classes.margin}>未选择文件</h4>
            <div className="button-container">
              <Button variant="contained" color="primary" className={classes.button}>
                选择文件
              </Button>
              <Button variant="contained" color="default" className={classes.button} onClick={this.uploadQuestionExcelRequest}>
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </div>
          </div>
        </div>
        <div class="container-column">
          <div className="container-content">
            <h2>添加题目</h2>
            <div className="container-form">
              <form className={classes.container} noValidate autoComplete="off">
                <div>
                  <TextField
                    select
                    label="Choose your department"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.weightRange}
                    onChange={this.handleChange('weightRange')}
                  >
                    {ranges.map(option => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField id="standard-dense" label="题目内容" className={classNames(classes.textField, classes.dense)} margin="dense" />
                </div>
              </form>
              <div className="button-container">
                <Button variant="contained" color="primary" className={classes.button}>
                  添加选项
                </Button>
                <Button variant="contained" color="primary" className={classes.button}>
                  提交
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
