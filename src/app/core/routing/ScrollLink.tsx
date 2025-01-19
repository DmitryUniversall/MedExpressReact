import React, { useEffect } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

type ScrollLinkProps = Omit<LinkProps, 'to'> & {
    to: string;
    id: string;
    top?: number;
};

const ScrollLink: React.FC<ScrollLinkProps> = ({ to, id, top = 0, children, ...props }) => {
    const location = useLocation();

    const handleClick = () => {
        localStorage.setItem('scrollToId', id);
    };

    useEffect(() => {
        const savedId = localStorage.getItem('scrollToId');
        if (!(savedId && location.pathname === to)) return
        localStorage.removeItem('scrollToId');

        const element = document.getElementById(savedId);
        if (!element) return

        const offset = element.getBoundingClientRect().top + window.scrollY - top;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }, [location, to, top]);

    return (
        <Link to={ to } { ...props } onClick={ handleClick }>
            { children }
        </Link>
    );
};

export default ScrollLink;
