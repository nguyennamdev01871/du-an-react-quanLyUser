
import axios from './costomer-axios';

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};


const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name, job })
}
const putupdateUser = (name, job,id) => {
  return axios.put(`/api/users/${id}`, { name, job });
}


const deleteupdateUser = (id) => {
  return axios.delete(`/api/users/${id}`);
}

export { fetchAllUser, postCreateUser, putupdateUser ,deleteupdateUser};
