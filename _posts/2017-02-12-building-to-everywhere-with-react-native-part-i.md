---
layout: post
title:  "Building to everywhere with react native (Part I)"
date:   2017-02-12 14:00:00 -0100
categories: react native redux web android ios
author: 
---
This is the first article from a series of react native articles. The idea here is creating an app with react native and report the progress monthly as a blog post. So, what the post will bring? - The challenges, technologies, tips and the coolest things faced during the application development.

The progress may be followed through the repo [SmartBudget][react-native-app-smart-budget]. By now, what we have there is a basic hello world on the web page, android and ios platforms which consume the styles from a `.scss` file.
e.g.

Application.scss
================
{% highlight sass %}
.container {
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: #F5FCFF;
}
{% endhighlight %}

Application.js
==============
{% highlight javascript %}
import React from 'react';
import {
  Text,
  View
} from 'react-native';

import Styles from './Application.scss';

const Application = (() => (
  <View style={Styles.container}>
    <Text>Hello world!</Text>
  </View>
));

export default Application;
{% endhighlight %}

## Tech used
- Babel
- Webpack 2
- Istanbul
- Mocha
- Enzyme
- Chai
- React Native
- React

What were the tricks here:

- Not to use the .babelrc for test and web bundle specially because react-native must be resolved as react-native-web;
- Configuring Istanbul;
 - Very important piece >> Have the following attributes of nyc in the package.json as false: "cache", "sourceMap", "instrument";
- Configuring loaders and find some css loader parser to compile sass into react native styles;

## What is in place right now

This repo contains an app with "Hello world!" message which is generated from the same code base. This is only possible thanks to Nicolas Gallagher and his [React Native Web][react-native-web].
From that point, fine, we have the same components, but, what about styling? Yep, yep... Most of the web developers are pretty used to some less or sass CSS styles. And, once more, someone else already solve it, thanks to [React Native CSS Loader][react-native-css-loader].

Now, truly we have everthing that is required to create our app. Then, you are likely to ask: how can we make ios/android compile with React Native and web/test with React Native Web. ;)
For this situation, it is possible mapping alias. In the `web/tools/test/helpers/browser.js` file, you will notice the babel-register configuration creating the alias. This file is only used for tests.
For running the app in dev/prod mode is used the webpack configuration which has similar alias attribute as you will see on `web/tools/webpack/webpack.config.dev.js` and `web/tools/webpack/webpack.config.prod.js`.

browser.js
{% highlight javascript %}
...

require('babel-register')({
  ...,
  plugins: ['transform-runtime', 'transform-es2015-modules-umd', ['module-resolver', {
    'root': ['./'],
    'alias': {
      'react-native': 'react-native-web'
    }
  }]],
  ...
});

...
{% endhighlight %}

browser.js
{% highlight javascript %}
...

module.exports = {
  ...,
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  ...
};
...
{% endhighlight %}

## Testing

Mocha is the main tool used here + istanbul + nyc + babel + enzyme + chai. I did not have much trouble in this phase because my teammate [Phil Quinn][philquinn] has prepared an environment with the same caractheristics. So, it is baggage. ;)

Wow! The tests are pretty fast as we are ignoring any style parsing. What I, personally, consider being one of the most expensive costs during webpack compiling/bundling operation.

You might run your tests using `npm test` or `npm run coverage` which will give you a report with percentage of coverage for the aspects below:
- statements
- branches
- functions
- lines

## More explanation on the README file

https://github.com/daniloster/SmartBudget

## Nothing against

You can fork, copy, share this code. What is important here is spread the experience and help people make better softwares.

I hope you have enjoyed this short first article. Wait for the following posts...
See ya!

[philquinn]: https://github.com/pquinn-r7
[react-native-css-loader]: https://github.com/thewei/react-native-css-loader
[react-native-web]: https://github.com/necolas/react-native-web
[react-native-app-smart-budget]: https://github.com/daniloster/SmartBudget
