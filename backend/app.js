require('dotenv').config()
const port = process.env.PORT || 3000

require(`${__dirname}/config/config.server`).listen(port, 
  console.log(`http://127.0.0.1:${port}\n`) 
)