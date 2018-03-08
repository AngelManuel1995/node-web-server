const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express();


/** HandleBarbs */
app.set('view engine', 'hbs')
hbs.registerPartials( __dirname + "/views/partials")
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', ( text ) => {
	return text.toUpperCase();
})


/*app.get('/people', ( req, res ) => {
    res.send({
        people:[
            {
                name:"Angel Manuel",
                last_name:"Góez Giraldo",
                indentification:1036658046,
                age:23,
                married:false
            },
            {
                name:"Juan Carlos",
                last_name:"Góez López",
                indentification:70432958,
                age:46,
                married:true
            },
            {
                name:"Luz Dionny",
                last_name:"Giraldo Díaz",
                indentification:43780809,
                age:43,
                married:true
            },
            {
                name:"Adriana Maria",
                last_name:"Góez Giraldo",
                indentification:1020001220,
                age:22,
                married:false
            },
            {
                name:"Dary Marinella",
                last_name:"Góez Giraldo",
                indentification:1020304871,
                age:20,
                married:false
            }
        ],
        status:'OK'
    })
})*/
app.use( ( req, res, next) => {
	let now = new Date().toString()
	let log = `${ now }: ${ req.method } ${ req.url }`
	console.log(log)
	fs.appendFile('server.log', log + "\n", (error) => {
		if(error){
			console.log("Unable to append server.log")
		}
	})
  next();  
})

app.use( ( req, res, next ) => {
	res.render('maintenance.hbs')
})

/** Express */
app.use(express.static( __dirname + '/public'))


app.get('/', ( req, res ) => {
	/*res.send({
			user:{
					name:"Angel Manuel",
					last_name:"Góez Giraldo",
					age:23,
					hobbies:[
							'run',
							'read',
							'write',
							'swim'
					]
			},
			status:'OK'
	})*/
	res.render('home', {
		pageTitle:"Page title",
		welcomeMessage:"Welcome to my web site"
	})
})

app.get('/about', ( req, res ) => {
	res.render('about.hbs',{
		pageTitle:"Page title",
	})
})

app.get('/bad', ( req, res ) => {
	res.send({
		errorMessage:'Unable to conntec to API servers'
	})
})

app.listen(4040, () => {
	console.log("Server is up on port 4040")
})

/**
 * Middleware: Es una herramiento que nos permite adicionar una un comportamiento a un funcionalidad que 
 * que express tiene y le podemos decir como queremos que la ejecute express.
 * 
 */