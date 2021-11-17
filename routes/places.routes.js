const router = require("express").Router();
const Place = require('../models/Place.model')


//SHOW ALL PLACES
router.get("/", (req, res, next) => {

    Place.find()
      .then(allPlaces => res.render("places/all-places-list", { allPlaces }))
      .catch(err => console.log(err))
  
  });
  
  
  //ADD A NEW PLACE
  router.get("/adding", (req, res) => {
    res.render("places/new-place")
  })
  
  
  router.post("/adding", (req, res) => {
    const { name, type } = req.body;
  
    Place.create({ name, type})
      .then(res.redirect("/places"))
      .catch(err => console.log(err))
  
  })


  //EDIT A PLACE
  router.get("/edit/:id", (req, res) => {

    const { id } = req.params
  
    Place.findById(id)
      .then(place => res.render("places/edit-place", place))
      .catch(err => console.log(err))
  })

  router.post("/edit/:id", (req, res) => {

    const { name, type, location } = req.body;
    const { id } = req.params
  
    Place.findByIdAndUpdate(id, { name, type, location }, { new: true })
      .then(res.redirect("/places"))
      .catch(err => console.log(err))
  })




  //DELETE A PLACE
  
  router.get("/delete/:id", (req, res) => {

    const { id } = req.params
  
    Place.findById(id)
      .then(place => res.render("places/delete-place", place))
      .catch(err => console.log(err))
  })


  router.post("/delete/:id", (req, res) => {
    
    const { id } = req.params
    
    Place.findByIdAndDelete(id)

      .then(res.redirect("/places"))
      .catch(err => console.log(err))
  
})



router.get('places/api', (req, res, next) => { 
	Place.find()
		.then(allPlaces => {
			res.status(200).json({ places: allPlaces });
		})
		.catch(err => console.log(err))
});



  module.exports = router;