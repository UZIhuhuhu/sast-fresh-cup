import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Alert from "../plugin/alert";
import api from "../../api/index.js";
import "../../style/admin.css";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

let counter = 0;
function createData(questionId, id, answer, score) {
  counter += 1;
  return { countId: counter, questionId, id, answer, score };
}
function createQuestionData(questionId, user, username, answer, score) {
  counter += 1;
  return { id: counter, questionId, user, username, answer, score };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "questionId",
    numeric: false,
    disablePadding: true,
    label: "QuestionId"
  },
  { id: "ID", numeric: false, disablePadding: false, label: "ID" },
  { id: "Username", numeric: false, disablePadding: false, label: "Username" },
  { id: "answer", numeric: false, disablePadding: false, label: "Answer" },
  { id: "score", numeric: false, disablePadding: false, label: "Score" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, deleteQuestionById } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Question
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={deleteQuestionById}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  deleteQuestionById: PropTypes.func.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
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
  }
});

class Correct extends React.Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    data: [],
    rows: [],
    page: 0,
    rowsPerPage: 10,
    // departmentRange: ['软件研发中心', '电子部'],
    // department: '',
    questionId: "",
    radioValue: "",
    showCheckbox: true,
    showScoreTextField: false,
    alertStatus: false,
    alertText: "",
    disableNextIcon: false,
    maxPage: 0
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  toPreviousPage = () => {
    let page = this.state.page - 1;
    this.setState({
      page: page,
      disableNextIcon: false
    });
    if (!this.state.showCheckbox) {
      this.getQuestionInfoRequest(page);
    }
  };

  toNextPage = () => {
    let page = this.state.page + 1;
    this.setState({
      page: page,
      disableNextIcon: false
    });
    if (!this.state.showCheckbox) {
      this.getQuestionInfoRequest(page);
    }
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  deleteQuestionById = () => {
    let deleteArr = this.state.selected;
    // deleteArr.map(item => {
    //   this.deleteQuestionByIdRequest(item);
    // });
    deleteArr.forEach(item => {
      this.deleteQuestionByIdRequest(item);
    });
  };

  getQuestionInfoRequest = page => {
    const { questionId, radioValue, rowsPerPage } = this.state;
    let status = typeof page !== "number";
    if (status) {
      page = 0;
      this.setState({
        page: 0,
        data: [],
        disableNextIcon: false
      });
    }
    if (questionId) {
      if (questionId && !radioValue) {
        this.getQuestionInfoByIdRequest(questionId);
      } else if (
        (questionId && radioValue && page > this.state.maxPage) ||
        (page === 0 && status)
      ) {
        let prop = {
          questionId: questionId,
          pageNum: page + 1,
          pageSize: rowsPerPage,
          status: radioValue
        };
        this.setState({
          showScoreTextField: true
        });
        this.getQuestionInfoByStatusRequest(prop);
        this.setState({
          maxPage: page
        });
      }
      this.setState({
        showCheckbox: false
      });
    } else {
      this.getAllQuestionIdRequest();
    }
  };

  getQuestionInfoByIdRequest = id => {
    api.getQuestionInfo("/v1/question/" + id).then(res => {
      if (res.data.status === 200) {
        let data = [];
        let questionId = res.data.data.id;
        let choices = res.data.data.choices;
        choices.forEach(item => {
          let row = [];
          row.push(questionId, item.id, item.choice);
          data.push(createData(...row));
        });
        this.setState({
          data: data,
          showScoreTextField: false
        });
      } else {
        this.setState({
          alertStatus: true,
          alertText: "啥也没找到鸭"
        });
      }
    });
  };
  // getQuestionInfoByDepartmentRequest = prop => {
  //   api.getQuestionInfo('/v1/question/apartment/' + prop.department + '?pageNum=' + prop.pageNum + '&pageSize=' + prop.pageSize).then(res => {
  //     if (res.status === 200 && res.data.data.questions) {
  //       let data = []
  //       let questions = res.data.data.questions
  //       questions.map(item => {
  //         let row = []
  //         let choices = item.choices
  //         choices.map(choice => {
  //           row.push(item.id, choice.id, choice.choice)
  //           data.push(createData(...row))
  //         })
  //       })
  //       this.setState({
  //         data: data
  //       })
  //     } else {
  //       this.setState({
  //         alertStatus: true,
  //         alertText: '啥也没找到鸭'
  //       })
  //     }
  //   })
  // }
  getQuestionInfoByStatusRequest = prop => {
    if (prop.status === "done") {
      api
        .getQuestionInfo(
          "/v1/grade/check/" +
            prop.questionId +
            "?pageNum=" +
            prop.pageNum +
            "&pageSize=" +
            prop.pageSize
        )
        .then(res => {
          this.setQuestionData(res);
        });
    } else if (prop.status === "undone") {
      api
        .getQuestionInfo(
          "/v1/grade/uncheck/" +
            prop.questionId +
            "?pageNum=" +
            prop.pageNum +
            "&pageSize=" +
            prop.pageSize
        )
        .then(res => {
          this.setQuestionData(res);
        });
    }
  };
  setQuestionData = res => {
    if (res.data.status === 200) {
      let answers = res.data.data.answers;
      let newData = [];
      let data = this.state.data;
      answers.forEach(item => {
        let row = [];
        let answer = item.answer.split("€");
        row.push(
          item.question_id,
          item.user_id,
          item.username,
          "【" + answer[0] + "】 " + answer[1],
          item.score
        );
        newData.push(createQuestionData(...row));
      });
      data = data.concat(newData);
      this.setState({
        data: data
      });
    } else if (res.data.status === 404) {
      this.setState({
        disableNextIcon: true
      });
    }
  };
  getAllQuestionIdRequest = () => {
    api.getQuestionId().then(res => {
      if (res.data.status === 200) {
        let questions = res.data.data;
        let data = [];
        questions.forEach(item => {
          let id = createData(item);
          data.push(id);
        });
        this.setState({
          data: data
        });
        this.setState({ showCheckbox: true });
      } else {
        this.setState({
          alertStatus: true,
          alertText: "啥也没找到鸭"
        });
      }
    });
  };
  deleteQuestionByIdRequest = questionId => {
    api.deleteQuestion(questionId).then(res => {
      if (res.data.status === 200) {
        this.setState({
          alertStatus: true,
          alertText: "删除成功"
        });
      }
    });
  };
  setScoreProp = n => event => {
    let score = event.target.value;
    this.state.data.forEach(item => {
      if (item.questionId === n.questionId && item.user === n.user) {
        item.score = score;
      }
    });
  };
  submitScoreRequest = () => {
    let question_ids = [],
      scores_id = [],
      user_ids = [];
    this.state.data.forEach(item => {
      if (item.score) {
        question_ids.push(item.questionId);
        user_ids.push(item.user);
        scores_id.push(item.score);
      }
    });
    let postData = {
      question_ids: question_ids,
      scores_id: scores_id,
      user_ids: user_ids
    };
    api.submitScore(postData).then(res => {
      if (res.data.status === 200) {
        this.setState({
          alertStatus: true,
          alertText: "提交成功"
        });
      } else {
        this.setState({
          alertStatus: true,
          alertText: "提交失败"
        });
      }
    });
  };
  toggleAlertStatus = () => {
    this.setState({
      alertStatus: false
    });
  };
  componentDidMount() {
    this.getAllQuestionIdRequest();
  }
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <div className="correct-container">
        <Alert
          hintMessage={this.state.alertText}
          open={this.state.alertStatus}
          callBack={this.toggleAlertStatus}
        />
        <div className="search-container">
          <div className="search-textField">
            {/* <TextField select label="部门" className={classNames(classes.margin, classes.textField)} value={this.state.department} onChange={this.handleChange('department')}>
              {this.state.departmentRange.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              id="standard-search"
              label="输入题目的ID"
              type="search"
              className={classNames(classes.margin, classes.textField)}
              margin="normal"
              onChange={this.handleChange("questionId")}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.getQuestionInfoRequest}
            >
              搜索
            </Button>
          </div>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              className={classes.group}
              value={this.state.radioValue}
              onChange={this.handleChange("radioValue")}
            >
              <FormControlLabel
                value="done"
                control={<Radio color="primary" />}
                label="已批改"
                labelPlacement="end"
              />
              <FormControlLabel
                value="undone"
                control={<Radio color="primary" />}
                label="未批改"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="table-container" />
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            deleteQuestionById={this.deleteQuestionById}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.questionId);
                    return (
                      <TableRow
                        hover
                        onClick={
                          this.state.showCheckbox
                            ? event => this.handleClick(event, n.questionId)
                            : null
                        }
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          {this.state.showCheckbox ? (
                            <Checkbox checked={isSelected} />
                          ) : null}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.questionId}
                        </TableCell>
                        <TableCell>{n.user}</TableCell>
                        <TableCell>{n.username}</TableCell>
                        <TableCell>{n.answer}</TableCell>
                        <TableCell>
                          {!this.state.showCheckbox &&
                          this.state.showScoreTextField ? (
                            <TextField
                              id="outlined-bare"
                              className={classes.textField}
                              defaultValue={n.score}
                              margin="dense"
                              variant="outlined"
                              onChange={this.setScoreProp(n)}
                            />
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <div className="tableFooter">
          <IconButton
            disabled={page === 0}
            aria-label="Previous Page"
            onClick={this.toPreviousPage}
          >
            <KeyboardArrowLeft />
          </IconButton>
          {!this.state.showCheckbox && this.state.showScoreTextField ? (
            <Button
              className="submitScoreBtn"
              variant="contained"
              color="primary"
              // eslint-disable-next-line
              className={classes.button}
              onClick={this.submitScoreRequest}
            >
              上传成绩
            </Button>
          ) : null}
          <IconButton
            disabled={this.state.disableNextIcon}
            aria-label="Next Page"
            onClick={this.toNextPage}
          >
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </div>
    );
  }
}

Correct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Correct);
