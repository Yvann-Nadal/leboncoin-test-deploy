import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import PostModal from "../components/PostModal";

const PostPageDetails = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={() => navigate("/")}>
        Go back
      </Button>
      <Typography variant="h2">Post Details</Typography>
      <PostDetails />
      <PostModal />
    </Box>
  );
};

export default PostPageDetails;
