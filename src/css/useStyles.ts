import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
});

export default useStyles;
