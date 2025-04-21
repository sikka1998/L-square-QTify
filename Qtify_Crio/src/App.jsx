import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Section from "./component/Section";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Section
        title={"Top Albums"}
        fetchUrl="https://qtify-backend-labs.crio.do/albums/top"
      />
    </>
  );
}

export default App;
