import React from 'react'
import { useSiteData } from 'react-static'
import { Link, Router } from 'components/Router'
import styled from 'styled-components'
import {MenuLink, MenuSeparator} from 'components/menu-link.js'


const Container = styled.div`
position: relative;
display: inline-block;
`;

const ItemContainer = styled.div`
display: none;
position: absolute;
background-color: rgb(230,230,230);
min-width: 160px;
z-index: 1;
border-left: 1px solid #ccc;

${Container}:hover & {
    display:block;
}
`;

const DropMenuLink = styled(MenuLink)`
display:block;
`;


export default () => {

  const {categories} = useSiteData();

  const items = categories.map(cat => 
    <DropMenuLink key={cat.id} to={`/${cat.id}`}>{cat.name}</DropMenuLink>
  );

  return <Container>
      <MenuLink to='/'>Artwork</MenuLink>
      <ItemContainer>
          {items}
      </ItemContainer>
  </Container>

}
