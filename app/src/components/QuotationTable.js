import { useState, useEffect } from "react"
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa'
const styles = {
    textCenter : {textAlign: 'center'},
    textRight : {textAlign: 'right'},
    containerStyle: {
        backgroundColor: "white",
        padding: "1em 1em 1em 1em",
        borderRadius: "10px",
  },
  buttonStyle: {
      color: "white",
      backgroundColor: "#3376F7",
  },
  buttonStyleDanger: {
    color: "black",
    backgroundColor: "#FEC20F"
  },
  tableStyle: {
      color: "#000000",
  }
}

function QuotationTable({dataItems, setDataItems}) {
    const [dataRows, setDataRows] = useState();
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        let sum = 0
        const z = dataItems.map((v,i) => {
            let price = v.qty * v.price
            sum += price
            return (
            <tr key={i}>
                        <th style={styles.textCenter}><FaTrash onClick={() => deleteClick(i)}></FaTrash></th>

                <td style={styles.textCenter}>{v.qty}</td>
                <td style={styles.textCenter}>{v.name}</td>
                <td style={styles.textRight}>{numberWithCommas(v.price)}</td>
                <td style={styles.textRight}>{numberWithCommas(price)}</td>
            </tr>
            )
        })
        setDataRows(z)
        setTotalPrice(sum)
    }, [dataItems])

    const deleteClick = (i) => {
        dataItems.splice(i, 1)
        setDataItems([...dataItems])
        
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const clearTable = () => {
        setDataItems([])
        setDataRows([])
    }

    const order = () => {
        fetch(`/products/order`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(dataItems), // body data type must match "Content-Type" header
            })
            .then(res => res.json())
            .then(json => {
                console.log("POST Result",json)
                alert("ORDERING SUCCESSFUL")
        })
        clearTable()
    }
    return (
        <Container style={styles.containerStyle}>
            <Row>
                <Col>
                    <h1>
                    Quotation
                    </h1>
                </Col>

                <Col style={styles.textRight}>
                    <Button onClick={order} style={styles.buttonStyle} >ORDER</Button>{' '}
                    <Button onClick={clearTable} style={styles.buttonStyleDanger} >CLEAR</Button>

                </Col>
            </Row>
            {/* Total {data.length} rows */}

            <Table striped bordered hover style={styles.tableStyle}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Price/Unit</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    dataRows
                    }
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

    )
}
export default QuotationTable;