const notFound = (req, res) => {
    console.log("bheed le")
    res.status(404).send("route does  not exist")
}

module.exports = notFound