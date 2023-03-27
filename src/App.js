import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPageDetails from './pages/PostPageDetails';
import PostPageForm from './pages/PostPageForm';
import PostService from './services/post.service';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await PostService.getAll().then((response) => {
      setPosts(response);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts) console.log(posts);
  }, [posts]);

  return (
    <Container sx={{ pt: 5 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/posts/create" element={<PostPageForm />} />
          <Route path="/post/:id" element={<PostPageDetails posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
