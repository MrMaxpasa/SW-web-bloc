// src/pages/Detail.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap'
import FavoriteButton from '../components/FavoriteButton'

export default function Single() {
  const { type, uid } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => {
        setItem(res.data.result)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [type, uid])

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    )
  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        Error cargando datos: {error.message}
      </Alert>
    )
  if (!item) return null

  const { properties } = item

  return (
    <div className="container py-4">
      <h2 className="mb-4">{properties.name}</h2>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
          alt={properties.name}
        />
        <Card.Body>
          <FavoriteButton item={{ uid, type, name: properties.name }} />
          <ListGroup variant="flush" className="mt-3">
            {Object.entries(properties).map(([key, value]) => (
              <ListGroup.Item key={key}>
                <strong>{key.replaceAll('_', ' ')}:</strong> {value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}
