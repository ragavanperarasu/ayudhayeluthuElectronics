import { createTheme, alpha } from '@mui/material/styles';

const primary = '#2563EB';
const secondary = '#06B6D4';

const theme = createTheme({
  palette: {
    primary: { main: primary, dark: '#1E40AF' },
    secondary: { main: secondary },
    success: { main: '#16A34A' },
    whatsapp: { main: '#25D366', dark: '#1DA851', contrastText: '#fff' },
    background: { default: '#F5F7FB', paper: '#FFFFFF' },
    text: { primary: '#0B1B3F', secondary: '#55617A' },
    divider: '#E4E9F2',
  },
  shape: { borderRadius: 14 },
  typography: {
    // PT Serif for all text (the shop name uses Gugi — see Logo.jsx).
    // "Noto Sans" is loaded with only the ₹ sign, so every other character uses PT Serif.
    fontFamily: '"Noto Sans", "PT Serif", Georgia, "Times New Roman", serif',
    h1: { fontWeight: 700, letterSpacing: '-0.01em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
    overline: { fontWeight: 700, letterSpacing: '0.12em' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 12, paddingInline: 18 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E4E9F2',
          boxShadow: '0 1px 2px rgba(11,27,63,0.04)',
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 18 } } },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#FFFFFF', 0.85),
          backdropFilter: 'saturate(180%) blur(14px)',
          color: '#0B1B3F',
          borderBottom: '1px solid #E4E9F2',
        },
      },
    },
  },
});

export default theme;
