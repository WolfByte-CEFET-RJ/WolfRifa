//import { Home } from './pages/Home';
import { Vaquinha } from './pages/Vaquinha';
//import { Rifa } from './pages/Rifa';
//import { Campanhas } from './pages/Campanhas';
//import { ModalPagamentoRifa } from './pages/ModalPagamentoRifa';
import { ModalPagamentoVaquinha } from './pages/ModalPagamentoVaquinha';

function App() {
  return (
    <>
      <Vaquinha />
      <ModalPagamentoVaquinha isOpen={true} />
    </>
  );
}

export default App;
