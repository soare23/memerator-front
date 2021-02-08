import React from 'react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function Meme({ title, url, handleError, index }) {
  const [postCopied, setPostCopied] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <div className="title-share-button-container">
        <h3>{title}</h3>
        <CopyToClipboard text={url} onCopy={() => setPostCopied(true)}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            size="small"
            onClick={setTimeout(() => {
              setPostCopied(false);
            }, 2000)}
          >
            {postCopied ? (
              <span id="copy-success">Copied</span>
            ) : (
              <span>Share</span>
            )}
          </Button>
        </CopyToClipboard>
      </div>
      <img
        src={url}
        alt="meme"
        onLoad={(event) => {
          handleError(event, index);
        }}
      ></img>
    </div>
  );
}

export default Meme;