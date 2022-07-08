import {Container} from "react-bootstrap";
import GetBooks from "./GetBooks";
import {useEffect, useState} from "react";

function HomeFeaturedBook(props){
    const [feature, setFeature] = useState(0);
    console.log("rerender");
    useEffect(()=>{
        setFeature(props.tab);
    }, [props]);
    if(feature === 0){
        return <>
            <GetBooks type="get-popular" />
        </>;
    }
    else{
        return <>
            <GetBooks type="get-recommended"/>
        </>;
    }
    return <></>;
} export default HomeFeaturedBook;
