import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./about/page";
import Contact from "./contact/page";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <Projects/>
      <Gallery/>
      <Contact/> 
    </>
  )
}
