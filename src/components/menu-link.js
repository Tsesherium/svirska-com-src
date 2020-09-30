import React from 'react'
import { Link } from 'components/Router'
import styled from 'styled-components'

const isActive = ({ isCurrent, isPartiallyCurrent }) => ({
    style:
    {
        color: isCurrent? '#666' : 'black'
    }
})

const ExactLink = styled(Link)`
    font-size: 13px;
    text-decoration: none;
    display:inline-block;
    font-weight:300;
    padding: 8px;

    &:hover{
        opacity: 0.5;
    }
`;

const Separator = styled.div`
    display:inline-block;
    margin:3px;
    opacity: 0.3;
    content: '/';
    transform: translate(0, 2px)
`;

const MenuLink = props => (
    <ExactLink getProps={isActive} {...props} />
)

const MenuSeparator = props => (
    <Separator {...props}>/</Separator>
)


export {MenuLink, MenuSeparator};
