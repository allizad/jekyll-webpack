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


I hope you have enjoyed this short first article. Wait for the following posts...
See ya!

[react-native-app-smart-budget]: https://github.com/daniloster/SmartBudget
