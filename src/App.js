import './App.css';
import { useState, useEffect } from 'react';
import Meme from './components/Meme';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [isBottom, setIsBottom] = useState(false);

  function getPosts() {
    axios.get('http://localhost:4000/memes').then(({ data }) => {
      console.log(data);
      setPosts(data);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/memes', {
        params: {
          lastMemeId: ,
        },
      })
      .then(({ data }) => {
        console.log('new data');
        console.log(data);
        // setPosts([...posts], data);
      });
  }, [isBottom]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleError(event, index) {
    if (event.target.naturalHeight < 100 && event.target.naturalWidth < 200) {
      let finalPosts = [...posts];
      finalPosts.splice(index, 1);
      setPosts(finalPosts);
    }
  }

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      console.log('bottom');
      setIsBottom(true);
    }
  }

  return (
    <div className="App">
      {posts.map((post, index) => (
        <div key={index} className="meme-container">
          <Meme
            title={post.title}
            url={post.mediaUrl}
            handleError={handleError}
            index={index}
          ></Meme>
        </div>
      ))}
    </div>
  );
}

export default App;
