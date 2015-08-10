exports.create = function(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><title>Article Title</title></head><body><h1>My Article here</h1></body></html>');
  };
}