import textAnalyzerData from "./textanalyzer.js";

//Here you will require route files and export them as used in previous labs.

const constructorMethod = (app) => {
  app.use("/", textAnalyzerData);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Bummer!!! Page Not Found" });
  });
};

export default constructorMethod;
