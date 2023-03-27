import axios from 'axios'

const endPoint = '/posts'

const getAll = async () => {
    console.log(`${process.env.REACT_APP_URL_API}${endPoint}`);
    const response = await axios.get(`${process.env.REACT_APP_URL_API}${endPoint}`)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_URL_API}${endPoint}/${id}`)
    return response.data
}
const create = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL_API}${endPoint}`, data)
    return response.data
}

const PostService = {
    getAll,
    getOne,
    create
}

export default PostService