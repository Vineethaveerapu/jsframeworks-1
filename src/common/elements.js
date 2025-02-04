/**
 * Returns the header HTML element.
 * @param {string} title - The title of the HTML document.
 * @returns {string} - The header HTML element.
 */
function getHeader(title) {
  return `
    <head>
      <title>${title}</title>
      <style>
        nav {
          background-color: #f8f9fa;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 1rem;
        }
        footer {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f8f9fa;
          text-align: center;
        }
      </style>
    </head>
  `;
}

/**
 * Returns the navigation HTML element.
 * @returns {string} - The navigation HTML element.
 */
function getNav() {
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/team">Team</a></li>
        <li><a href="/books">Books</a></li>
      </ul>
    </nav>
  `;
}

/**
 * Returns the footer HTML element.
 * @returns {string} - The footer HTML element.
 */
function getFooter() {
  return `
    <footer>
      <p>&copy; 2025 Vineetha Website.</p>
      <p><a href="/">Back to Home</a></p>
    </footer>
  `;
}

/**
 * Wraps the content in an HTML document with the given title and content.
 * @param {string} title - The title of the HTML document.
 * @param {string} content - The content to be wrapped in the HTML document.
 * @returns {string} - The HTML document with the given title and content.
 */
function wrapInHTML(title, content) {
  return `
  <!DOCTYPE html>
    <html lang="en">
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${getHeader(title)}
      <body>
        ${getNav()}
        <main style="padding: 0 2rem;">
          ${content}
        </main>
        ${getFooter()}
      </body>
    </html>
  `;
}

module.exports = {
  wrapInHTML
};
