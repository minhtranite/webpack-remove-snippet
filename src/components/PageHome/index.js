import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai';
import jsBeautify from 'js-beautify';

SyntaxHighlighter.registerLanguage('xml', xml);

class PageHome extends React.Component {
  render() {
    let html = `
      <script>
        (function(w, d, t, s, n) {
          w.XXXObject = n;
          const fn = function() {
            (w[n].q = w[n].q || []).push(arguments);
          };
          w[n] = w[n] || fn;
          const f = d.getElementsByTagName(t)[0];
          const e = d.createElement(t);
          const h = '?v' + new Date().getTime();
          e.async = true;
          e.src = s + h;
          f.parentNode.insertBefore(e, f);
        })(window, document, 'script', '${process.env.UNIVERSAL_SCRIPT}', 'fd');
        window.fd('form', { userId: 'xxx', formId: 'xxx' });
      </script>
    `;
    html = jsBeautify.html(html, { indent_size: 2 });
    return (
      <div>
        <h1>Lorem ipsum dolor sit.</h1>
        <SyntaxHighlighter language="xml" style={monokai} id="html">
          {html}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default PageHome;
