import React from "react";
import { Accordion, Button, Card, Image } from "react-bootstrap";

export const SectionCard = (props) => {

  const Ori = () => {
    if (props.activeOri === "0") {
      return "Tрадиционная"
    } else if (props.activeOri === "1") {
      return "Гей"
    } else {
      return "Би"
    }
  }

  return (
    <div className="SectionCard mt-3">
      <Card className="card-section-body">
        <Card.Header as="h5">{props.name}</Card.Header>
        <Card.Body className="d-flex">
          <div className="img-width">
            <img className="img-section" src={props.imgUrl} alt="" />
          </div>
          <div>
            <nav className="text-secondary mx-2"><b className="text-light">Цель: </b> {props.selectedCategories}</nav>
            <nav className="text-secondary mx-2"><b className="text-light">Год рождения: </b> {props.date}</nav>
            <nav className="text-secondary mx-2"><b className="text-light">Знак зодиака: </b> {props.zodiac}</nav>
            <nav className="text-secondary mx-2"><b className="text-light">Ориентация: </b> {Ori()}</nav>
          </div>
        </Card.Body>
        <Accordion>
          <Accordion.Item eventKey="0" className="card-section-body">
            <Accordion.Header>Подробнее</Accordion.Header >
            <Accordion.Body>
              <nav className="text-secondary mx-2"><b className="text-light">Рост: </b> {props.height}</nav>
              <nav className="text-secondary mx-2"><b className="text-light">Вес: </b> {props.weight}</nav>
              <nav className="text-secondary mx-2"><b className="text-light">Статус: </b> {props.status}</nav>
              <nav className="text-secondary mx-2"><b className="text-light">Факультет: </b> {props.facultet}</nav>
              <nav className="text-secondary mx-2"><b className="text-light">Социальная сеть: </b> <a href={props.url}>{props.url}</a></nav>
              <hr />
              <nav className="text-secondary mx-2"><b className="text-light">О себе: </b> <br/> {props.me}</nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </div>
  );
};
