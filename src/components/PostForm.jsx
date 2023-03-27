import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";

const PostForm = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4z19Ujnn3veXS-coXR4XaTmEovmwdP8w&libraries=places";
    script.onload = () => {
      const address = document.getElementById("address");
      const newAutocomplete = new window.google.maps.places.Autocomplete(address);
      setAutocomplete(newAutocomplete);
    };
    document.body.appendChild(script);
  }, []);

  const handlePlaceChange = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const countryComponent = place.address_components.find(component =>
        component.types.includes("country")
      );
      const postalCodeComponent = place.address_components.find(component =>
        component.types.includes("postal_code")
      );
      setCredentials({
        ...credentials,
        formatted_address: place.formatted_address,
        city: place.name,
        country: countryComponent ? countryComponent.long_name : "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        postal_code: postalCodeComponent ? postalCodeComponent.long_name : ""
      });
    }
    console.log("place change", credentials);
  };

  const createPost = async formData => {
    await PostService.create(formData);
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setCredentials({ ...credentials, uploadFiles: acceptedFiles });
      console.log("acceptedFiles", acceptedFiles);
    },
    [credentials]
  );

  useEffect(() => {
    if (credentials) console.log(credentials);
  }, [credentials]);

  const handleDelete = (e, file) => {
    e.stopPropagation();
    URL.revokeObjectURL(file);
    const newFiles = credentials.uploadFiles.filter(f => f !== file);
    setCredentials({ ...credentials, uploadFiles: newFiles });
    console.log("newFiles", newFiles);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });
  const files = acceptedFiles.map(file => (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 200
      }}>
      <img src={URL.createObjectURL(file)} alt={file.name} width="100%" height="100%" />
      <span
        class="material-symbols-outlined"
        fill={true}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "red",
          fontSize: 50,
          cursor: "pointer"
        }}
        onClick={handleDelete}>
        cancel
      </span>
    </Box>
  ));

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", credentials.title);
    formData.append("content", credentials.content);
    console.log("submit credentials", credentials);
    if (credentials.uploadFiles) {
      credentials.uploadFiles.forEach(file => {
        formData.append("photos", file);
      });
    }
    formData.append("formatted_address", credentials.formatted_address);
    formData.append("city", credentials.city);
    formData.append("country", credentials.country);
    formData.append("lat", credentials.lat);
    formData.append("lng", credentials.lng);
    formData.append("postal_code", credentials.postal_code);
    createPost(formData);
    navigate("/");
  };

  // add material icons
  const addMaterialIcons = () => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  addMaterialIcons();

  console.log("files", files);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root, .MuiButton-root": {
          mb: 2
        }
      }}
      onSubmit={handleSubmit}>
      <TextField label="Title" name="title" variant="outlined" onChange={handleChange} />
      <TextField
        label="Content"
        name="content"
        variant="outlined"
        multiline
        rows={4}
        onChange={handleChange}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ".MuiInputBase-root, .MuiButton-root": {
            mb: 2
          }
        }}>
        <TextField
          type="text"
          id="address"
          name="location"
          onChangeCapture={handlePlaceChange}></TextField>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center"
          }}>
          <Box
            {...getRootProps()}
            sx={{
              backgroundColor: "#f0f0f0",
              border: "2px dashed orange",
              borderRadius: 1,
              mb: 2,
              width: 300,
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer"
            }}>
            <input {...getInputProps()} />
            <span
              class="material-symbols-outlined"
              style={{ color: "orange", fontSize: 50, marginBottom: 10 }}>
              add_a_photo
            </span>
            <Typography
              variant="body1"
              sx={{
                color: "orange"
              }}>
              Ajouter des photos
            </Typography>
          </Box>
        </Grid>
        {files.map(file => (
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center"
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                backgroundColor: "#f0f0f0",
                border: "2px dashed #ccc",
                borderRadius: 1,
                mb: 2,
                width: 300,
                height: 200,
                textAlign: "center"
              }}>
              {file ? (
                file
              ) : (
                <>
                  <span
                    class="material-symbols-outlined"
                    style={{ fontSize: 50, marginBottom: 10 }}>
                    photo_camera
                  </span>
                  <Typography variant="body1">Photo 1</Typography>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
