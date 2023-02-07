import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Banner from "../components/Banner";

import axiosRequest from "../config/axiosRequest";

import { AuthContext } from "../context/AuthContext";

import backgroundImg from "../assets/log-reg-img.jpeg";

const Container = styled.div`
  width: 100vw;
  height: 90.39vh;
  background: url(${backgroundImg}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  @media only screen and (max-width: 794px) {
    width: 70%;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
const Policy = styled.span`
  font-size: 11.3px;
  font-weight: 600;
  margin: 15px 0px; ;
`;
const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: #5e5e5e;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
  margin: auto;
  @media only screen and (max-width: 794px) {
    width: 55%;
  }
  &:hover {
    background-color: #8b8b8b;
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedpass, setRepeatedpass] = useState("");
  const [alert, setAlert] = useState({});

  const { state, dispatch: ctxDispatch } = useContext(AuthContext);
  const { userInfo } = state;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, email, password, repeatedpass].includes("")) {
      setAlert({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "Tu contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== repeatedpass) {
      setAlert({ msg: "Los passwords no coinciden", error: true });
      return;
    }
    setAlert({});

    try {
      const { data } = await axiosRequest.post(`/users/register`, {
        username,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <Navbar />
      <Banner />
      <Container>
        <Wrapper>
          <Title>Crea tu cuenta</Title>

          {msg && <Alert alert={alert} />}
          <Form>
            <Input
              placeholder="Nombre de usuario"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña de al menos 6 carácteres"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Repite tu contraseña"
              id="password2"
              type="password"
              value={repeatedpass}
              onChange={(e) => setRepeatedpass(e.target.value)}
            />
            <Policy>
              He leído y al registrarme acepto lo descrito en las cláusulas
              informativas del tratamiento del sitio web, la Política de
              Privacidad y la Política de Cookies.
            </Policy>
            <Button type="submit" onClick={handleSubmit}>
              Registrarse
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
