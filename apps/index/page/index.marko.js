exports.create = function(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      browser_refresh_taglib_refresh_tag = __renderer(require("browser-refresh-taglib/refresh-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html><head><link rel="stylesheet" type="text/css" href="semantic.min.css"><script src="semantic/dist/semantic.min.js"></script><title>Article Title</title></head><body><h1>My Article here and there! BLIP BLAP SWIP SNAP</h1><h2>HELLO JOHN sefse FSDDS 23423 GGSDGSDGS</h2>');
    __tag(out,
      browser_refresh_taglib_refresh_tag,
      {
        "enabled": true
      });

    out.w('</body></html>');
  };
}