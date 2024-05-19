Welcome to the Football League Web UI project. This project involves building a browser-based single-page application (SPA) using Vue.js. The application will interact with a mock server providing data in JSON format, simulating an API from which the frontend will fetch match schedules and results. Based on this data, the application will compute and display the leaderboard according to the specified rules.


## Running Backend Mock Server

In order to work on the frontend application we have provided a simple mock database server.

To run the mock server run the following command:

> **node** server.js dev-mock-server-config.json

After this you would be able to access backend at http://localhost:3001. To verify if the server is running you can run:

> **curl** http://localhost:3001/api/version

The response should be `{"success": true, "version": "1.0"}`

**IMPORTANT:** If you need to change default backend port, make sure to revert them back to 3001 before submitting the solution as otherwise the grading system might not detect the backend server and you will lose points.


## Running Frontend Application

The following command will run the SPA in local dev server:

> **npm** start

The application will be available at http://localhost:3000 and by default you should see a welcome message there.



## Run tests

The test file to verify src/services/LeagueService.js is located at tests/leaderboard.test.js. Feel free to modify the code there in order to test your work.
It is important to implement all methods on src/services/LeagueService.js and TO NOT CHANGE the interface of them.

To run the tests just run this command. 

```shell
npm test
```
