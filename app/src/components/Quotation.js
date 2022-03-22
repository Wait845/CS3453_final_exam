import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Container, Row, Col, Button, Form, Navbar, Nav, Alert } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

// const API_URI = "http://localhost:3000";
let styles = {
	containerPosition: {marginTop: "1em"},
	formStyle: {
        backgroundColor: "white",
        padding: "1em 1em 1em 1em",
        borderRadius: "10px",
        fontWeight: "bold",
	},
	addButton: {
		backgroundColor: "#3376F7",
		border: "none",
		width: "100%",
		color: "white",
	},
}
function Quotation() {

	const itemRef = useRef();
	const priceRef = useRef();
	const qtyRef = useRef();

	const [isInit, setIsInit] = useState(true)


	const [dataItems, setDataItems] = useState([]);

	// const [products, setProducts] = useState([]);
	// const [productOptions, setProductOptions] = useState([]);
	// const [price, setPrice] = useState(0);

	const [items, setItems] = useState([])
	const [itemOptions, setItemOptions] = useState([])
	const [showError, setShowError] = useState(false)


	useEffect(() => {
        fetch(`http://localhost:3000/products`)
			.then((res) => res.json())
			.then((data) => {
				data.unshift({"name":"Select Items", "price":0})
				console.log(data)
				setItems(data)
			})
	}, [])



	useEffect(() => {
		// update options
		const options = items.map((e) => (
				<option key={'opt_' + e._id}>
					{e.name}
				</option>
		));

		setItemOptions(options)
	}, [items])



	const addItem = () => {
		if (itemRef.current.value == "Select Items" || qtyRef.current.value == "") {
			setShowError(true)
			return
		}
		setShowError(false)
		let item = items.find((i) => itemRef.current.value == i.name)
		let data = dataItems.find((i) => item.name == i.name)
		if (data == undefined) {
			data = {"name": item.name, "qty": parseInt(qtyRef.current.value), "price": item.price}
		} else {
			data.qty += parseInt(qtyRef.current.value)
		}

		let isNew = true
		// merge data
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].name == data.name) {
				dataItems[i] = data
				isNew = false
				break
			}
		}
		if (isNew == true) {
			dataItems.push(data)
		}
		setDataItems([...dataItems])
		console.log(dataItems)
	};

	useLayoutEffect(() => {
		if (isInit == true) {
			setIsInit(false)
			return
		}
		console.log("dataItems updated")
	}, [dataItems])


	const productChange = () => {
		const itemName = itemRef.current.value
		const item = items.find((e) => e.name === itemName);

		priceRef.current.value = item.price
	};


    return (
        <Container style={styles.containerPosition}>
			<Row>
				<Col md={4} >
					<Form style={styles.formStyle}>
						<Form.Group className="mb-3" controlId="formItem">
						<Form.Label>Item</Form.Label>
						<Form.Select aria-label="Default select example" ref={itemRef} onChange={productChange}>
							{itemOptions}
						</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formPrice">
						<Form.Label>Price</Form.Label>
						<Form.Control type="number" placeholder="" disabled={true} ref={priceRef}></Form.Control>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formQuantity">
						<Form.Label>Quantity</Form.Label>
						<Form.Control type="number" placeholder="Quantity" ref={qtyRef}></Form.Control>
						</Form.Group>

						{/* <Alert variant="danger" show={showError}>
							{errorMsg}
						</Alert> */}
						<Alert variant="danger" show={showError}>
							Incomplete data
						</Alert>
						<Button variant="outline-dark" onClick={addItem} style={styles.addButton}>
							ADD
						</Button>
					</Form>
				</Col>
				<Col md={8}>
					<QuotationTable
					dataItems={dataItems}
					setDataItems={setDataItems}
					/>
				</Col>
			</Row>
		</Container>
    )
}

export default Quotation;