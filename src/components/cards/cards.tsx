import { Button, Icon, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, withRouter} from 'react-router-dom';
import { SingleCardType } from '../../api/api';
import { addSinglePack, getSinglePack } from '../../redux/reducers/singleCard';
import { RootStateType } from '../../redux/store';
import Preloader from '../preloader/spinner';
import classes from './cards.module.scss'
import DeleteIcon from "@material-ui/icons/Delete";

const Cards = () => {
  const { id } = useParams<{ id: string }>();
 const isAuthorised = useSelector<RootStateType, boolean>((state) => state.profile.isAuthSuccess)
  useEffect(() => {
    !isAuthorised && history.push("/login");
    id && dispatch(getSinglePack(id));
  }, []);
  const dispatch = useDispatch()
  const cardPack = useSelector<RootStateType, Array<SingleCardType>>((state) => state.singlePack.card)
  const isLoading = useSelector<RootStateType, boolean>((state) => state.singlePack.loading)
 
  //  const cardId= useSelector<RootStateType, string>((state) => state.singlePack.card[0].cardsPack_id)
  
  const history = useHistory();
    const CustomTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: "green",
        color: "black",
        fontSize: 24,
      },
      body: {
        fontSize: 20,
        background: "rgba(191, 191, 191, .7)",
      },
    }))(TableCell);
  
  const onCardAdd = (id: string) => {
    dispatch(addSinglePack(id));
  }
  const rows = cardPack.map((el) => {
    return (
      <TableRow key={el._id}>
        <CustomTableCell component="th" scope="row">
          {el.answer}
        </CustomTableCell>
        <CustomTableCell align="right">{el.question}</CustomTableCell>
        <CustomTableCell align="right">{el.grade}</CustomTableCell>
        <CustomTableCell align="right">{el.rating}</CustomTableCell>
        <CustomTableCell align="right">{el.shots}</CustomTableCell>
        <CustomTableCell align="right">
          <Button
            // disabled={myId !== el.user_id}
            variant="contained"
            color="primary"
            // className={classes.button}
            // onClick={() => onUpdated(el._id)}
          >
            update
          </Button>
        </CustomTableCell>
        <CustomTableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            // disabled={myId !== el.user_id}
            // onClick={() => deleteHandler(el._id)}
          >
            Delete
            <DeleteIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => onCardAdd(el.user_id)}
          >
            <Icon className={classes.rightIcon} color="primary">
              add
            </Icon>
            pack
          </Button>
        </CustomTableCell>
      </TableRow>
    );
  })
  return (
    <div className={classes.Cards}>
      <Typography gutterBottom variant="h3" component="h4">
        Card Packs{" "}

      </Typography>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead style={{ borderRadius: "3px" }}>
                <TableRow>
                  <CustomTableCell>Answer</CustomTableCell>
                  <CustomTableCell align="right">Question</CustomTableCell>
                  <CustomTableCell align="right">Grade</CustomTableCell>
                  <CustomTableCell align="right">Rating</CustomTableCell>
                  <CustomTableCell align="right">Shoots</CustomTableCell>
                  <CustomTableCell align="right">Update</CustomTableCell>
                  <CustomTableCell align="right">Delete</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </Paper>
        </>
      )}
    </div>
  );
}
export default withRouter(Cards)