import React from 'react';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function FavoriteDropdown() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <Dropdown className="me-3">
      <Dropdown.Toggle as="button" className="favorite-dropdown-toggle">
        Mis Favoritos <Badge bg="light" text="dark">{favorites.length}</Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidth: '15rem' }}>
        {favorites.length === 0 ? (
          <Dropdown.Item disabled>Sin favoritos</Dropdown.Item>
        ) : (
          favorites.map(f => (
            <div
              key={`${f.type}-${f.uid}`}
              className="d-flex align-items-center justify-content-between px-3 py-1"
            >
              <Link
                to={`/${f.type}/${f.uid}`}
                className="text-decoration-none text-dark flex-grow-1"
              >
                {f.name}
              </Link>
              <Button
                variant="link"
                size="sm"
                className="text-danger p-0 ms-2"
                onClick={() => toggleFavorite(f)}
                title="Eliminar de favoritos"
              >
                🗑️
              </Button>
            </div>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
