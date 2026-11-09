import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import EmptyState from '../components/EmptyState';
import usePageMeta from '../seo/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found', noindex: true });
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <EmptyState
        icon={SearchOffRoundedIcon}
        title="Page not found"
        text="The page you are looking for doesn't exist or has been moved."
        action={
          <Button component={RouterLink} to="/" variant="contained">
            Go to home page
          </Button>
        }
      />
    </Container>
  );
}
