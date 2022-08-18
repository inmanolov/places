import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import  FileBase  from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles.js';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId ,setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [filed, setFiled] = useState(false);

    useEffect(() => {
        if(post) setPostData(post);

    }, [post])

    useEffect(() => {
        if(postData.selectedFile !== '' && postData.title !== '' && postData.message !== '' && postData.tags !== '') {
            setFiled(true);
        }
    }, [{...postData}]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        if(currentId === 0) {
            dispatch(createPost({...postData, name: user?.result?.name }, history));
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
        }
        clear();
    }   

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    const Warning = () => {
        return(
            <h3>Fill all fields in order to submit</h3>
        )
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories or like other's memories.
                </Typography>
            </Paper>
        )
    }

    return(
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Place</Typography>        
                <TextField 
                    name="title"
                    variant="outlined"
                    label="Title"
                    required
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField 
                    name="message"
                    variant="outlined"
                    label="Message"
                    required
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField 
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    required
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                {!filed ? (<Warning />) : (       
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>Submit</Button>
                )}
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;