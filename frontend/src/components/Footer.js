import { CssBaseline, Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {

    function Copyright() {
        return (
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Box
                    component="footer"
                    sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                    }}
                >
                    <Container maxWidth="sm">
                    <Typography variant="body1">
                        Love Live Concerts
                    </Typography>
                    <Copyright />
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default Footer;