# CRUDdy Todo

You are starting with a working Todo list app, but the todo items are stored in memory, so these items get erased each time the server restarts. Your goal is to rewrite the storage layer so that information is saved and loaded to/from the hard drive. To do this, you'll need to make use of callbacks using a callback pattern called continuation-passing style. Additionally, you must follow the error first callback pattern that is widely adopted by the nodejs community.

The server is built using ExpressJS, a minimalist web framework for node. The client is a simple single-page application, written in jQuery, and designed with separation of concerns in mind. You need to know almost nothing about Express to start working on this repo. As long as you produce data that has the same shape as supplied by the current datastore API, you will not need to make any modifications to either the server nor the client code.

# Goals
Dive deeper into Async code using standard nodejs callbacks patterns
Continue to gain an understanding of RESTful APIs and CRUD
Learn about promises and how they simplify async callback pattern in nodejs
Practice ignoring complexity by keeping clear of non-relevant areas of the codebase
