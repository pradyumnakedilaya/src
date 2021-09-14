import '@fontsource/roboto';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link'
import React from 'react';
import  {Route as Router} from 'react-router-dom';
import { Route,NavLink,HashRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    root: {
        "& > *": {
          margin: theme.spacing(1),
          width: "100%"
        }      
    },
    table: {
        minWidth: 650,
      }
}));

function createData(name,no_of_questions_posted,no_of_answers) {
    return { name, no_of_questions_posted,no_of_answers };
  }  

function SearchUser(props)
{
    const classes = useStyles();
    const params = useParams();
    const [notes,setNotes]=useState([])
    const rows=[]
    var notes1=[]
    const preventDefault = (event) => event.preventDefault();
    var name=params.name
    var qcount=0
    var anscount=0
      useEffect(()=>{
        fetch(`http://localhost:3300/searchcusts/${name}`)
        .then(res=>res.json())
        .then(data=>{setNotes(data)
            notes1=data
            notes1.map(e=>{
                fetch(`http://localhost:5050/users/${e.Id}/totalquestions`,{
                method:'GET',
                headers:{"Content-type":"application/json"}
                })
                .then(res=>res.json())
                .then(data=>{qcount=data
                })
                .then(()=>{
                    fetch(`http://localhost:5050/users/${e.Id}/totalanswers`,{
                        method:'GET',
                        headers:{"Content-type":"application/json"}
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        anscount=data
                    })
                }) 
                .then(()=>{
                    rows.push(createData(e.displayName,qcount,anscount))
                    console.log(rows)
                })                           
            })
        })
    },[])
    
    return(
        <div>
            <NavBar/>
        <form action="" name = "searchuser" className ={classes.root}>
        <Typography gutterBottom variant="h4" component="h4">
            <b>Search Results </b>
        </Typography>
        <Divider/>
        <Box>
        {rows.length}
        {rows.map(note=>( 
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center"><b>Name</b></TableCell>
                        <TableCell align="center"><b>No of questions posted</b></TableCell>
                        <TableCell align="center"><b>No of answers</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell component="th" scope="row" align="center">
                            {note.name}
                        </TableCell>
                        <TableCell align="center">{note.no_of_questions_posted}</TableCell>
                        <TableCell align="center">{note.no_of_answers}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            ))}
            </Box>
        </form>
        </div>
    )
}

export default SearchUser