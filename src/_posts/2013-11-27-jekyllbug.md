---
title: jekyll markdown hijinx
layout: post
---
Okay this was interesting. 
1. [Markdown](http://daringfireball.net/projects/markdown/) is a data format of questionable value.
1. [Jekyll](http://jekyllrb.com) 'supports' markdown... more on that.
1.  Maruku is the parser jekyll uses. 
1. Jekyll loads files it 'watches' and passes to Maruku for processing
1. If Maruku has errors it stops and reports them. It doesn't continue until a human or alien intelligence has fixed them.

Here's the kicker,  Jekyll seems to forget to reload the data from disk before running Maruku. At least sometimes. [See for yourself](http://pastebin.com/4ktDhrbh). Try:
1. create a post that works
1. now break it. many ways to do that, such as '&lt;li&gt;' to it without closing it
1. maruku will spit an error
1. now fix it, e.g. remove it, or close tag
1. same maruku error. i.e. it doesn't recognize your existance 
1. laugh out loud, at least until you tire. then restart jekyll and all should be well. 


And to add to my list of reasons why Markdown is odd? [Checkout how they do ordered lists.](http://daringfireball.net/projects/markdown/syntax#list)

Oh and while I'm on the topic. [Maruku is obsolete](http://benhollis.net/blog/2013/10/20/maruku-is-obsolete/). But still, seems more like a jekyll caching issue.

ps. if you're wondering why I didn't post this as a message to the jekyll developers, open a ticket, etc? because I'm actually more focused on evaluating the tool quickly and getting something working is more important. In other words thank you for reading this, a meta-post.
