import React from 'react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: '#dde0e4',
    backgroundColor: '#606061',
  },
}));

function VideoMeme({ title, type, url, index }) {
  const [postCopied, setPostCopied] = useState(false);
  const classes = useStyles();
  console.log(url);

  return (
    <div key={index}>
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
      {type === 'reddit-video' ? (
        <div className="video-container">
          <video autoPlay loop muted controls webkitPlaysinline playsinline>
            <source src={url} type="video/mp4"></source>
          </video>
        </div>
      ) : (
        <div className="video-container">
          <iframe src={`${url}?autoplay=1&mute=1`} title={title}></iframe>
        </div>
      )}
    </div>
  );
}

export default VideoMeme;
