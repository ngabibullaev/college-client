import axios from "axios";
import React, { useState } from "react";

export const Give = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
        const response = await axios.post(
            "http://backreact/Give.php",
            JSON.stringify({
              username,
              password,
            }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Получаем ответ от сервера
      if (response.data.message) {
        setMessage(response.data.message)
      }

      // Обработка ответа сервера
      if (response.status === 200) {
        console.log("Данные успешно отправлены на сервер");
      } else {
        console.log("Ошибка при отправке данных на сервер");
      }
 
    } catch (error) {
      console.error("Произошла ошибка при отправке данных:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Имя пользователя"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleSubmit}>Отправить</button>

      {message && <p>{message}</p>}
    </div>
  );
};
