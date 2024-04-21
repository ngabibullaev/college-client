import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Register = ({ setReg, setProfile, listprofile }) => {

  const [name, setName] = useState("");
  
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  
  const gender = ["М", "Ж"];
  const orientation = ["Трационная", "Гей", "Би"];
  const path = ["Любовь", "Дружба", "Секс"];
  
  const [activeGender, setActiveGender] = useState(0);
  const [activeOri, setActiveOri] = useState(0);
  const [selected, setSelected] = useState([path[0]]);
  
  
  const formattedCategories = `${selected}`; 
  const selectedCategories = formattedCategories.replace(/,/g, ' ');
  
  const [message, setMessage] = useState("");

  const Gmail = email.includes("@gmail.com");

  const handleCategoryChange = (index) => {
    const isChecked = document.getElementById(index).checked;
    const updatedCategories = [...selected];

    if (isChecked) {
      // Add the category to the array if it was selected
      updatedCategories.push(path[index]);
    } else {
      // Remove the category from the array if it was deselected
      const categoryIndex = updatedCategories.indexOf(path[index]);
      updatedCategories.splice(categoryIndex, 1);
    }

    setSelected(updatedCategories);
  };



  const Get = async () => {
    try {
      const response = await axios.post(
        "http://backreact/Register/Register.php",
        JSON.stringify({
          name,
          email,
          password,
          activeGender,
          activeOri,
          selectedCategories,
          url,
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
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 32) {
      // проверка на пробел
      event.preventDefault(); // предотвращаем действие по умолчанию (ввод пробела)
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      // Проверяем значение переменной message при каждом изменении
      if (message === "Успешная регистрация") {
        // Перенаправляем на страницу "/home"
        navigate("/home");
      }
    }
  }, [message, navigate]);

  useEffect(() => {
    if (name.length <= 3 && name.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[0] = "Не менее 3 символов"; // изменяем значение только под индексом 0
        newState[3] = ""; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[0] = ""; // изменяем значение только под индексом 0
        newState[3] = "Успешно"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    }

    if (email.length <= 11 && email.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[1] = "Не менее 11 символов"; // изменяем значение только под индексом 0
        newState[4] = ""; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else if (Gmail === false && email.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[1] = "Неправильный адресс"; // изменяем значение только под индексом 0
        newState[4] = ""; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[1] = ""; // изменяем значение только под индексом 0
        newState[4] = "Успешно"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    }

    if (password.length <= 4 && password.length >= 1) {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[2] = "Пароль не надежен"; // изменяем значение только под индексом 0
        newState[5] = ""; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    } else {
      setIsError((prevState) => {
        const newState = [...prevState]; // создаем копию текущего состояния
        newState[2] = ""; // изменяем значение только под индексом 0
        newState[5] = "Успешно"; // изменяем значение только под индексом 0
        return newState; // возвращаем новый массив в качестве нового состояния
      });
    }
  }, [name, email, password]);


  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Container className="log-body">
        <h1 className="text-center mb-5 text-light">Регистрация</h1>

        <nav className="text-danger mb-2">{isError[0]}</nav>
        <Form.Control
          className="mb-2 pb-2"
          value={name}
          type="text"
          maxLength="32"
          placeholder="Ваше имя"
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <nav className="text-danger mb-2">{isError[1]}</nav>
        <Form.Control
          className="mb-2 pb-2"
          value={email}
          type="email"
          maxLength="32"
          placeholder="ваш email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <nav className="text-danger mb-2">{isError[2]}</nav>
        <Form.Control
          className="mb-2 pb-2"
          value={password}
          type="password"
          maxLength="32"
          placeholder="Придумайте пароль"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Form.Control
          className="mb-2 pb-2"
          value={url}
          type="text"
          maxLength="255"
          placeholder="Ссылка на вашу социальную сеть"
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <div className="input-gender mb-2">
          <nav className="text-secondary">Пол</nav>
          <nav className="text-secondary">Ориентация</nav>
        </div>
        <div className="input-gender">
          <ToggleButtonGroup
            type="radio"
            name="gender"
            defaultValue={activeGender}
          >
            {gender.map((gen, index) => (
              <ToggleButton
                onClick={() => setActiveGender(index)}
                id={`gender-radio-${index}`}
                value={index}
                variant="outline-light"
              >
                {gen}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup
            type="radio"
            name="orientation"
            defaultValue={activeOri}
          >
            {orientation.map((ori, index) => (
              <ToggleButton
                onClick={() => setActiveOri(index)}
                id={`orientation-radio-${index}`}
                value={index}
                variant="outline-light"
              >
                {ori}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className="customCheckBoxHolder">
      {path.map((p, index) => (
        <div key={index}>
          <input
            className="customCheckBoxInput"
            id={index}
            type="checkbox"
            onChange={() => handleCategoryChange(index)}
            checked={selected.includes(path[index])}  // Add `checked` prop to control the checkbox state
          />
          <label className="customCheckBoxWrapper" htmlFor={index}>
            <div className="customCheckBox">
              <div className="inner">{p}</div>
            </div>
          </label>
        </div>
      ))}
    </div>

        <hr />

        <div className="d-flex mt-2">
          <Form.Check
            checked={isChecked}
            className="me-2 mb-2"
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p className="text-secondary">Я ознакомлен</p>
        </div>

        <div className="text-register">
          <a onClick={() => setReg(true)}>уже есть аккаунт?</a>
          {isError[3] === "Успешно" &&
          isError[4] === "Успешно" &&
          isError[5] === "Успешно" &&
          name != "" &&
          email != "" &&
          password != "" &&
          url != "" &&
          selectedCategories.length > 0 &&
          isChecked == true ? (
                <Button variant="success" onClick={Get}>Регистрация</Button>
              ) : (
                <Button variant="secondary">Регистрация</Button>
                )}
        </div>

        {(message === "Такое имя пользователя уже используется" && (
          <h4 className="text-secondary text-center">{message}</h4>
        )) ||
          (message === "Успешная регистрация" && (
            <h4 className="text-secondary text-center">{message}</h4>
          ))}
      </Container>
    </div>
  );
};
