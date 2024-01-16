import { prependOnceListener } from "process";
import { useState } from "react";

export interface ICardProps {
    state: boolean;
    imageSrc: string;
    index: number;
    onClick: (index:number) => void;
}

const Card = (props: ICardProps) => {
    const [status, setStatus] = useState(false)
    const {imageSrc, index} = props;
    let src = status === false? "https://api.dicebear.com/7.x/shapes/svg?seed=Harley":imageSrc;
    return <img src ={src}  height="auto" width={150} alt={'image_${index}'} id={'image_${index}'} onClick={() =>{setStatus((prev) => !prev)}}/>;
}

export default Card;