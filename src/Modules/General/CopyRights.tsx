import Typography from '@mui/material/Typography';

const CopyRights = (props: any) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © TRK'} {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default CopyRights