working and assumptions

1. two types of users: student, teacher
2. On landing page, login form provided for both type of users
3. And, if the user is not registered, a link to registration page is provided.
4. to register users, I am not using seperate forms, a single common form is used. And the user can tell us about
their role(student/teacher)

5. when login, teacher can view, create, update and delete results. But a teacher does not have access to results
created by other teachers.[It was not mentioned in the assignment, but without this feature the application is meaningless].

6. when login, a student can check result by entering roll number.[we are not restricting the student to check only
his/her result. if they know roll_number/dob of other students, they can check their results as well. It's not a compromise,
it is a feature.]

7. proper authorization has been implemented. a student cannot login as a teacher.