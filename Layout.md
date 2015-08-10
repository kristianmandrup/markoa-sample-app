Layout
======

### Jade layout files

By convention, layout files are post fixed with `-layout`. The default layout for any app should be in the `/page` folder and simply be called `layout.jade`.

The Jade page template will have to be re-compiled in order to pick up the layout change. Simply run `gulp jade:marko` to achieve this!

### Semantic UI

Build semantic distribution as explained in [Semantic UI - Getting Started](http://semantic-ui.com/introduction/getting-started.html)

`cd semantic && gulp build`

In `layout.jade`

```jade
link(rel="stylesheet" type="text/css" href="semantic.min.css")
script(src="semantic/dist/semantic.min.js")
```

### Add your own styling to Marko

Run `gulp css` to concatenate your css files into one file and minify it.

In your `layout.jade` add

```jade
link(rel="stylesheet" type="text/css" href="app.min.css")
```

Alternatively have your application `layout.jade` files extend a global `app-layout.jade` template which includes the semantic ui and your main application css.

Use [Lasso.js](https://github.com/lasso-js/lasso) when you go beyond simple experimentation!!

For Lasso.js details/overview, talk with [Javier](javier.cabrera@gmail.com)
