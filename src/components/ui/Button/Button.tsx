import React from 'react';
import './Button.scss';

interface IProps {
    className?: string;
    onClick: () => void;
    children?: React.ReactNode;
}

function Button(props: IProps) {
    const { className, onClick, children } = props;
    const cssClasses = ['btn', className];

    return (
        <button
            className={cssClasses.join(' ')
                .trim()}
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
}

export default React.memo(Button);
