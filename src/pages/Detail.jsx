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
  vehicles: 'vehicles',
};

// Función para obtener la URL de la imagen según el tipo
const getImageSrc = (type, uid) => {
  if (type === 'characters') {
    return `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${uid}.jpg`;
  }
  if (type === 'planets') {
    return `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/${uid}.jpg`;
  }
  if (type === 'vehicles') {
    return `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles/${uid}.jpg`;
  }
  // Por defecto:
  return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
};

export default function Detail() {
  const { type, uid } = useParams();
  const resource = resourceMap[type] || type;
  const storageKey = `swapi-${type}-${uid}`;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Intentar cargar desde localStorage
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setItem(parsed);
        setLoading(false);
        return; // No hacer fetch si está en cache
      } catch {
        // Si falla parseo, continuar con fetch
      }
    }

    // Fetch a la API y guardar en localStorage
    axios
      .get(`https://www.swapi.tech/api/${resource}/${uid}`)
      .then(res => {
        const result = res.data.result;
        setItem(result);
        // Guardar en localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(result));
        } catch {
          // Si falla almacenamiento, ignorar
        }
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resource, uid, storageKey]);

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
          src={getImageSrc(type, uid)}
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

      {/* Meta */}
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
