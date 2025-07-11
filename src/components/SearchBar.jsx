import React, { useState, useEffect, useRef } from 'react';
import { FormControl, ListGroup, InputGroup, Spinner } from 'react-bootstrap';
import { useFetchSWAPI } from '../hooks/useFetchSWAPI';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  const { data: people } = useFetchSWAPI('people');
  const { data: planets } = useFetchSWAPI('planets');
  const { data: vehicles } = useFetchSWAPI('vehicles');

  const allItems = [
    ...people.map(p => ({ ...p, type: 'characters' })),
    ...planets.map(p => ({ ...p, type: 'planets' })),
    ...vehicles.map(v => ({ ...v, type: 'vehicles' })),
  ];

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const lower = query.toLowerCase();
    const matches = allItems.filter(item =>
      item.name.toLowerCase().includes(lower)
    );
    setSuggestions(matches.slice(0, 10));
  }, [query, allItems]);

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/${item.type}/${item.uid}`);
  };

  return (
    <div className="position-relative" ref={wrapperRef} style={{ minWidth: '200px' }}>
      <InputGroup>
        <FormControl
          placeholder="Buscar..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </InputGroup>
      {suggestions.length > 0 && (
        <ListGroup className="position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
          {suggestions.map(item => (
            <ListGroup.Item
              key={`${item.type}-${item.uid}`}
              action
              onClick={() => handleSelect(item)}
            >
              {item.name} <small className="text-muted">({item.type})</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
