function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><link rel="stylesheet" type="text/css" href="semantic.min.css"><script src="semantic/dist/semantic.min.js"></script><title>Article Title</title></head><body><h1>My Article</h1><h2>HELLO JOHN where are you NOW? HERE</h2><p></p></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);