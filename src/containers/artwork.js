import React, {useEffect} from 'react'
import { useRouteData } from 'react-static'
import { navigate } from "@reach/router";

const goBack = () => {
navigate(-1);
}


//
import styled from 'styled-components'


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { 

    const chunks = item.split('/');

    images[chunks[chunks.length-1]] = r(item); });
  return images;
}

const images = importAll(require.context('pictures/', true, /\.(png|jpe?g|svg)$/));

const PictureContainer = styled.img`
  /*max-width: 90vw;*/
  max-height: 90vh;
  display:block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border: 1px solid #ccc;
  filter: drop-shadow(-3px 3px 3px #bbb);
  cursor:pointer;
`;

const Description = styled.p`
font-weight: 600;
opacity: 0.6;
`;

const TagSeparator = styled.span`
width:10px;
display:inline-block;
text-align: center;
opacity:0.3;
`;

const BackLink = styled.a`
text-decoration:none;
color: black;

opacity:0.5;

&: hover{
  opacity:1;
}

`;

const Separator = () => <TagSeparator>|</TagSeparator>

export default function Post() {
  const { work } = useRouteData();

  const pictureRef = React.useRef(null);

  console.log(images);

  useEffect(() => {
    setTimeout(()=>{
      if(pictureRef.current)
      pictureRef.current.scrollIntoView({
        block: 'start',
        behavior: 'instant'
      });
    },10);

  }, []);

  return (
    <div>
      <a onClick={goBack}>
      <PictureContainer src={images[work.imageKey]} ref={pictureRef}/>
      </a>
    
      <Description>
        {work.title}
        <Separator/>
        {work.description.technique}
        <Separator/>
        {work.description.dimensions}
        <Separator/>
        {work.description.available ? work.description.price+" (available)" :work.description.price}
      </Description>
      <BackLink onClick={goBack} href='#'>← back</BackLink>
      <br/>
      <br/>
    </div>
  )
}
