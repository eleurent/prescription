import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Prescription from './component/prescription.jsx'


function App() {
  return (
  <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Questionnaire</h1>
        <Prescription />
      </Container>
    </Container>
  );
}

export default App;
