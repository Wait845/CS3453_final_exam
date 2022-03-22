import React, { useEffect, useState, useRef } from  "react"
import { Container, Table, Button,Modal, Form, Row, Col } from "react-bootstrap"
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "./mystyle.module.css"


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
    table: {
        marginTop: "1em"
    },
    textCenter : {textAlign: 'center'},
    textRight : {textAlign: 'right'},

}

export default function ProductManagement () {

    // const [products, setProducts] = useState([])
    const [productRows, setProductRows] = useState([])
    const [show, setShow] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)


    const refName = useRef();
    const refPrice = useRef();

    useEffect(() => {
        updateData()
    }, [])
    
    const handleClose = () => {
        setShow(false);
    };
    
    const updateData = () => {
        fetch(`/products`)
            .then((res) => res.json())
            .then((data) => {
                let price = 0
                for (let i=0; i<data.length; i++) {
                    price += data[i].price * data[i].sold
                }
                setTotalPrice(price)
                console.log(price)

                console.log("SORTED DATA:", data)
                const rows = data.map((e, i) => {
                    return (
                        <tr key={i}>
                            <td style={styles.textCenter}>
                                <FaTrashAlt onClick={() => {handleDelete(e)}} />
                            </td>
                            <td style={styles.textRight}>{numberWithCommas(e.sold)}</td>
                            <td style={styles.textCenter}>{e.name}</td>
                            <td style={styles.textRight}>{numberWithCommas(e.price)}</td>
                            <td style={styles.textRight}>{numberWithCommas(e.price * e.sold)}</td>
                        </tr>
                    )
                })
                // setProducts(data)
                setProductRows(rows)
            })

    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleDelete = (product) => {
        console.log(product)
        if (window.confirm(`Are you sure to delete [${product.name}]?`)) {
            fetch(`/products/${product._id}`, {
                method: "DELETE",
                mode: "cors",
              })
                .then((res) => res.json())
                .then((json) => {
                  console.log("DELETE Result", json);
                  handleClose();
                });
        }
        updateData()
    }


    const handleShowAdd = () => {
        // setModeAdd(true);
        setShow(true);
    };

    const addProduct = () => {
        const newProduct = {
            name: refName.current.value,
            price: refPrice.current.value
        };

        fetch(`/products`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
            })
            .then(res => res.json())
            .then(json => {
                console.log("POST Result",json)
                setShow(false)
                updateData()
            })
        console.log(newProduct)
    };


    return (
        <>
            <Container style={styles.formStyle}>
                <h1>Product management</h1>
                <Button style={styles.buttonStyle} onClick={handleShowAdd}>
                    <FaPlus /> Add
                </Button>
                {' '}
                <Button style={styles.buttonStyle} href={"/"}>
                    <FaPlus /> Quotation
                </Button>
                <Table striped bordered hover style={styles.table}>
                    <thead>
                    <tr>
                        <th style={{ width: "60px" }}>&nbsp;</th>
                        <th className={style.textCenter}>Sold</th>
                        <th className={style.textCenter}>Item</th>
                        <th className={style.textCenter}>Price/Unit</th>
                        <th className={style.textCenter}>Amount</th>
                    </tr> 
                    </thead>
                    <tbody>
                        {productRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}></th>
                            <th style={styles.textCenter}>Total</th>
                            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
                        </tr>
                    </tfoot>
                </Table>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Add New Product
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>Name</Col>
                            <Col>
                                <input type="text" ref={refName}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>Price</Col>
                            <Col>
                                <input type="number" ref={refPrice}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={styles.buttonStyle} onClick={addProduct}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}