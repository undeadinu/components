## j-Window

- Works only with `+v11.1.0` [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap
- The component moves the content of this component under `<body>` tag (because of positioning)

__Configuration__:

Example: `data-jc-config="title:Window title;if:user;icon:home"`

- `title` {String} window title
- `if` {String} condition for showing of the window, it's compared with the value within of `data-jc-path`
- `icon` {String} Font-Awesome icon without `fa-`
- `reload` {String} link to a global function and it's executed if the form is showing
- `enter` {Boolean} (optional) captures `enter` key automatically and performs submit (default: `false`)
- `autofocus` {Boolean/String} (optional) can focus an input. `String` === `jQuery selector` for the input
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- `closebutton` {Boolean} (optional) can hide `x` button (default: `false`)
- __NEW__: `zindex` {Number} (optional) can affect z-index (default: `12`)

__Good to know__:

New version of this component supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content if the j-Window will be displayed (only once).

```html
<div data-jc="window__path__config">
	<script type="text/html">
		A CONTENT
	</script>
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT