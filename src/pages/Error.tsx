import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return(
    <>
      <style>
        {
          `html, body { 
            background: url("../../images/confused.png") center center repeat; 
            background-size: 10em; 
            overflow-y: hidden;
          }`
        }
      </style>
      <Grid container justifyContent="center" alignItems="center"
        minHeight="100vh">
        <Grid item>
          {/* TODO: Make this solution for lining up the tables & boxes on
              TODO: mobile less hacky. */}
          <Box id="box" border={1} borderRadius="5px" sx={{
            width: { xs: '77vw', sm: '60vw', md: '50vw', lg: '30vw' }, p: 4
          }}>
            <Typography textAlign="center" gutterBottom
              sx={{ typography: { xs: 'h4', sm: 'h3' } }}>
              Error
            </Typography>
            <Typography textAlign="center"
              sx={{ typography: { xs: 'h6', sm: 'h5' } }}>
              An error has occurred! Click <Link to={'/stores'}>here</Link> to
              return home.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
