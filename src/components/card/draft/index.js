// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'
import Fab from '@mui/material/Fab'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { remove, update } from 'src/api/axios/ost_api'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const CardDraft = ({ data, callbackReload }) => {
  const { push } = useRouter()
  async function handleRemove(id) {
    try {
      const payload = {
        id
      }
      const { status } = await remove(payload)
      if (status === 204) {
        toast.success('ลบ Blog สำเร็จ')
        callbackReload()
      } else {
        toast.error('ไม่สามารถลบ Blog ได้')
      }
    } catch (error) {
      toast.error('ไม่สามารถลบ Blog ได้')
      console.error(error)
    }
  }

  async function handleUpdate(id) {
    try {
      const payload = {
        id: id,
        body: {
          published: true
        }
      }
      const { status } = await update(payload)
      if (status === 204) {
        callbackReload()
        toast.success('แก้ไข Blog สำเร็จ')
      } else {
        toast.error('ไม่สามารถแก้ไข Blog ได้')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`${data.title}`}></CardHeader>
        <CardContent>
          <Typography sx={{ mb: 4 }}>{data.content}</Typography>
          <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
              <Typography sx={{ mb: 4 }}>{moment(data.created_at).format('DD-MM-yyyy HH:mm')}</Typography>
            </Grid>
            <Grid item sm={4} xs={12}>
              <div className='demo-space-x'>
                <Link href={`/form/create?id=${data.id}`} passHref sx={{ mt: 0 }}>
                  <Fab size='small' color='primary' variant='extended' sx={{ '& svg': { mr: 1 } }}>
                    <Icon icon='tabler:pencil' />
                    Edit
                  </Fab>
                </Link>

                <Fab
                  size='small'
                  color='success'
                  variant='extended'
                  sx={{ '& svg': { mr: 1 } }}
                  onClick={() => handleUpdate(data.id)}
                >
                  <Icon icon='tabler:plus' />
                  published
                </Fab>
                <Fab
                  size='small'
                  color='error'
                  variant='extended'
                  sx={{ '& svg': { mr: 1 } }}
                  onClick={() => handleRemove(data.id)}
                >
                  <Icon icon='tabler:trash' />
                  delete
                </Fab>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
