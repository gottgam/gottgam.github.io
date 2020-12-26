---
title: "Introduction to HTML"
comments: true
categories: [HTML]
---
(If you want Korean version(한국어로 읽고 싶으시다면): <https://blog.naver.com/camwalker1115/222178109373>)  


### What is HTML?  
HTML stands for *Hyper Text Markup Language*.
+ It defines the structure which tells what has to come where(describes the structure of a Web page).
+ Its elements tell the browser how to display the content, label pieces of content.

### Basic Example  

```html
<!DOCTYPE html>
<html>
<head>
<title> Hello, world! </title>
</head>
<body>

<h1> Heading 1 </h1>
<p> This is where my first writing begins, blah blah blah... </p>

</body>
</html>
```
And this is the result:<BR/>
![image](https://user-images.githubusercontent.com/50163676/102599190-7923fe80-4160-11eb-96f2-ff0dd15f6880.png "The first example")

### An HTML Element  
An HTML element is defined by a start tag, some content, and an end tag. 
It looks like this: ```<tagname> Content </tagname>```  
+ Some HTML elements like the ```<br>``` element have no content. (So they are called 'empty elements', and do not have an end tag.)
+ The ```<!DOCTYPE html>``` declaration: defines that this document is an HTML5 document
+ The ```<html>``` element: the root element of the page
+ The ```<head>``` element: contains meta information about the page
+ The ```<title>``` element:
	- specifies a title for the HTML page
	- is shown in the browser's title bar or in the page's tab
+ The ```<body>``` element: a container for all the visible contents
+ The ```<h1>``` element: defines a large heading
+ The ```<p>``` element: defines a paragraph

### Browser's Role  
+ To read HTML documents and display them.
+ A browser does not display the HTML tags, but uses them to determine how to display the document.
+ The content inside the ```<body>``` section will be displayed in a browser.
