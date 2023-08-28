import { createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";
import HeaderComponents from "./Header/HeaderComponents";
import { Helmet } from "react-helmet";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('/assets/fonts/Pretendard-ExtraBold.otf') format('opentype');
    font-weight: 900;
    font-style: normal;
}



html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.3); 
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  font-family: 'Pretendard-Regular', sans-serif;
  line-height: 1;
  font-weight: 800;
  word-break: "keep-all";
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
`;

function App() {
  return (
    <>
      <Helmet>
        <title>limbus info</title>
        <meta property="og:title" content="limbus info" />
        <meta property="og:description" content="림버스 정보글 모음" />
        <meta
          property="og:image"
          content="https://limbusinfo.com/assets/images/thumbnails/main.png"
        />
      </Helmet>
      <GlobalStyle />
      <HeaderComponents />
      <Outlet />
    </>
  );
}

export default App;
