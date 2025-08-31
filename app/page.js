import About from "@/Components/About/About";
import Introduction from "@/Components/Introduction/Introduction";
import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contacts/Contact";

export default function Home() {
  return (
    <div>
      <Introduction />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
