# Notes/Kanban app - MobX port

This repository contains [MobX](https://mobxjs.github.io/mobx/) ports of [SurviveJS - Webpack and React](http://survivejs.com/) book examples. You can study them to see how to implement the same application in a different kind of architecture. See also [the interview with Michel Weststrate](http://survivejs.com/blog/mobservable-interview/).

MobX provides a way to make data structures reactive and makes it easy to consume them. It can be used with or without Flux. In this case we'll be relying directly on MobX for our data needs and skip Flux altogether. The most interesting thing to notice is how much it cuts out code.

We are triggering our MobX stores directly and more pedantic people might implement classes in between. For a simple case such as this the current approach is enough.

> See [Michel Weststrate's interview about mobx](http://survivejs.com/blog/mobservable-interview/)!

## Demo

1. `cd notes_app` or `cd kanban_app`
2. `npm i`
3. `npm start`
4. Surf to `localhost:8080`

## License

MIT.
