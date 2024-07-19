import React from 'react';
import useStyles from './css';

const RichText: React.FC<{ className?: string, content: any }> = ({ className, content }) => {
  const classes = useStyles();

  if (!content) {
    return null;
  }

  return (
    <div className={[className, classes.richText].filter(Boolean).join(' ')}>
    </div>
  );
};

export default RichText;