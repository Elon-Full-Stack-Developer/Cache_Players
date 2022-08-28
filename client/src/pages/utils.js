import axios from 'axios';

const GetAll = (url) => axios.get(url);

const Add = (url, obj) => axios.post(url, obj);

const Edit = (url, time) => axios.put(url, time);

const Delete = (url, id) => axios.delete(`${url}/${id}`);

export { GetAll, Add, Edit, Delete };