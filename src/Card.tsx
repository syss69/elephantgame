import { prependOnceListener } from "process";

interface ICardProps {
    state: boolean;
    imageSrc: string;
    index: number;
    
}

const Card = (props: ICardProps) => {
    const {state, imageSrc, index} = props;
    let src = state === false? "https://api.dicebear.com/7.x/shapes/svg?seed=Harley":imageSrc;
    return <img src ={src}  height="auto" width={150} alt={`image_${index}`} id={`image_${index}`}/>;
}

export default Card;
