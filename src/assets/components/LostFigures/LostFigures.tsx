import {Figure} from "../../models/figure/Figure";
import {FC} from "react";

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures:FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className='lost'>
            <h3>{title}</h3>
            {figures.map(figure =>
            <div className='lost__item' key={figure.id}>
                {figure.name} {figure.logo && <img width={30} height={30} src={figure.logo}/>}
            </div>
            )}
        </div>
    );
};

export default LostFigures;