const homeApp = (req, res) => {
    res.render('index', {styles: '<link rel="stylesheet" href="/css/estilos_index.css">'});
};
const altaApp = (req, res) => {
    res.render('alta');
};
const contactoApp = (req, res) => {
    res.render('contacto');
};
const nosotrosApp = (req, res) => {
    res.render('nosotros');
};

module.exports = {
    homeApp,
    altaApp,
    contactoApp,
    nosotrosApp
}