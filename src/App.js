import './App.css';
import Container from 'react-bootstrap/Container';
import Prescription from './component/prescription.jsx'


function App() {
  return (
  <div className="bg-light">
    <Container>
      <div className="py-5 text-center">
        <h2>Calculateur de prescription</h2>
        <p className="lead">de l'action publique des infractions en matière de sexualité en droit pénal français</p>
      </div>
      <Prescription />
      <footer>
        <div className="text-center p-4">
        <a href="https://github.com/eleurent/prescription">Logiciel libre</a> développé en 2021 par Edouard Leurent et Ambroise Laffineur.
        </div>
      </footer>
    </Container>
  </div>
  );
}

export default App;
