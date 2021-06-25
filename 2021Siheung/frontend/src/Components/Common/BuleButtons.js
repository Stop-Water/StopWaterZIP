import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const blueButton = styled(Button)({
  padding: '1rem 3.5rem',
  '@media (max-width: 1200px)': {
    padding: '0.5rem 1rem',
  },
  marginLeft: 'auto',
  background: '#009ee0',
  border: 0,
  borderRadius: 5,
  color: 'white',
  fontSize: '1.6rem',
  '&:hover': {
    background: '#1abcff',
  },
});

const blueButtonNonMargin = styled(Button)({
  padding: '1rem 3.5rem',
  '@media (max-width: 1200px)': {
    padding: '0.5rem 1rem',
  },
  background: '#009ee0',
  border: 0,
  borderRadius: 5,
  color: 'white',
  fontSize: '1.6rem',
  '&:hover': {
    background: '#1abcff',
  },
});

const blueButtonSM = styled(Button)({
  padding: '0.8rem 1.5rem',
  '@media (max-width: 1200px)': {
    padding: '0.5rem 1.2rem',
  },
  marginLeft: 'auto',
  background: '#009ee0',
  border: 0,
  borderRadius: 5,
  color: 'white',
  fontSize: '1.6rem',
  '&:hover': {
    background: '#1abcff',
  },
});

const blueButtonCap = styled(Button)({
  padding: '0.8rem 1.5rem',
  '@media (max-width: 1200px)': {
    padding: '0.5rem 1.2rem',
    marginLeft: 'auto',
  },
  marginLeft: 'auto',
  marginRight: '1rem',
  background: '#009ee0',
  border: 0,
  borderRadius: 5,
  color: 'white',
  fontSize: '0.9rem',
  '&:hover': {
    background: '#1abcff',
  },
});

const BlueButtons = {
  default: blueButton,
  nonmargin: blueButtonNonMargin,
  small: blueButtonSM,
  cap: blueButtonCap,
};

export default BlueButtons;
