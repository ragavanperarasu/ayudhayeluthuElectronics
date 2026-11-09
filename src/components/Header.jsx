import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Badge, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon,
  ListItemText, Stack, Toolbar, Tooltip,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Logo from './Logo';
import CategoryIcon from './CategoryIcon';
import categories from '../data/categories';
import { useCart } from '../context/CartContext';

const links = [
  { label: 'Home', to: '/', end: true, icon: <HomeRoundedIcon /> },
  ...categories.map((c) => ({ label: c.shortName, to: `/category/${c.id}`, icon: <CategoryIcon name={c.icon} /> })),
  { label: 'About', to: '/about', icon: <PersonRoundedIcon /> },
];

export default function Header({ onCartClick }) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      component={motion.header}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      sx={{ transition: 'box-shadow .3s ease', boxShadow: scrolled ? '0 8px 30px rgba(11,27,63,.10)' : 'none' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 1.5 }}>
          <IconButton
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: 'inline-flex', lg: 'none' }, ml: -1 }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {links.map((l) => (
              <Button
                key={l.to}
                component={NavLink}
                to={l.to}
                end={l.end}
                color="inherit"
                sx={{
                  fontWeight: 700,
                  color: 'text.secondary',
                  '&.active': { color: 'primary.main', bgcolor: 'rgba(37,99,235,.08)' },
                }}
              >
                {l.label}
              </Button>
            ))}
          </Stack>
          <Tooltip title="Your order list">
            <IconButton onClick={onCartClick} aria-label="Open order list" sx={{ border: 1, borderColor: 'divider' }}>
              <Badge badgeContent={count} color="primary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 290 }} role="navigation">
          <Box sx={{ p: 2.5 }}>
            <Logo />
          </Box>
          <Divider />
          <List sx={{ p: 1 }}>
            {links.map((l) => (
              <ListItemButton
                key={l.to}
                component={NavLink}
                to={l.to}
                end={l.end}
                onClick={() => setMenuOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.active': { bgcolor: 'rgba(37,99,235,.08)', color: 'primary.main', '& .MuiListItemIcon-root': { color: 'primary.main' } },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{l.icon}</ListItemIcon>
                <ListItemText primary={l.label} slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
