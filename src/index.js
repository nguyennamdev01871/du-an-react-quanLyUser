import React from 'react';
import ReactDOM from 'react-dom'; // Sử dụng react-dom thay vì react-dom/client
import reportWebVitals from './reportWebVitals'; // Sửa 'form' thành 'from'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Đo lường hiệu suất (optional)
reportWebVitals();
