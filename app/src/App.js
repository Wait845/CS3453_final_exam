import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form, Navbar, Nav } from "react-bootstrap";
import { useLocalStorage } from "react-use";
// import QuotationTable from "./components/QuotationTable";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Quotation from "./components/Quotation"
import ProductManagement from "./components/ProductManagement";


const API_URI = "http://localhost:3000";
const styles = {
  navbar: {
    backgroundColor: "#127BD2"
  }
}
function App() {
	document.body.style = 'background: #127bd2;';


  return (
    <Router>
      <Navbar variant="dark" style={styles.navbar}>
        <Container>
          <Navbar.Brand href="/">VMS Company</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/product-management">MANAGEMENT</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

		<Routes>
			<Route
				path="/product-management"
				element={
					<ProductManagement></ProductManagement>
				}>
			</Route>

			<Route
				path="/"
				element={
					 <Quotation></Quotation>
				}>

			</Route>
		</Routes>

    </Router>

  );
}

export default App;
