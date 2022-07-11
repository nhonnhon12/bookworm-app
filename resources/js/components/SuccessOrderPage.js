import {useEffect, useState} from "react";
import {Modal, Row} from "react-bootstrap";

function SuccessOrderPage(props) {
    const [show, setShow] = useState(false);
    const [timing, setTiming] = useState(0);

    useEffect(()=>{
        if(props.show === true) {
            setShow(true);
            setTiming(10);
        }
        else setShow(false);
    }, [props.show]);

    useEffect(()=> {
        if (timing !== 0) setTimeout(() => {
            setTiming(timing - 1);
        }, 1000);
    }, [timing]);

    return <>
        <Modal show={show}
               animation={true}>
            <Modal.Header>
                <Modal.Title>
                    <b>
                        <center>Thank you for choosing BookWorm!</center>
                    </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You will be redirected to the homepage in <b>{timing}</b> second(s).
                </p>
            </Modal.Body>
        </Modal>
    </>;
} export default SuccessOrderPage;
