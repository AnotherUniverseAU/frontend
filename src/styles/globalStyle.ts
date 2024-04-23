import { createGlobalStyle } from "styled-components";
import { fonts } from "./fonts";

export const GlobalStyle = createGlobalStyle`
* {
	user-select: none;
	-webkit-tap-highlight-color:rgba(255,255,255,0);
	-webkit-touch-callout: none;
	::-webkit-scrollbar {
		display: none;
	}
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
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
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

a {
  text-decoration: none;
  color: black;
}
a:hover{
	none;
}
a:active {
	color: black;
}
a:visited {
	color: black;
}

div {
   box-sizing: border-box;
}

:root {
  --app-height: 100%;
}

html{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}

.header{
	height: calc(5rem + env(safe-area-inset-top));
	height: calc(5rem + constant(safe-area-inset-top));

	padding-top: constant(safe-area-inset-top);
	padding-top: env(safe-area-inset-top);
}
.container{
	height: calc(
		100% - constant(safe-area-inset-top) - constant(safe-area-inset-bottom) - 10rem
	);
	height: calc(
		100% - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 10rem
	);
	
	margin: calc(5rem + constant(safe-area-inset-top)) 0
    calc(5rem + constant(safe-area-inset-bottom));

	margin: calc(5rem + env(safe-area-inset-top)) 0
    calc(5rem + env(safe-area-inset-bottom));
}
.footer{
	height: calc(5rem + constant(safe-area-inset-bottom));
	height: calc(5rem + env(safe-area-inset-bottom));

	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

${fonts}

* {
    font-family: "Noto Sans KR", sans-serif;
	font-weight: 500;
  }

cont_login{
	padding: 0;
}
`;
