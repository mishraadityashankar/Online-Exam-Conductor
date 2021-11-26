# Online-Exam-Conductor
It's a web app to make examinations easy and transparent. It provides a responsive UI to support  features like exam creation, automatic grading, results analysis and a time bounded examination window with restrictions on disabling full screen & tab/window switching. It also supports a real time query section for asking and resolving queries during examination. [Link to webapp](https://online-exam-conductor.herokuapp.com/)

## Installation
1. Install node and npm. [Click here to see node and npm installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install mongoDB and create a local db. [Click here to see mongoDB installation](https://docs.mongodb.com/manual/installation/)
3. Create a .env file in the root directory with the following things - <br/>
    * NODE_ENV=development
    * PORT= 4000
    * MONGODB_URI= mongodb://localhost:27017/{dbname}
    * SECRET_KEY= secret
4. Type the following commands inside the root directory to install the node_modules for both frontend and backend-
    ```bash
    npm install
    ```
    
    ```bash
    cd frontend
    npm install
    ```
5. To run the application type-
    ```bash
    node server.js
    ```
 
## Technologies and Approaches Used
Application is based on MERN stack(MongoDB, Express, ReactJS, NodeJS)  and is developed in sprints by maintaining a jira board and proper git repo following Agile methodology. Chat feature is supported by Socket.io. Finally after end to end testing the application was deployed  in CI/CD fashion on heroku. 

**Tools and Technologies** | **Purpose**
------------ | -------------
MongoDB | Database of the system
NodeJS and Express | Backend support
Socket.io | Providing socket connectivity in chat window
ReactJS | Setting up the frontend
Material UI | Building responsive UI
Postman | API testing
Github & Jira | Maintaining the source code and sprint progress
Heroku | Hosting application in CI/CD fashion



## About Functionalities

#### Student functionalities
* Register, login and logout
* Updating personal information
* Can enter an environment where they can attempt the questions set by the teachers
* Real time chat window to ask doubts in between examination
* Automatic grading and score card generation after the exam is over
* Detailed results of all the exams attempted by a student
#### Faculty/Teacher functionalities
* Register, login and logout
* Updating personal information
* Can enter into examination window of any live exam
* Real time chat window to solve queries during test
* Can create a new question for any exam
* Can create an exam and can add/remove any existing question into it 
* Can edit and delete any exam which is not expired yet
* Can get the rank list of all the students sorted by scores and finish time as soon as any exam gets over

### Login & Register 
Both faculty and student can register into the system by filling the appropriate details and by using same credentials can login into the system. Authentication is support by JWT authentication system.

### Profile section 
Both faculty and student can use **Profile** section to see their details and can use **Update** functionality to update their information whenever required, they can use **Logout** button to logout from the platform.

### Create Exam section
Only any faculty have the access to create exam, they need to provide exam name, subject, date & time, exam duration, passing marks and user activity threshold value, in order to restrict user only to limited amount of tab/window switches. They can add/remove any existing question or can even create new question by using **Create question functionality**. Question can be created in a **Multiple Correct Answers** fashion and faculty needs to provide details regarding the correct answer and explanation if required.

### Exam List section
#### For Faculty/Teacher
Teachers can use the toggle button to switch between live and expired exams, the examination details will be shown for each exam and a teacher can enter or can edit and delete a particular live exam. Result list of any expired exam can be referenced by clicking the **Result** button, where a rank list sorted by scores obtained and finish time will be shown of all the students who have attempted that specific exam.
#### For Students
Students can navigative to exam list section inorder to attempt any exam. Only the live exams are shown to the student along with important details regarding each exam.
Student can enter the **Exam Details Window** by clicking the **Enter** button.

### Exam Details
Any student after entering any exam from the list can see instructions, details and a timer showing the status of the examination. After the start time is reached the **Enter Exam** button gets enabled and student can click on that to enter that specific exam. If any student after attempting the exam tries to re-enter again will be redirected back to the **My Grade** section, however if any student exit the exam window in any case, can resume the test before the test ends by navigating again to this page.


### Exam window
#### For Faculty/Teacher
Teacher's window comprises of examination details along with a **Query section** to solve real time doubts and will be visible as soon as the examination gets started. They can also take references from the list of questions displayed on the right side of the window if required and a timer is also provided for indicating the status of the examination.
#### For Students
* Student can enter the exam only after start time of exam is reached and have to give exam in full screen mode. In a case if student exit from full screen, all the questions will be disabled and he/she needs to click on **FULL SCREEN BUTTON** to resume. 
* On computer screen every student will be given objective type Multiple Correct Questions and they needs to select appropriate set of answers by clicking the checkboxes. Student can save their progress by clicking the **SAVE** button and can resume the exam before the end time is reached, if due to some reasons exits the exam window.
* Students can use **Query section** to ask any doubt in between the examination. 
* The system automatically ends the examination when the time limit is over OR when unfair activity count crosses the activity threshold value decided by the teacher. If examinee finishes the exam before time he can quit by pressing the **End Exam** button.
* Once the examination is over, grades will be automatically calculated on the backend and student can see the results by navigating to the **MY GRADES** section.

### My Grade Section
A student can refer to this section for knowing their marks of any particular exam. He/she will see a table of all the exams for which he/she appeared and can get a detailed insights about his/her performance through pie chart, question wise analysis and explanations.


