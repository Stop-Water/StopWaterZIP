import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const GrayButton = styled(Button)({
  padding: '1rem 3.5rem',
  '@media (max-width: 1200px)': {
    padding: '0.5rem 1rem',
  },
  background: '#6c757d',
  border: 0,
  borderRadius: 5,
  color: 'white',
  fontSize: '1.6rem',
  '&:hover': {
    background: '#adb5bd',
  },
});

export default GrayButton;
