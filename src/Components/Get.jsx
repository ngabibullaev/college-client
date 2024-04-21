import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Get = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://backreact/Get.php?sort=desc')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
        {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <p>id - {item.id}</p>
            <p>name - {item.name}</p>
            <p>email - {item.email}</p>
            <p>password - {item.password}</p>
          </div>
        ))
      ) : (
        <p>Нет данных для отображения.</p>
      )}
    </div>
  )
}
