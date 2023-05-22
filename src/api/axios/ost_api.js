import axios from 'axios'
import baseConfig from 'src/configs/base'

export const fetchPublished = async payload => {
  try {
    const response = await axios.get(
      `${baseConfig.ostUrl}/posts?page=${payload.page}&limit=${payload?.limit}&term=${payload.term}`
    )

    return response
  } catch (error) {
    return error
  }
}

export const fetchDraft = async payload => {
  try {
    const response = await axios.get(
      `${baseConfig.ostUrl}/posts/draft?page=${payload.page}&limit=${payload?.limit}&term=${payload.term}`
    )

    return response
  } catch (error) {
    return error
  }
}

export const create = async payload => {
  try {
    const { data } = await axios.post(`${baseConfig.ostUrl}/posts`, payload)

    return data
  } catch (error) {
    return error
  }
}

export const update = async payload => {
  try {
    const response = await axios.patch(`${baseConfig.ostUrl}/posts/${payload.id}`, payload.body)

    return response
  } catch (error) {
    return error
  }
}

export const remove = async payload => {
  try {
    const response = await axios.delete(`${baseConfig.ostUrl}/posts/${payload.id}`, {})

    return response
  } catch (error) {
    return error
  }
}

export const fetchPublishedById = async payload => {
  try {
    const response = await axios.get(`${baseConfig.ostUrl}/posts/${payload.id}`, {})

    return response
  } catch (error) {
    return error
  }
}
