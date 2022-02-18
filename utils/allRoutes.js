const AllRoute= (app)=>{
  let routes= [
    app.use(require('../routes/user')),
    app.use(require('../routes/generateToken'))
  ]
  return routes;
}

module.exports= AllRoute