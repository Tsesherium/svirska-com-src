import React from 'react'

import styled, { keyframes } from 'styled-components'

const Header1 = styled.p`
font-weight: 600;
font-size:110%;
`;

const Header2 = styled.p`
font-size:90%;
font-weight:300;
margin:0;
`;

const Item = styled.p`
margin-top:1em;
font-weight:300;
font-size:90%;
text-align:justify;
`;

export default () => (
  <div>
    <Item>
      1999-2005 - National Academy of Art and Architecture (studio of graphic A.V. Chebykin) qualified graphic artist.<br />
      2005-2008 – post-graduate studies in Ukrainian Academy of Fine Arts (supervisor – A.V.Chebykin).<br />
      Professional artist and printmaker, Master of Arts. Member of Youth Association of Ukrainian National Union of Artists from 2005. Lives and works in Kyiv.<br />
    </Item>
    <Header1>
      Exhibitions
    </Header1>
    <Header2>
      PERSONAL
    </Header2>
    <Item>
      2007- Reminiscences. Gallery “Irena”,  Kyiv, Ukraine<br />
      2009- Own Dimension. The Art's Support Fund gallery. Kyiv, Ukraine<br />
      2009- Birth of the New. Art-cafe ”Papier-mache”, Kyiv, Ukraine<br />
      2009- Topology of Space. Exhibition Hall of The State library of Ukraine for Youth, Kyiv, Ukraine<br />
      2009- Dream World. SEB Bank, Kyiv, Ukraine<br />
      2009- Festive melodies. Exhibition Hall of The State library of Ukraine for Youth, Kyiv, Ukraine<br />
    </Item>
    <Header2>
      INTERNATIONAL
   </Header2>
    <Item>
      2003- International Print Triennial “Eurographik”. Krakow, Poland. Kyiv municipal Art Gallery "Lavra". Kyiv, Ukraine<br />
      2004- T. Svirska &amp; A. Rubanova. Gallery “Kvadrat”. St-Petersburg, Russia<br />
      2009- Mini Print International of Cadaques. Barcelona, Spain<br />
    </Item>
    <Header2>
      ALL-UKRAINIAN
   </Header2>
    <Item>
      2002- Christmas. Exhibition Hall of Artists Union. Kyiv, Ukraine<br />
      2003- Artistic impressions".  Exhibition Hall of Artists Union. Kyiv, Ukraine<br />
      2004- Autumn exhibition. Exhibition Hall of Artists Union. Kyiv, Ukraine<br />
      2006- All-Ukrainian Drawing Triennial. Kyiv, Ukraine<br />
      2006- Picturesque Ukraine, Odessa, Ukraine<br />
      2006- Art Kyiv-2006. Center "Ukrainian House". Kyiv, Ukraine<br />
      2006- A.Chebykin and his students. National Academy of Art and Architecture. Kyiv, Ukraine<br />
      2006- Christmas. Exhibition Hall of Artists Union. Kyiv, Ukraine<br />
      2007- Christmas. Exhibition Hall of Artists Union. Kyiv, Ukraine<br />
      2009- Mini Print International of Cadaques. Barcelona, Spain<br />
      2010- Fish Day. Gallery “Irena”,  Kyiv, Ukraine<br />
    </Item>
 
  </div>
)
