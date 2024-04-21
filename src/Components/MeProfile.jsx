import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "./Header";

export const MeProfile = ({ profile, setProfile, listprofile }) => {

  const [upName, setUpName] = useState(profile.name)
  const [update, setUpdate] = useState(profile.date)
  const [upurl, setUpurl] = useState(profile.url)
  const [upzodiac, setUpzodiac] = useState(profile.zodiac)
  const [upheight, setUpheight] = useState(profile.height)
  const [upweight, setUpweight] = useState(profile.weight)
  const [upstatus, setUpstatus] = useState(profile.status)
  const [upfacultet, setUpfacultet] = useState(profile.facultet)
  const [upme, setUpme] = useState(profile.me)
  const [avatarUrl, setAvatarUrl] = useState(profile.imgUrl)

  const gender = ["М", "Ж"];
  const orientation = ["Трационная", "Гей", "Би"];
  const path = ["Любовь", "Дружба", "Секс"];

  const [upactiveGender, setUpactiveGender] = useState(0)
  const [upactiveOri, setUpactiveOri] = useState(0)
  const [upselected, setUpselected] = useState([path[0]])

  const [show, setShow] = useState(false);
  
  const formattedCategories = `${upselected}`;
  const upselectedCategories = formattedCategories.replace(/,/g, ' ');
  console.log(upactiveGender)
  
  const handleCategoryChange = (index) => {
    const isChecked = document.getElementById(index).checked;
    const updatedCategories = [...upselected];
    
    if (isChecked) {
      // Add the category to the array if it was selected
      updatedCategories.push(path[index]);
    } else {
      // Remove the category from the array if it was deselected
      const categoryIndex = updatedCategories.indexOf(path[index]);
      updatedCategories.splice(categoryIndex, 1);
    }
    
    setUpselected(updatedCategories);
  };
  
  useEffect(() => {
    const birthDate = new Date(update);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    let sign = '';
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      sign = 'Водолей ♒️';
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      sign = 'Рыбы ♓️';
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      sign = 'Овен ♈️';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      sign = 'Телец ♉️';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      sign = 'Близнецы ♊️';
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      sign = 'Рак ♋️';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      sign = 'Рак ♌️';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      sign = 'Дева ♍️';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      sign = 'Весы ♎️';
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      sign = 'Скорпион ♏️';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      sign = 'Стрелец ♐️';
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      sign = 'Козерог ♑️';
    }
    
    setUpzodiac(sign);
  })
  
  
  // аватарка
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    
    // Ограничение размера файла
    const maxSize = 500 * 1024; // 3MB
    if (file && file.size > maxSize) {
      alert("Файл слишком большой. Пожалуйста, выберите файл размером не более 500KB.");
      return;
    }
    
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 300; // Желаемая ширина изображения
        
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          const scaleFactor = maxWidth / width;
          width = maxWidth;
          height = height * scaleFactor;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Получаем сжатое изображение в формате base64
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // Измените качество сжатия здесь
        
        setAvatarUrl(compressedDataUrl);
      };
      
      img.src = reader.result;
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  const Get = async () => {
    const index = profile.email
    try {
      const response = await axios.post(
        "http://backreact/Register/reload.php",
        JSON.stringify({
          index,
          upName,
          update,
          upurl,
          upzodiac,
          upheight,
          upweight,
          upstatus,
          upfacultet,
          upme,
          avatarUrl,
          upactiveGender,
          upactiveOri,
          upselectedCategories,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
        
        if (response.status === 200) {
          console.log("Данные отправлены");
          setProfile(response.data.message)
          localStorage.setItem(listprofile, JSON.stringify(response.data.message))
        } else {
          console.log("что-то пошло не так");
        }
    } catch (error) {
      console.log("Произошла ошибка при выполнении запроса:", error);
    }
  }

  const navigate = useNavigate();
  
  const handleOpen = () =>{ 
    setShow(true);
    Get();
  }

  const handleClose = () =>{ 
    setShow(false);
    Get();
    navigate("/home");
  }

  return (
    <div className="Home">
      <Header profile={profile} />
      <div style={{ width: "100%", height: "7vh" }}></div>
      <Container>
        <h1 className="text-center mt-4">Мой профиль</h1>
        <div className="me-tablo">
          <div className="img-width m-auto mt-3">
            <img className="img-section" src={avatarUrl} alt="" />
            <div className="inp-selector">
              <input
                className="inp-ava"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <hr />

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={upName}
            type="text"
            maxLength="32"
            placeholder="Ваше имя"
            onChange={(e) => setUpName(e.target.value)}
          />

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={upurl}
            type="text"
            maxLength="255"
            placeholder="Связаться свами"
            onChange={(e) => setUpurl(e.target.value)}
          />

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={update}
            type="date"
            maxLength="32"
            placeholder="Год рождения"
            onChange={(e) => setUpdate(e.target.value)}
          />

          <Form.Control
            disabled
            className="mb-3 pb-3 text-input"
            value={upzodiac}
            type="text"
            maxLength="32"
            placeholder="Зодиак"
            onChange={(e) => setUpzodiac(e.target.value)}
          />

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={upheight}
            type="text"
            maxLength="3"
            placeholder="Ваш рост"
            onChange={(e) => setUpheight(e.target.value.replace(/\D/g, ""))}
          />

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={upweight}
            type="text"
            maxLength="3"
            placeholder="Ваш вес"
            onChange={(e) => setUpweight(e.target.value.replace(/\D/g, ""))}
          />

          <Form.Select className="mb-3 pb-3 text-input" aria-label="Default select example" onChange={(e) => setUpstatus(e.target.value)}>
            <option>Студент</option>
            <option>Окончил</option>
            <option>Преподователь</option>
          </Form.Select>

          <Form.Control
            className="mb-3 pb-3 text-input"
            value={upfacultet}
            type="text"
            maxLength="32"
            placeholder="Факультет"
            onChange={(e) => setUpfacultet(e.target.value)}
          />

          <Form.Control
            className="mb-3 pb-3 text-input"
            as="textarea"
            value={upme}
            type="text"
            maxLength="100"
            placeholder="О себе"
            onChange={(e) => setUpme(e.target.value)}
          />

          <hr />

          <div className="input-gender mb-2 mx-2">
            <nav className="text-secondary">Пол</nav>
            <nav className="text-secondary">Ориентация</nav>
          </div>
          <div className="input-gender mx-2">
            <ToggleButtonGroup
              type="radio"
              name="gender"
              defaultValue={upactiveGender}
            >
              {gender.map((gen, index) => (
                <ToggleButton
                  onClick={() => setUpactiveGender(index)}
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
              defaultValue={upactiveOri}
            >
              {orientation.map((ori, index) => (
                <ToggleButton
                  onClick={() => setUpactiveOri(index)}
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
                  checked={upselected.includes(path[index])}  // Add `checked` prop to control the checkbox state
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
          <div className="d-flex justify-content-end mx-2 mb-3">
            {upName.trim().length > 3 &&
              upselectedCategories.length > 0 ?
              <Button onClick={handleOpen} variant="danger">Сохранить</Button> : <Button variant="secondary">Сохранить</Button>
            }
          </div>
        </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-dark text-light">
          <Modal.Title>Уведомление</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <h5>Ваши данные были изменены!</h5>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light">
          <Button onClick={handleClose} variant="success">Обновить</Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};
