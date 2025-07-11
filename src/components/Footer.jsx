import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-3 mt-5 border-top">
      © {new Date().getFullYear()} Star Wars Bloc
    </footer>
  );
}
