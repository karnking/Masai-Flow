import axios from "axios"
import { ERROR, GET_COURSES, LOAD } from "./actionType"

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