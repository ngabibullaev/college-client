import React, { useEffect, useState } from 'react'
import { SectionCard } from './SectionCard'
import { Container, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { Header } from './Header'

export const Home = ({profile}) => {

    const [data, setData] = useState([]);

    const [upactiveGender, setUpactiveGender] = useState(2)
    const [upactiveOri, setUpactiveOri] = useState(3)
    const [category, setCategeory] = useState("Любовь")

    const toActiveGender = String(upactiveGender)
    const toActiveOri = String(upactiveOri)

    console.log(data)
    
    useEffect(() => {
      axios.get('http://backreact/')
        .then((response) => {
          let filteredData = response.data;
          
          if (toActiveGender !== "2") {
            filteredData = filteredData.filter((d) => d.activeGender === toActiveGender);
          }

          if (toActiveOri !== "3") {
            filteredData = filteredData.filter((d) => d.activeOri === toActiveOri);
          }

          // Добавляем фильтрацию по selectedCategories
            filteredData = filteredData.filter((d) => d.selectedCategories.includes(category));

          
          setData(filteredData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [toActiveGender, toActiveOri, category]);

    


  return (
    <div className='Home'>
        <Header profile={profile} />
        <div style={{width: "100%", height: "7vh"}}></div>
        
        <Container>

          <div className='d-flex'>
          <Form.Select className="mt-3 mb-2 pb-2 mx-1 text-input" aria-label="Default select example" onChange={(e) => setUpactiveGender(e.target.value)}>
            <option value={2}>Все</option>
            <option value={0}>Парни</option>
            <option value={1}>Девушки</option>
          </Form.Select>

          <Form.Select className="mt-3 mb-2 pb-2 mx-1 text-input" aria-label="Default select example" onChange={(e) => setUpactiveOri(e.target.value)}>
            <option value={3}>Все</option>
            <option value={0}>Традиционное</option>
            <option value={1}>Гей</option>
            <option value={2}>Би</option>
          </Form.Select>
          </div>

          <div className='d-flex'>
          <Form.Select className="mt-3 mb-2 pb-2 mx-1 text-input w-100" aria-label="Default select example" onChange={(e) => setCategeory(e.target.value)}>
            <option>Любовь</option>
            <option>Дружба</option>
            <option>Секс</option>
          </Form.Select>

          
          </div>
          

            {data.map((d, i) => (
                <SectionCard profile={profile} key={d.id} {...d} />
            ))}
        </Container>
    </div>
  )
}
