import {Container} from "react-bootstrap";
import GetBooks from "./GetBooks";
import {useEffect, useState} from "react";

function HomeFeaturedBook(props){
    const [feature, setFeature] = useState(2);
    console.log("rer " + feature);
    useEffect(()=>{
        setFeature(props.tab);
        console.log("tab " + props.tab);
    }, [props]);
    // if(feature !== 0) {
    //     console.log("rerender " + feature);
    //     return <GetBooks type="get-popular" />;
    // }
    // else {
    //     console.log("rerender " + feature);
    //     return <GetBooks type="get-recommended"/>;
    // }
    return <> {
        feature !== 0 ?
        <GetBooks type="get-popular" />
        : <GetBooks type="get-recommended"/>
    } </>;
} export default HomeFeaturedBook;
