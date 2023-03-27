import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  console.log("posts : ", posts);
  return (
    <Box>
      {posts.map(post => (
        <Box
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
          sx={{
            border: "2px solid black",
            borderRadius: 2,
            mb: 5,
            p: 2,
            cursor: "pointer"
          }}>
          <Typography variant="h3">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
          {post.uploadFiles.map(photo => (
            <Box key={photo.id}>
              <img src={photo.Location} alt="test" style={{ height: 100 }} />
            </Box>
          ))}
          <Typography variant="body1">{post.formatted_address}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PostList;
