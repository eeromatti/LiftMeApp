import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'


const getUsers = async () => {
  try {
    const users = await axios.get(baseUrl)
    return users
  } catch (error) {
    console.error('error in fetching users', error)
  }
}

const getUserById = async (id) => {
  try {
    const user = await axios.get(`${baseUrl}/${id}`)
    return user
  } catch (error) {
    console.error('error in fetching the user:', error)
  }
}

const updateMatches = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/users/matches/${id}`)
    // console.log('user with new matches in front end users service:', response)
    return response.data
  } catch (error) {
    console.error('error updating matches:', error)
  }
}

const createUser = async body => {
  const response = await axios.post(`${baseUrl}/signup`, body)
  return response.data
}

const loginUser = async body => {
  console.log("frontendin userService vastaa")
  const response = await axios.post(`${baseUrl}/login`, body)
  return response.data
}

const updateUser = async body => {
  console.log("updateUser vastaa")
  const response = await axios.put(`${baseUrl}/${body.id}`, body)
  return response.data
}

export default { getUsers, getUserById, updateMatches, createUser, loginUser, updateUser }