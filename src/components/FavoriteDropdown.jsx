// src/components/FavoriteDropdown.jsx
import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function FavoriteDropdown() {
  const { favorites } = useFavorites();

  return (
    <Dropdown className="me-3">
      <Dropdown.Toggle variant="primary">
        Mis Favoritos <Badge bg="light" text="dark">{favorites.length}</Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {favorites.length === 0
          ? <Dropdown.Item disabled>Sin favoritos</Dropdown.Item>
          : favorites.map(f => (
            <Dropdown.Item as={Link} to={`/${f.type}/${f.uid}`} key={`${f.type}-${f.uid}`}>
              {f.name}
            </Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}
