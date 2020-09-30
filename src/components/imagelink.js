import React from 'react'
import styled from 'styled-components'

const SvgIcon = styled.img`
width: 16px;
margin: auto;
vertical-align: middle; 
display: inline-block;

opacity: 0.6;


&: hover{
    opacity: 1;
}
`;

const Link = styled.a`
padding:5px;
display:inline-block;
`;

const ImageLink = ({to,src})=>{
    return <Link href={to}><SvgIcon src={src}></SvgIcon></Link>
}

export default ImageLink;