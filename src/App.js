import './App.css';
import { useState, useEffect } from 'react';
import Meme from './components/Meme';
import VideoMeme from './components/VideoMeme';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  function getPosts() {
    // http://opsolutions.ro:4000/memes?lastId=4636
    if (posts.length > 0) {
      let lastPostId = posts[posts.length - 1].id;
      axios
        .get(`https://www.opsolutions.ro/memes/?lastId=${lastPostId}`)
        .then(({ data }) => {
          setPosts((prevState) => [...prevState, ...data]);
          setIsLoading(false);
        });
    } else {
      axios.get('https://www.opsolutions.ro/memes/').then(({ data }) => {
        setPosts((prevState) => [...prevState, ...data]);
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    if (!isLoading) return;
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsLoading(true);
    }
  }

  function handleError(event, index) {
    if (event.target.naturalHeight < 100 && event.target.naturalWidth < 200) {
      let finalPosts = [...posts];
      finalPosts.splice(index, 1);
      setPosts(finalPosts);
    }
  }

  return (
    <div className="App">
      {posts.map((post, index) =>
        post.type === 'image' ? (
          <div key={index} className="meme-container">
            <Meme
              title={post.title}
              url={post.mediaUrl}
              handleError={handleError}
              index={index}
            ></Meme>
          </div>
        ) : (
          <div key={index} className="meme-container">
            <VideoMeme
              title={post.title}
              type={post.type}
              url={post.mediaUrl}
              index={index}
            ></VideoMeme>
          </div>
        )
      )}
      {isLoading ? (
        <div className="loading-container">
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
