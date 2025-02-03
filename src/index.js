const { createServer } = require("http");
const { readFile } = require("fs/promises");
const path = require("path");

const { wrapInHTML } = require("./common/elements");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer();

/**
 * Reads the content of a file from the content directory.
 * @param {string} filename - The name of the file to read.
 * @returns {string | null} - The content of the file or null if an error occurs.
 */
async function readContentFile(filename) {
  try {
    const content = await readFile(
      path.join(__dirname, "content", filename),
      "utf8"
    );
    return content;
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null;
  }
}

server.on("request", async (req, res) => {
  const pathname = req.url;

  console.log("request", pathname);

  try {
    switch (pathname) {
      case "/": {
        res.setHeader("Content-Type", "text/html");
        const content = `
          <h1>Welcome to the Vineetha Pages</h1>
          <h2>Available Routes:</h2>
          <ul>
            <li><a href="/about">About Page</a> - Content from external file</li>
            <li><a href="/contact">Contact Page</a> - Direct HTML render</li>
            <li><a href="/services">Services Page</a> - Direct HTML render</li>
            <li><a href="/team">Team Page</a> - Content from external file</li>
          </ul>
        `;
        res.end(wrapInHTML("Home Page", content));
        break;
      }

      case "/about": {
        res.setHeader("Content-Type", "text/html");
        const aboutContent = await readContentFile("about.txt");
        const content = `
          <h1>About Us</h1>
          <div style="white-space: pre-line">${aboutContent}</div>
        `;
        res.end(wrapInHTML("About Us", content));
        break;
      }

      case "/contact": {
        res.setHeader("Content-Type", "text/html");
        const content = `
          <h1>Contact Us</h1>
          <p>Email: your@email.com</p>
        `;
        res.end(wrapInHTML("Contact Us", content));
        break;
      }

      case "/services": {
        res.setHeader("Content-Type", "text/html");
        const content = `
          <h1>Our Services</h1>
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        `;
        res.end(wrapInHTML("Our Services", content));
        break;
      }

      case "/team": {
        res.setHeader("Content-Type", "text/html");
        const teamContent = await readContentFile("team.html");
        const content = `
          <h1>Our Team</h1>
          ${teamContent}
        `;
        res.end(wrapInHTML("Our Team", content));
        break;
      }

      default:
        res.statusCode = 404;
        res.end(wrapInHTML("404 Not Found", "<h1>404 - Page Not Found</h1>"));
        return;
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(wrapInHTML("Error", "<h1>500 - Internal Server Error</h1>"));
    console.error(error);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
