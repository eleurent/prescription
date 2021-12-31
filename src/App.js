import './App.css';
import Container from 'react-bootstrap/Container';
import Prescription from './component/prescription.jsx'


function App() {
  return (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Calculateur de prescription</h1>
      <Prescription />
    </Container>
  <footer>
    <div className="text-center p-4 bg-white">
    <a href="https://github.com/eleurent/prescription">Logiciel libre</a> développé en 2021 par Edouard Leurent et Ambroise Laffineur.
  </div>
  </footer>
  </Container>
  );
}

export default App;
