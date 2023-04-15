import textAnalyzerData from "./textanalyzer.js";

//Here you will require route files and export them as used in previous labs.

const constructorMethod = (app) => {
  app.use("/", textAnalyzerData);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;
