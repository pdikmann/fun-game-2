# what

p5js template using npm, grunt and babel to enable ES6/2015+ or whatever they call it.

# run

```
npm install
grunt
grunt serve (optional)
```

then open `index.html` (or visit `localhost:8000` when using `grunt serve`).

# develop

```
grunt serve
```

then visit `localhost:8000` with live reloading enabled.

# what

the gruntfile should run babel which should look into .babelrc to get the proper preset for transpilation.

# probs

on chrome, the live reload doesn't seem to work (the livereload script tag isn't injected properly). but you can grab the browser extension for this purpose from [here](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).