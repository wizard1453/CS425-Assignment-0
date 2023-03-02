# CS425 - Computer Graphics I (Spring 2022)

## Assignment 0: Introduction to JavaScript and WebGL
The goal of this first assignment is to get you familiar with JavaScript, WebGL calls, development environment, and the assignment submission process. You will develop a web application to render triangles with vertex position and colors defined in an external JSON file, specified by the user through a configuration panel.

There are four tasks, and you are free to re-use any code from the labs (check discord for links).

If you want, you can use the [generate.ipynb](https://github.com/uic-cs425/spring-2022-assignment-0/blob/main/generate.ipynb) Jupyter file to generate your own triangle mesh from an image file:

![University of Illinois at Chicago](https://raw.githubusercontent.com/uic-cs425/spring-2022-assignment-0/main/result.png)

### Tasks

#### Task 1
Create a configuration panel with six elements:
1) Three [sliders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) with values between 0 and 255.
2) A [slider](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) with value between 1 and n, where n is the number of triangles in the file specified by the user.
3) A file [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) element responsible for loading a JSON file.
4) A [checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) element to toggle between the colors of the triangles.

You are free to choose the layout and color of the configuration panel elements.

#### Task 2
Connect the elements of the configuration panel and a WebGL canvas. The first three sliders should change the **background RGB color**, and the fourth slider should change the **number of triangles being rendered** (between 1 and n). The file input button should allow the users to load a JSON file; after loaded, the previous slider should be updated so that its range go from 1 to n (number of triangles in the new file). The checkbox element should toggle between two modes: 1) triangle color specified by the configuration panel, and 2) triangle color specified by loaded JSON file.

#### Task 4
The application should contain a file [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) element responsible for loading a JSON file. This JSON file will contain vertex position and color information for all n triangles. You should load this JSON file, [parse it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and use the data to fill one (or two) buffer arrays. The JSON will be in the following format:

```
{"positions": [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n], "colors": [r_1,g_1,b_1,a_1,r_2,g_2,b_2,a_2,...,r_n,g_n,b_n,a_n]}}
```

You can download two complete examples in this repository (files [example.json](https://github.com/uic-cs425/spring-2022-assignment-0/blob/main/example.json) and [uic.json](https://github.com/uic-cs425/spring-2022-assignment-0/blob/main/uic.json)). In order to read the file uploaded by the user, use the [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) object, and the [onload](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload) event handler. If by any chance a file not following the specified format is loaded, then the application should display an [alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert).

#### Task 5
Display the triangles in the WebGL canvas, according to the number specified in the fourth slider (between 1 and n triangles).

### Submission
The delivery of the assignments will be done using GitHub Classes. It will not be necessary to use any external JavaScript library for your assignments. If you do find the need to use additional libraries, please send us an email or Discord message to get approval. Your assignment should contain at least the following files:
- index.html: the main HTML file.
- assignment0.js: assignment main source code.

### GitHub Classroom
[git](https://en.wikipedia.org/wiki/Git) is a version control system, designed to help developers track different versions of your code, synchronize them across different machines, and collaborate with others. Follow the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git on your computer. [GitHub](https://github.com/) is a website that supports git as a service. [This](https://guides.github.com/activities/hello-world/) a nice tutorial on how to get started with git and GitHub.

We will provide a GitHub Classroom link for each assignment. Follow the link to create a repository. Use `git clone` to get a local copy of the newly created repository. After writing your code, you can push your modifications to the server using `git commit` followed by `git push`. For example, if your username is `uic-user`:

```
git clone git@github.com:uic-cs425/assignment-0-uic-user.git
touch index.html
git add index.html
git commit -am "index.html file"
git push
```

### Grading
The code will be evaluated on Firefox. Your submission will be graded according to the quality of the image results, interactions, and correctness of the implemented algorithms.

To get a D on the assignment, your application should have the components of the configuration panel. To get a C on the assignment, your application should change the background color according to the configuration panel. To get a B on the assignment, your application should load and parse a JSON file in the format specified above. To get an A on the assignment, the application should visualize the number of triangles of the JSON file as specified by the fourth slider.