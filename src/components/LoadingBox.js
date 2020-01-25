
import React from 'react';
import cn from 'classnames';

const LoadingBox = ({ text = 'Загрузка...', className }) => (
    <div className={cn("text-center", className)}>
        <span className="fa fa-lg fa-spin fa-spinner" />
        <p className='lead'>{ text }</p>
    </div>
);

export default LoadingBox;

