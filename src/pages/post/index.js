// ** MUI Imports
import Grid from '@mui/material/Grid'
import { CardPublished } from 'src/components/card/published'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { fetchPublished } from 'src/api/axios/ost_api'
import { useEffect, useState, useCallback } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const Home = () => {
  const defaultPage = 1
  const defaultValue = 0
  const [datas, setDatas] = useState()
  const [page, setPage] = useState(defaultPage)
  const [totalPage, setTotalPage] = useState(defaultValue)

  // const [limit, setlimit] = useState(options[0])
  const [term, setTerm] = useState()
  const [limit, setLimit] = useState('')

  function fnPageChange(event, page) {
    setPage(page)
    fetchData()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    try {
      const payload = {
        page: page,
        limit: limit || '',
        term: term || ''
      }
      const { data } = await fetchPublished(payload)
      setDatas(data.posts)
      setTotalPage(data.total_page)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLimitChange = useCallback(e => {
    setLimit(e.target.value)
  }, [])

  const handleFilter = useCallback(val => {
    setPage(defaultPage)
    setTerm(val)
  }, [])

  useEffect(() => {
    fetchData()
  }, [term, page, limit])

  return (
    <>
      <Grid container spacing={15}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Search Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Limit:</Typography>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='Select Limit'
                    SelectProps={{
                      value: limit,
                      displayEmpty: true,
                      onChange: e => handleLimitChange(e)
                    }}
                  >
                    <MenuItem value=''>Select Limit</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='20'>20</MenuItem>
                    <MenuItem value='30'>30</MenuItem>
                    <MenuItem value='40'>40</MenuItem>
                    <MenuItem value='50'>50</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Search:</Typography>
                  <CustomTextField
                    value={term}
                    fullWidth
                    placeholder='Search Title'
                    onChange={e => handleFilter(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ m: '10 !important' }} />
      <Grid container spacing={6}>
        {datas?.map(data => (
          <CardPublished key={data.id} data={data} />
        ))}
      </Grid>
      <Pagination
        sx={{ mt: 10 }}
        className='mt2'
        count={totalPage}
        page={page}
        onChange={fnPageChange}
        variant='outlined'
        shape='rounded'
      />
    </>
  )
}

export default Home
