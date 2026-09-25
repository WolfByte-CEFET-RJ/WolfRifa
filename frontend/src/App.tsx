//import { Home } from './pages/Home';
//import { Vaquinha } from './pages/Vaquinha';
import { Rifa } from './pages/Rifa';
//import { Campanhas } from './pages/Campanhas';
import { ModalPagamentoRifa } from './pages/ModalPagamentoRifa';

function App() {
  return (
    <>
      <Rifa />
      <ModalPagamentoRifa isOpen={true} />
    </>
  );
}

export default App;
