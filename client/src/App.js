import './App.css';
import Home from './Home';
import backgroundImage from './tree.webp'

function App() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };
  return (
    <div style={divStyle}>
      <Home />
    </div>
  )
};

export default App;
