import * as api from '../api';
import { CREATE, UPDATE, FETCH_ALL, LIKE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data, currentPage, numberOfPages } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data, currentPage, numberOfPages })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } =  await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(`${error.message}`);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(`${error.message}`)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => { 
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);
    }
}