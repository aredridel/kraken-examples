#### What is Template Specialization ?
Template specialization is a way to dynamically switch partials in your views, to some other partial, based on some rules that you can specify in the form of a json config in your app.

#### Why would you want to do this ?
This may become important and very handy when:
* you are writing apps that need to be supported for multiple locales and parts of it can look different in different countries/regions
* you want part of your views to look completely different across various devices (an alternate, more flexible solution to adaptive/responsive designs)
* you want to A/B test
..... Or any other creative way you'd like to use it.

# specialization-example

An example kraken 1.0 app demonstrating template specialization.

To see it working:

#### To start the app:

In your shell

```
$ npm install
$ npm start
```

The application can be accessed in your browser at [`http://localhost:8000`](http://localhost:8000)

#### To see specialization at work

View the pages at [`http://localhost:8000/setSpcl/yin`](http://localhost:8000/setSpcl/yin) or [`http://localhost:8000/setSpcl/yang`](http://localhost:8000/setSpcl/yang) or [`http://localhost:8000/setSpcl/yinyang`](http://localhost:8000/setSpcl/yinyang)

You will see that the specialization rules will be set in the session and you will be redirected to the index page with the right specialization rules.

* To see client side template specialization, click on the 'Tell Me More' button. You will see that templates/styles are different for different specializations.

###What does the sample app demonstrate?

* [Adding rules into the app's config file](config/config.json#L25)

* [Setting the context from middleware](lib/specialization.js#L5)

* [Setting the context in the model passed to res.render in the controllers](controllers/index.js#L14)

* [Adding specialization map to data-attribute in the master.dust to enable client side specialization](public/templates/layouts/master.dust#L8)

* [Sample client code demonstrating client side template specialization](public/js/app.js#L19)

* [A sample dust for client side template specialization demonstrating custom load of css as well as nested specialized templates](public/templates/nested/yin.dust)


You can play with the specialization rules in the config + what you set in the context to see how dust partials gets specialized.

Have Fun!!
