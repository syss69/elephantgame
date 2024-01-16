
export interface ICardProps {
    state: boolean;
    imageSrc: string;
    index: number;
    onClick: (index:number) => void;
}

export const backFace = "https://api.dicebear.com/7.x/shapes/svg?seed=Harley";

const Card = (props: ICardProps) => {
    const {state, imageSrc, index, onClick} = props;
    let src = state === false? backFace:imageSrc;
    return <img src ={src}  height="auto" width={150} alt={`image_${index}`} id={`image_${index}`} onClick={() =>onClick(index)}/>;
}

export default Card;