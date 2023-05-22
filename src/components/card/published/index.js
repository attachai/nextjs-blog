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

export const CardPublished = ({ data }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`${data.title}`}></CardHeader>
        <CardContent>
          <Typography sx={{ mb: 4 }}>{data.content}</Typography>
          <Grid container spacing={6}>
            <Grid item sm={10} xs={12}>
              <Typography sx={{ mb: 4 }}>{moment(data.created_at).format('DD-MM-yyyy HH:mm')}</Typography>
            </Grid>
            <Grid item sm={2} xs={12}>
              <Link href={`/form/create?id=${data.id}`} passHref>
                <Fab size='small' color='primary' variant='extended' sx={{ '& svg': { mr: 0 } }}>
                  <Icon icon='tabler:pencil' />
                  Edit
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
