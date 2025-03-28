import axios from 'axios'
// const baseUrl = 'http://localhost:3000/api/users'
const baseUrl = 'api/users'


const getUsers = async (token) => {
  try {
    // console.log('token:', token)
    const users = await axios.get(baseUrl,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return users.data
  } catch (error) {
    console.error('error in fetching users', error)
  }
}

const getUserById = async (id, token) => {
  try {
    const user = await axios.get(`${baseUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return user
  } catch (error) {
    console.error('error in fetching the user:', error)
  }
}

const updateMatches = async (id, token) => {
  console.log('updateMatches serviceä kutsutaan')
  try {
    const response = await axios.put(
      `${baseUrl}/matches/${id}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('error updating matches:', error.response?.data || error.message)
  }
}

const createUser = async body => {
  const response = await axios.post(`${baseUrl}/signup`, body)
  return response.data
}

const loginUser = async body => {
  const response = await axios.post(`${baseUrl}/login`, body)
  return response.data
}

const updateUser = async (body, token) => {
  const response = await axios.put(`${baseUrl}/${body.id}`, body, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  return response.data
}

export default { getUsers, getUserById, updateMatches, createUser, loginUser, updateUser }