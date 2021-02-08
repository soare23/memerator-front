import './App.css';
import { useState, useEffect } from 'react';
import Meme from './components/Meme';
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
    axios.get('http://opsolutions.ro:4000/memes').then(({ data }) => {
      console.log(data);
      setPosts((prevState) => [...prevState, ...data]);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (!isLoading) return;
    getPosts();
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
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
      {isLoading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="meme-container">
            <Meme
              title={post.title}
              url={post.mediaUrl}
              handleError={handleError}
              index={index}
            ></Meme>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
