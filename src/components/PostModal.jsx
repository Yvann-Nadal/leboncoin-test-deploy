import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import PostService from "../services/post.service";

SwiperCore.use([Navigation, Pagination]);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vw",
  height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

const PostModal = () => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const swiperRef = useRef(null);

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained">
        Open modal
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={swiper => console.log(swiper)}
              ref={swiperRef}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 1000
                }}>
                Close Modal
              </Button>
              {post.uploadFiles && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[0]?.Location}
                      alt="Slide 1"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 2 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[1]?.Location}
                      alt="Slide 2"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 3 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[2]?.Location}
                      alt="Slide 3"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 4 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[3]?.Location}
                      alt="Slide 4"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 5 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[4]?.Location}
                      alt="Slide 5"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 6 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[5]?.Location}
                      alt="Slide 6"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
              {post.uploadFiles && post.uploadFiles.length >= 7 && post.uploadFiles.length > 0 && (
                <SwiperSlide>
                  <Box className="slide-content">
                    <img
                      src={post.uploadFiles[6]?.Location}
                      alt="Slide 7"
                      style={{ height: "100vh", width: "100vw" }}
                    />
                  </Box>
                </SwiperSlide>
              )}
            </Swiper>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PostModal;
