// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { useState, useEffect } from 'react'
import { create, update, remove, fetchPublishedById } from 'src/api/axios/ost_api'
import { useRouter } from 'next/router'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

const Form = post => {
  const { push } = useRouter()
  const router = useRouter()

  const [formData, setFormData] = useState({})
  const postId = router.query.id

  useEffect(() => {
    if (postId) fetchData()
  }, [])

  async function fetchData() {
    try {
      const payload = {
        id: postId
      }
      const { data } = await fetchPublishedById(payload)
      setFormData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = evt => {
    const { name, value } = evt.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSave = async e => {
    e.preventDefault()
    try {
      const response = await create(formData)
      if (response.id) {
        toast.success('Successfully save!')
        push('/draft')
      } else {
        toast.error('ไม่สามารถสร้าง Blog ได้')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      const payload = {
        id: postId,
        body: {
          title: formData.title,
          content: formData.content,
          published: formData.published
        }
      }
      const response = await update(payload)
      if (response.status === 204) {
        toast.success('Successfully Update!')
        router.back()
      } else {
        toast.error('ไม่สามารถสร้าง Blog ได้')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePublish = async e => {
    e.preventDefault()
    try {
      const responseCreate = await create(formData)
      if ((responseCreate.status = 200 && responseCreate.id)) {
        const payload = {
          id: responseCreate.id,
          body: {
            title: responseCreate.title,
            content: responseCreate.content,
            published: true
          }
        }

        const response = await update(payload)
        if (response.status === 204) {
          toast.success('Successfully update!')
          push('/post')
        } else {
          toast.error('ไม่สามารถ public Blog ได้')
          push('/draft')
        }
      } else {
        toast.error('ไม่สามารถสร้าง Blog ได้')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = e => {
    e.preventDefault()
    router.back()
  }
  async function handleDelete(e) {
    e.preventDefault()
    try {
      const payload = {
        id: post.id
      }
      const { status } = await remove(payload)
      if (status === 204) {
        router.back()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container spacing={15}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Edit Post' />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Title'
                    placeholder='title'
                    name='title'
                    value={formData.title}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon fontSize='1.25rem' icon='tabler:message' />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    multiline
                    minRows={3}
                    label='Content'
                    name='content'
                    placeholder='Content...'
                    sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon fontSize='1.25rem' icon='tabler:message' />
                        </InputAdornment>
                      )
                    }}
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className='demo-space-x'>
                    {postId && (
                      <Button type='submit' variant='contained' onClick={handleUpdate}>
                        Save
                      </Button>
                    )}
                    {!postId && (
                      <Button type='submit' variant='contained' onClick={handleSave}>
                        Save
                      </Button>
                    )}

                    <Button variant='outlined' color='secondary' onClick={handleCancel}>
                      Cancel
                    </Button>
                    {postId && (
                      <Button variant='outlined' color='error' onClick={handleDelete}>
                        Delete
                      </Button>
                    )}
                    {!postId && (
                      <Button variant='outlined' color='success' onClick={handlePublish}>
                        Publish Now
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Form
