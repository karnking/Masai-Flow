import axios from "axios"
import { ERROR, GET_COURSES, GET_QUESTIONS, LOAD } from "./actionType"

export const getCourse = () => async(dispatch)=> {
    try{
        dispatch({type:LOAD})
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/course`)
        dispatch({type:GET_COURSES,payload:res.data})
    }catch(error){
        console.log(error)
        dispatch({type:ERROR})
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export const getQuestions = () => async(dispatch)=> {
    try{
        dispatch({type:LOAD})
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/question`)
        let questions = shuffleArray(res?.data)
        dispatch({type:GET_QUESTIONS,payload:questions})
    }catch(error){
        console.log(error)
        dispatch({type:ERROR})
    }
}