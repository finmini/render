const express = require('express');
//npm install express

const app = express();

//for getting urlencoded: http://localhost:3000?some=111&other=222
//extended true: parsing bodies from URL
app.use(express.urlencoded({ extended: true}));

//to handle client sending in json
app.use(express.json());

let port = process.env.PORT || 3000; 
let result = 0;


//handler for: http://localhost:8080
///////////////////
app.get('/', (req, res) => {

//serve HTML in directory
res.sendFile(__dirname + '/index.html');
});
///end of /



//handler for: http://localhost:8080/submit?one=11&two=22
///////////////////

//wrap func this way if to use async await
app.get('/submit', submit);
//cannot use app.post() when reading from url: req.query


//from html page: http://localhost:8080/submit?one=11&two=22
//must async await 
async function submit (req, res) 
{

//query: parse url: http://localhost:8080/submit?one=11&two=22
let one = req.query.one;
let two = req.query.two;

result = parseFloat(one) * parseFloat(two);
console.log(result);

//if sending plain value:
//await res.send(result.toString());

await res.json( { data : result.toString() } );
};


app.listen( port, () => console.log('Server ready at http://localhost:' + port) );


