import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/post.service";

const PostDetails = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const getCurrentPost = async () => {
    await PostService.getOne(id).then(response => {
      setPost(response);
    });
  };

  useEffect(() => {
    if (id) {
      getCurrentPost();
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log("post : ", post);
    }
  }, [post]);

  return (
    <Box>
      <Box
        sx={{
          border: "2px solid black",
          borderRadius: 2,
          mb: 5,
          p: 2,
          cursor: "pointer"
        }}>
        <Box>
          <Grid container spacing={1}>
            {post.uploadFiles && post.uploadFiles.length > 0 && (
              <>
                <Grid item xs={post.uploadFiles.length < 3 ? 12 : 8}>
                  <Box
                    sx={{
                      backgroundImage: `url(${post.uploadFiles[0]?.Location})`,
                      backgroundSize: "cover",
                      height: 400,
                      width: "100%"
                    }}></Box>
                </Grid>
                {post.uploadFiles.length > 2 && (
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        backgroundImage: `url(${post.uploadFiles[1]?.Location})`,
                        height: 200,
                        backgroundSize: "cover",
                        width: "100%"
                      }}></Box>
                    <Box
                      sx={{
                        backgroundImage: `url(${post.uploadFiles[2]?.Location})`,
                        backgroundSize: "cover",
                        height: 200,
                        width: "100%"
                      }}></Box>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="body1">{post.content}</Typography>

        <Typography variant="body1">Ville : {post.city}</Typography>
        <Typography variant="body1">Pays : {post.country}</Typography>
        <Typography variant="body1">Lat : {post.lat}</Typography>
        <Typography variant="body1">Lng : {post.lng}</Typography>
        <Typography variant="body1">
          Code postal : {post.postal_code ? post.postal_code : "Non renseigné"}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostDetails;
