import {ROOT_URL} from '../untilities/constants.js'




export const fetchBoardDetail = async(id)=>{
   const request = await fetch(`${ROOT_URL}/v1/boards/${id}`) 
                           .then(response => response.json())
                           .then(data => data.result)

   return request
   
}
