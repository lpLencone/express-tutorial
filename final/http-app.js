const http = require('http')
const { readFileSync, readFile } = require('fs')

// using readFileSync OUTSIDE of the server instance,
// so it isn't called everytime when the user makes request,
// but once, when the app is run
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeScript = readFileSync('./navbar-app/browser-app.js')
const homeLogo = readFileSync('./navbar-app/logo.svg')

const server = http.createServer((req, res) => {
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, 'everything working, boss', {
      'Content-Length': Buffer.byteLength(homePage),
      'Content-Type': 'text/html'
    })
    res.write(homePage)
    res.end()
  }
  // home style
  else if (url === '/styles.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css'
    })
    res.write(homeStyles)
    res.end()
  }
  // home logo
  else if (url === '/logo.svg') {
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml'
    })
    res.write(homeLogo)
    res.end()
  }
  // home logic (javascript)
  else if (url === '/browser-app.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    })
    res.write(homeScript)
    res.end()
  }
  // error page
  else {
    res.writeHead(404)
    res.end('not found')
  }
})

server.listen(5000, () => {
  console.log('server running on port 5000')
})
