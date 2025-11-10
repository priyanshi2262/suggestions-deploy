import { renderHomePage } from './pages/home.js';
import './styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  renderHomePage(document.getElementById('app'));
});
