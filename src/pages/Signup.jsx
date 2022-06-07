import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { FcPlus } from "react-icons/fc";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();

  //image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Maximo tamaño de una imagen es 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "zn4uzhgl");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dhxgse865/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!image) return alert("Por favor cargar una imagen en tu perfil");
    const url = await uploadImage(image);
    console.log(url);

    //signup the user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form ">
          <h1 className="text-center">Crear Cuenta</h1>
          <div className="signup__profile-pic-container">
            <img
              className="signup__profile-pic"
              src={imagePreview || "https://i.ibb.co/YB9zJkg/Profile.jpg"}
              alt="profile"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <FcPlus className="add-picture-icon" />
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/png, image7jpeg"
              onChange={validateImg}
            />
          </div>

          {error && <p className="alert alert-danger">{error.data}</p>}
          <Form className="login__form-box" onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImg || isLoading ? "Registrandose...." : "Registrar"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Ya tengo una cuenta <Link to="/login">Ingresar</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="singup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
