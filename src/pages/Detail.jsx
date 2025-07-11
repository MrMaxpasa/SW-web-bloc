// src/pages/Detail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import FavoriteButton from '../components/FavoriteButton';

// Si tu `type` en la URL es "characters", SWAPI espera "people"
const resourceMap = {
  characters: 'people',
  starships: 'starships',
  planets: 'planets',
};

export default function Detail() {
  const { type, uid } = useParams();
  const resource = resourceMap[type] || type;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://www.swapi.tech/api/${resource}/${uid}`)
      .then(res => {
        // La respuesta viene en res.data.result
        setItem(res.data.result);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resource, uid]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Error cargando datos: {error.message}
        </Alert>
      </Container>
    );
  }
  if (!item) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">No se encontró el elemento.</Alert>
      </Container>
    );
  }

  const { properties } = item;

  return (
    <Container className="py-4">
      <h2 className="mb-4">{properties.name}</h2>
      <Card className="bg-dark text-light mb-4">
        <Card.Img
          variant="top"
          src={`https://starwars-visualguide.com/assets/img/${resource}/${uid}.jpg`}
          alt={properties.name}
          loading="lazy"
          onError={e => { e.target.src = '/placeholder.png'; }}
        />
        <Card.Body>
          <FavoriteButton item={{ uid, type, name: properties.name }} />
          <ListGroup variant="flush" className="mt-3">
            {Object.entries(properties).map(([key, value]) => (
              <ListGroup.Item
                key={key}
                className="bg-dark text-light"
              >
                <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Si quieres mostrar otros datos de res.data (como URL, timestamps, etc.) */}
      <Card className="bg-secondary text-light">
        <Card.Header>Meta</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>UID:</strong> {item.uid}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>URL:</strong> <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
