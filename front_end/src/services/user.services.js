import http from '../util/HTTP'

const getAllUserByName = (name)=>{
    return  http.get(`/?title=${name}`);
}
const getAllUsers = ()=>{
  return  http.get(`/users`);
}

const saveAll = (data) => {
    return http.post("/", data);
  };



const userService = {
    saveAll,
    getAllUsers,
    getAllUserByName,
}

export default  userService