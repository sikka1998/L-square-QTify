import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Section from "./component/Section";
import "swiper/css";
import "swiper/css/navigation";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Section
        title={"Top Albums"}
        fetchUrl="https://qtify-backend-labs.crio.do/albums/top"
      />
      <Section
        title={"New Albums"}
        fetchUrl="https://qtify-backend-labs.crio.do/albums/new"
      />
    </>
  );
}

export default App;
