var weather = require("weather-js");

// set initial degree type to Farenheit
let degreePreference = "F";

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/weather/", function(req, res) {
    loc = req.param("loc");
    degreePreference = req.param("tempType");

    console.log(loc);

    weather.find({ search: loc, degreeType: degreePreference }, function(
      err,
      result
    ) {
      if (err) console.log(err);

      // console.log(JSON.stringify(result, null, 2));
      res.json(result);
    });
  });
};
