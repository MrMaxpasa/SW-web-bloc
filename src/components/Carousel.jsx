// src/components/Carousel.jsx
import React from 'react'
import { Carousel, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

export default function SWCarousel({ items, title }) {
  // Partir el array en grupos de 4
  const chunks = []
  for (let i = 0; i < items.length; i += 4) {
    chunks.push(items.slice(i, i + 4))
  }

  return (
    <section className="mb-5">
      <h3 className="mb-3 text-warning">{title}</h3>
      <Carousel
        controls
        indicators={false}
        interval={10000}
        wrap
        prevLabel="Anterior"
        nextLabel="Siguiente"
      >
        {chunks.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row>
              {group.map(item => (
                <Col key={item.uid} md={3}>
                  <Card className="h-100 bg-dark text-light shadow border-0">
                    <Card.Img
                      variant="top"
                      src={`https://starwars-visualguide.com/assets/img/${item.type}/${item.uid}.jpg`}
                      alt={item.name}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fs-6">{item.name}</Card.Title>
                      <div className="mt-auto d-flex justify-content-between">
                        <FavoriteButton item={item} />
                        <Button
                          as={Link}
                          to={`/${item.type}/${item.uid}`}
                          variant="info"
                          size="sm"
                        >
                          Ver más
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}
