import React from 'react';
import {InfinitySpin} from 'react-loader-spinner';
import './Loader.scss';

interface IProps {
    width: string;
    color: string;
}

function Loader(props: IProps) {
    const { width, color } = props;
    return (
        <div className='loader'>
            <InfinitySpin
                width={width}
                color={color}
            />
        </div>
    );
}

export default Loader;
