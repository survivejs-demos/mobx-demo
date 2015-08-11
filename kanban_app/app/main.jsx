import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import App from './components/App.jsx';
import NoteStore from './stores/NoteStore'

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  React.render(<App store={NoteStore} />, app);
}
