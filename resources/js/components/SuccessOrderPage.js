import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

function SuccessOrderPage(props) {
    const [show, setShow] = useState(false);
    const [timing, setTiming] = useState(10);

    useEffect(()=>{
        if(props.show === true) {
            setShow(true);
            // setTiming(10);
            // let time = setInterval(() => {
            //
            // }, 1000);
            // clearInterval(time);
        }
        else setShow(false);
    }, [props.show]);

    return <>
        <Modal show={show}
               animation={true}>
            <Modal.Header>
                <Modal.Title>
                    We're taking your order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Thanks for ordering. You will be redirected to the homepage in seconds!
            </Modal.Body>
        </Modal>
    </>;
} export default SuccessOrderPage;
