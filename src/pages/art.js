import React from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'
import styled from 'styled-components'

import Dimensions from 'dimensions'

const ThumbGrid = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`;




const ThumbnailContainer = styled.div`
  flex: 0 1 ${Dimensions.thumbWidth}px;
  border: 1px solid #ccc;
  width: ${Dimensions.thumbWidth}px;
  height: ${Dimensions.thumbHeight}px;
  margin: 10px;
  filter: drop-shadow(-1px 1px 1px #bbb);
  overflow:hidden;
`;

const Thumbnail = styled.img`
  width: ${Dimensions.thumbWidth}px;
  height: ${Dimensions.thumbHeight}px;
  transition: 0.4s ease;

  ${ThumbnailContainer}: hover &{
    filter: saturate(0)  brightness(0.4);
  }
`;

const CenterGrid = styled.div`
display:grid;
place-items:center;
`;

const CategoryLabel = styled.p`
display:block;
font-weight:300;
font-size:17px;
justify-self:start;
margin-left:37px;
`;

const Overlay = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
height: 100%;
width: 100%;
opacity: 0;
color: white;

display:grid;
template-grid-rows: auto 1fr
background-color:rgba(0,0,0,0.2);

${ThumbnailContainer}:hover & {
  opacity:1;
  transition: 0.2s ease;
}
`;

const ImageTitle = styled.p`
justify-self:start;
align-self:start;
padding: 1em;
margin:0;
font-weight:600;
`;

const ImageTags = styled.p`
padding: 1em;
align-self:end;
margin:0;
font-size:13px;
font-weight:300;
`;

const TagSeparator = styled.span`
width:10px;
display:inline-block;
text-align: center;
opacity:0.3;
`;

const Tag = styled.span`
`;

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


const Separator = () => <TagSeparator>|</TagSeparator>

const thumbs = importAll(require.context('pictures/thumb', false, /\.(png|jpe?g|svg)$/));

const OverlayContainer = ({ description: { title, year, technique, available, price } }) => {

  const tagGenerator = (tag, key) => tag ? [<Tag key={key}>{tag}</Tag>,<Separator key={key+'-sep'}/>]:[]

  return <Overlay>
    <ImageTitle>{title}</ImageTitle>
    <ImageTags>
      {tagGenerator(year,'yr')}
      {tagGenerator(technique,'technique')}
      {available &&<Tag key='avl'>available</Tag>}
      {available &&<Separator />}
      {price &&<Tag key='price'>{price}</Tag>}
    </ImageTags>
  </Overlay>;

}

export default function Art() {

  const { works, categoryName } = useRouteData()

  let worklist = null;

  if (works)
    worklist = works.map(work => (
      <Link to={`/${work.category}/work/${work.id}/`} key={work.id}>
        <ThumbnailContainer>
          <Thumbnail src={thumbs[work.thumbKey]} />
          <Overlay>
            <OverlayContainer description={work.description || {}} />
          </Overlay>
        </ThumbnailContainer>
      </Link>
    ));

  return <CenterGrid>
    <CategoryLabel>
      {categoryName ? categoryName : "All works"}
    </CategoryLabel>
    <ThumbGrid>
      {worklist}
    </ThumbGrid>
  </CenterGrid>

}
