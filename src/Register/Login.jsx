import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export const Login = ({ setReg, setProfile, listprofile  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(["", ""]);

  const [message, setMessage] = useState("");

  const Gmail = email.includes("@gmail.com");

  const Get = async () => {
    try {
      const response = await axios.post(
        "http://backreact/Register/Login.php",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
        setProfile(response.data.user)
        localStorage.setItem(listprofile, JSON.stringify(response.data.user))
      }

      if (response.status === 200) {
        console.log("Данные отправлены");
      } else {
        console.log("что-то пошло не так");
      }
    } catch (error) {
      console.log("Произошла ошибка при выполнении запроса:", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      // Проверяем значение переменной message при каждом изменении
      if (message === "Успешная авторизация") {
        // Перенаправляем на страницу "/home"
        navigate("/home");
      }
    }
  }, [message, navigate]);

  useEffect(() => {
    if (email.length <= 11 && email.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[0] = "Не менее 11 символов"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else if (Gmail === false && email.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[0] = "Неправильный адресс"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[0] = "Успешно"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    }

    if (password.length <= 4 && password.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[1] = "Пароль не надежен"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[1] = "Успешно"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    }
  }, [email, password]);

  const handleKeyPress = (event) => {
    if (event.charCode === 32) {
      // проверка на пробел
      event.preventDefault(); // предотвращаем действие по умолчанию (ввод пробела)
    }
  };

  return (
    <div style={{height: "100vh", display: "flex", alignItems: "center"}}>
      <Container className="log-body">
        <h1 className="text-center mb-5 text-light">Авторизация</h1>
        {email != "" && (
          <nav
            className={
              isError[0] === "Успешно"
                ? "text-secondary mb-2"
                : "text-danger mb-2"
            }
          >
            {isError[0]}
          </nav>
        )}
        <Form.Control
          className="mb-2 pb-2"
          value={email}
          type="email"
          required={isError[0] !== "Успешно"}
          isInvalid={isError[0] !== "Успешно"}
          maxLength="32"
          placeholder="ваш email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {password != "" && (
          <nav
            className={
              isError[1] === "Успешно"
                ? "text-secondary mb-2"
                : "text-danger mb-2"
            }
          >
            {isError[1]}
          </nav>
        )}
        <Form.Control
          className="mb-2 pb-2"
          value={password}
          type="password"
          required={isError[1] !== "Успешно"}
          isInvalid={isError[1] !== "Успешно"}
          maxLength="32"
          placeholder="Придумайте пароль"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <div className="text-register">
          <a onClick={() => setReg(false)}>Нет аккаунта?</a>
          {isError[0] === "Успешно" &&
          isError[1] === "Успешно" &&
          email != "" &&
          password != "" ? (
            <Button variant="success" onClick={Get}>
              Войти
            </Button>
          ) : (
            <Button variant="secondary">Войти</Button>
          )}
        </div>
        <h4 className="text-secondary mt-2 text-center">{message}</h4>
      </Container>
    </div>
  );
};
