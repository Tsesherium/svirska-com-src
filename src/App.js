import React, { Suspense } from 'react'
import { Root, Routes } from 'react-static'
//
import { Link, Router } from 'components/Router'

import styled from 'styled-components'

import './app.css'
import LogoSvg from './AnimatedLogo'
import { Helmet } from "react-helmet";

import CategoryNav from 'components/category-nav.js'
import {MenuLink, MenuSeparator} from 'components/menu-link.js'

import email from 'icons/email.svg'
import facebook from 'icons/facebook.svg'
import instagram from 'icons/instagram.svg'

import ImageLink from 'components/imagelink'

const Layout = styled.div`
  display:grid;
  grid-template: minmax(90px,auto) 1fr / auto 1fr;
  max-width:780px;
  margin:auto;
`;

const Nav = styled.nav`
justify-self:end;
align-self:center;
margin-top:30px;
margin-right:30px;

@media(max-width:412px){
  grid-row: 2/3;
  grid-column: 1 / 3;
  margin:auto;
  justify-self:center;
}
`;

const Content = styled.div`
grid-column: 1 / 3
`;

const Spacer = styled.div`
display:inline-block;
width:10px;
`;

const WideScreenOnlyLink = styled(MenuLink)`

@media(max-width:412px){
  display:none;
}
`;


function App() {
  return (
    <Root>
      <Helmet>
        <title>Tetiana Svirska</title>
        <meta name="description" content="Tetiana Svirska" />
      </Helmet>

      <Layout>

        <LogoSvg />
        <Nav>
          <WideScreenOnlyLink to="/">Home</WideScreenOnlyLink>
          <MenuSeparator/>
          <Suspense fallback={<em>Artwork</em>}>
            <CategoryNav />
          </Suspense>
          <MenuSeparator/>
          <MenuLink to="/about">About</MenuLink>
          <Spacer/>
          <ImageLink to='mailto:sv.tanja@gmail.com' src={email}/>
          <ImageLink to='https://www.facebook.com/tetiana.svirska' src={facebook}/>
          <ImageLink to='https://www.instagram.com/svirska_art/' src={instagram}/>
        </Nav>

        <Content>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </Content>
      </Layout>
    </Root>
  )
}

export default App
