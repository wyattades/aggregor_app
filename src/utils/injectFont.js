// Create and inject stylesheet
const style = document.createElement('style');
style.type = 'text/css';
document.head.insertBefore(style, document.head.children[0]);

export default (fontName, url) => {

  const iconFontStyles = `@font-face {
    src: url(${url});
    font-family: ${fontName};
  }`;

  if (style.styleSheet) {
    style.styleSheet.cssText = (style.styleSheet.cssText || '') + iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

};
