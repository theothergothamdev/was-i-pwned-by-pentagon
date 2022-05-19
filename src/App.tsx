import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import data from './data.json';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inconsolata',
      'monospace',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0c0c0d',
    },
    primary: {
      main: '#54239D',
    },
  },
});

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = () => {
    if (data.notRefunded.some(entry => entry.walletAddress.toLowerCase() === walletAddress.toLowerCase())) {
      setResult('Yes! Your wallet was has already been processed for the refund and you received nothing.');
      return;
    }

    const walletRefundSummary = data.refunded.find(
      entry => entry.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
    if (walletRefundSummary) {
      setResult(`Yes! But less than others as you received a refund of ${walletRefundSummary.refundTotal} MATIC.`);
      return;
    }

    setResult(
      `Your wallet has not been processed for the refund yet! Check again later for the FLUX drop. There's still time to get fucked.`
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ px: 3 }}>
        <Typography textAlign="center" variant="h3" sx={{ mb: 4, mt: { xs: 10, md: 20 } }}>
          Was I f**ked by Pentagon?
        </Typography>

        <Stack gap={2} sx={{ maxWidth: 600, margin: 'auto' }}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              autoFocus
              sx={{ ml: 1, flex: 1 }}
              placeholder="Wallet Address"
              inputProps={{ 'aria-label': 'Wallet Address' }}
              value={walletAddress}
              onChange={event => setWalletAddress(event.target.value)}
            />
          </Paper>
          <Button onClick={handleCheck} variant="contained">
            Check!
          </Button>
        </Stack>
        {result && (
          <Typography sx={{ mt: { sm: 5, md: 15 } }} textAlign="center">
            {result}
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
