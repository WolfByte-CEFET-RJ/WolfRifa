import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Campanhas } from './pages/Campanhas';
import { Vaquinha } from './pages/Vaquinha';
import { Rifa } from './pages/Rifa';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campanhas" element={<Campanhas />} />
        <Route path="/vaquinha" element={<Vaquinha />} />
        <Route path="/vaquinha/:id" element={<Vaquinha />} />
        <Route path="/rifa" element={<Rifa />} />
        <Route path="/rifa/:id" element={<Rifa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
