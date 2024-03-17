import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Container,
  Input,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [rawText, setRawText] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const printRef = useRef(null);
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    console.log("render");
    // Restore state from local storage
    const storedText = localStorage.getItem("text");
    const storedFontSize = localStorage.getItem("fontSize");
    console.log(storedFontSize);
    if (storedFontSize) setFontSize(parseInt(storedFontSize));
    if (storedText) {
      setRawText(storedText);
      setText(convertToBionic(storedText));
    }
  }, []);

  useEffect(() => {
    // Save state to local storage
    localStorage.setItem("text", rawText);
  }, [rawText]);

  const handleTextareaChange = (event) => {
    localStorage.setItem("text", event.target.value);
    setRawText(event.target.value);
    setText(convertToBionic(event.target.value));
  };

  function convertToBionic(inputText) {
    const lines = inputText.split("\n");
    let bionicText = "";
    lines.forEach((line, index) => {
      const words = line.split(/(\s+)/).filter((e) => e.trim().length > 0);
      words.forEach((word, wordIndex) => {
        if (word.length > 1) {
          const mid = Math.ceil(word.length / 2);
          bionicText += `<strong>${word.substring(
            0,
            mid
          )}</strong>${word.substring(mid)}`;
        } else {
          bionicText += word;
        }
        if (wordIndex < words.length - 1) bionicText += " ";
      });
      if (index < lines.length - 1) bionicText += "<br>";
    });
    return bionicText;
  }

  function onSelectionChange(event) {
    localStorage.setItem("fontSize", event.target.value);
    setFontSize(event.target.value);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <Navbar className="my-2" color="secondary" dark>
        <NavbarBrand href="/">Bionic Reader</NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">Input Text</AccordionHeader>
                <AccordionBody accordionId="1">
                  <textarea value={rawText} onChange={handleTextareaChange} />
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              ref={printRef}
              className="bionic-text"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </Col>
        </Row>
        <Row>
          <Col className="controls">
            <select onChange={onSelectionChange} value={fontSize}>
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="20">20px</option>
              <option value="22">22px</option>
              <option value="24">24px</option>
              <option value="26">26px</option>
              <option value="28">28px</option>
              <option value="30">30px</option>
              <option value="32">32px</option>
              <option value="34">34px</option>
              <option value="36">36px</option>
              <option value="38">38px</option>
              <option value="40">40px</option>
            </select>
            <Button color="primary" onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
