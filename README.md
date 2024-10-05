# Coding Marathon 3

- **Group #: 7**
- **Link to the backend repositories:**
  - [Backend repo for API V1](https://github.com/jiakeke/web-dev-cm3-g7-backend-no-auth)
  - [Backend repo for API V2](https://github.com/jiakeke/web-dev-cm3-g7-backend-auth)

- **Link to the frontend repository:**
  - [Frontend repo for API V1](https://github.com/jiakeke/web-dev-cm3-g7-frontend-no-auth)
  - [Frontend repo for API V2](https://github.com/jiakeke/web-dev-cm3-g7-frontend-auth)

- **URLs for the deployed APIs:**
  - [URL for API V1](https://web-dev-cm3-g7-backend-no-auth.onrender.com)
  - [URL for API V2](https://web-dev-cm3-g7-backend-auth.onrender.com)
  - [URL for Frontend V1](https://web-dev-cm3-g7-frontend-no-auth.onrender.com)
  - [URL for Frontend V2](https://web-dev-cm3-g7-frontend-auth.onrender.com)

- **Links to the testing:**
  - [Backend tests for API V1](https://github.com/jiakeke/web-dev-cm3-g7-backend-no-auth/tree/main/tests)
  - [Backend tests for API V2](https://github.com/jiakeke/web-dev-cm3-g7-backend-auth/tree/main/tests)


- **Bonus for useContext:**
    We successfully used useContext instead of props in the front-end program.
    The function is executed correctly

---
## Self-Assessment of Code

### Frontend

#### Self-Assessment for `src/Context/AuthContext.jsx`
```js
...
export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedJwt = localStorage.getItem("user");
    if (storedJwt) {
      setIsLoggedIn(true);
      setToken(storedJwt.token);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("user");
  };
...
```

##### 1. Introduction
This code defines an `AuthContext` and an `AuthProvider` component to manage
authentication state in a React application. It handles user login status,
token management, and provides a context for other components to access and
modify authentication-related data.

##### 2. Strengths
- **State Management:**
  The code effectively uses React's `useState` to manage multiple pieces of
  state (`isLoggedIn`, `token`, `isLoading`, `error`).
- **Persistent Login:**
  The `useEffect` hook checks for a stored JWT in `localStorage` to
  maintain the user's login state across page reloads.
- **Context Provider:**
  The `AuthContext.Provider` is correctly set up to pass down the
  authentication state and functions to the rest of the application.
- **Logout Functionality:**
  The `logout` function properly resets the authentication state and
  removes the token from `localStorage`.

##### 3. Areas for Improvement
- **Error Handling:**
  While an `error` state is defined, it is not currently utilized.
  Implementing error handling in the authentication logic would improve
  robustness.
- **Token Parsing:**
  The code assumes `storedJwt.token` exists without parsing the stored JWT.
  Adding JSON parsing would ensure correct retrieval of the token.
  ```js
  const storedJwt = JSON.parse(localStorage.getItem("user"));
  if (storedJwt) {
    setIsLoggedIn(true);
    setToken(storedJwt.token);
  }
  ```
- **Security Considerations:**
  Storing JWTs in localStorage can be a security risk. Using HttpOnly
  cookies for token storage could enhance security.
- **Loading State Management:**
  Ensure that the application properly handles the isLoading state to avoid
  rendering issues during the authentication check.

##### 4. Functionality
  The code successfully manages the authentication state and provides necessary
  functions (`login`, `logout`) to modify this state. It ensures that the
  user’s login status is persistent across sessions and provides a clear
  structure for other components to access authentication data.

##### 5. Conclusion
  Overall, the AuthContext and AuthProvider are well-implemented and provide a
  solid foundation for managing authentication in a React application. By
  addressing the identified areas for improvement, the code can be made more
  robust and secure. Future steps include implementing error handling and
  considering more secure token storage methods.


#### Self-Assessment for `src/components/RouteGuard.jsx`
```js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function RouteGuard({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
```

##### 1. Introduction
This code defines a `RouteGuard` component that uses React's `useContext` hook
to access authentication state from `AuthContext`. It conditionally renders its
children based on the user's login status, redirecting unauthenticated users to
the login page.

##### 2. Strengths
- **Context Usage:**
  The component effectively uses `useContext` to access `isLoggedIn` and
  `isLoading` states from `AuthContext`, ensuring that authentication logic is
  centralized and easily manageable.

- **Conditional Rendering:**
  The component handles different states (`isLoading`, `isLoggedIn`)
  appropriately, ensuring that the UI reflects the user's authentication
  status.

- **Redirection:**
  The use of `Navigate` from `react-router-dom` to redirect unauthenticated
  users to the login page is a straightforward and effective way to manage
  protected routes.

##### 3. Areas for Improvement
- **Loading State Handling:**
  Returning an empty fragment (`<></>`) when `isLoading` might not provide the
  best user experience. Consider displaying a loading spinner or some
  placeholder content to indicate that the authentication check is in progress.
  ```javascript
  if (isLoading) {
    return <div>Loading...</div>;
  }
  ```
- **Error Handling:**
  The component does not currently handle potential errors that might occur
  during the authentication check. Adding error handling logic could improve
  robustness.

- **Code Readability:**
  Adding comments to explain the purpose of each conditional check can enhance
  code readability and maintainability.
  

##### 4. Functionality
  The RouteGuard component successfully protects routes by checking the user’s
  authentication status and redirecting unauthenticated users to the login
  page.  It ensures that only authenticated users can access certain parts of
  the application, enhancing security and user experience.

##### 5. Conclusion
  Overall, the RouteGuard component is well-implemented and effectively manages
  route protection based on authentication status. By addressing the identified
  areas for improvement, such as enhancing the loading state handling and
  adding error handling, the component can provide an even better user
  experience and robustness.



### Backend

#### Self-Assessment for `controllers/userControllers.js`
```js
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check for user email
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({ username, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

```

##### 1. Introduction
  This code defines three main functions (`signupUser`, `loginUser`, and `getMe`)
  for handling user authentication and data retrieval in a Node.js application.
  It uses `jsonwebtoken` for token generation, `bcryptjs` for password hashing,
  and Mongoose for interacting with a MongoDB database.

##### 2. Strengths
- **JWT Generation**: The `generateToken` function effectively creates a JSON
  Web Token (JWT) with a 3-day expiration, which is crucial for maintaining
  user sessions securely.
- **Password Security**: The use of `bcryptjs` for hashing passwords ensures
  that user passwords are stored securely in the database.
- **Error Handling**: The code includes basic error handling, returning
  appropriate HTTP status codes and error messages when something goes wrong.
- **Modular Structure**: The functions are well-organized and modular, making
  the code easier to maintain and extend.

##### 3. Areas for Improvement
- **Input Validation**: The code currently checks for the presence of required
  fields but does not validate the format of these fields (e.g., email format,
  password strength). Implementing a validation library like
  `express-validator` could improve input validation.
  ```javascript
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  ```
- **Error Messages:** The error messages could be more descriptive to help with
  debugging and user feedback. For example, specifying which field is missing
  or invalid.
- **Security Enhancements:** Consider adding rate limiting and account lockout
  mechanisms to protect against brute force attacks.
- **Code Duplication:** The error handling code is duplicated in each function.
  Extracting this into a middleware or utility function could reduce
  redundancy.
- **Environment Variables:** Ensure that `process.env.SECRET` is properly managed
  and secured, possibly using a library like dotenv to manage environment
  variables.

##### 4. Functionality
  The code successfully handles user `registration`, `login`, and data retrieval.
  It ensures that passwords are securely hashed and that JWTs are generated for
  session management. The signupUser function checks for existing users and
  hashes passwords before saving new users to the database. The loginUser
  function verifies user credentials and generates a token upon successful
  authentication. The getMe function retrieves the authenticated user’s data.

##### 5. Conclusion
  Overall, the user controllers are well-implemented and provide essential
  functionality for user authentication and data management. By addressing the
  identified areas for improvement, such as enhancing input validation,
  improving error messages, and adding security features, the code can be made
  more robust and secure. Future steps include implementing these improvements
  and ensuring that the code adheres to best practices for security and
  maintainability.


#### Self-Assessment for `controllers/jobControllers.js`
```js
const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// Get all jobs
const getAllJobs = async (req, res) => {

  try {
    const jobs = await Job.find({ }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new job
const createJob = async (req, res) => {

  try {
    const user_id = req.user._id;
    const newJob = new Job({
      ...req.body,
      user_id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
...
```

##### 1. Introduction
  This file defines controller functions for managing job-related data in a
  MongoDB database, using the Mongoose ORM. The controllers handle various job
  operations, including fetching all jobs, creating a job, retrieving a job by
  ID, updating a job, and deleting a job. These functions are exposed as part
  of a RESTful API to interact with the job data.

##### 2. Strengths
- **Comprehensive CRUD Operations:**
  The file includes well-structured functions that cover all the basic CRUD
  operations (Create, Read, Update, Delete) for job data. Each operation is
  clearly separated into distinct functions: `getAllJobs`, `createJob`,
  `getJobById`, `updateJob`, and `deleteJob`.

- **Error Handling with Try-Catch:**
  Each controller function uses `try-catch` blocks to handle potential errors,
  ensuring that issues during database interactions do not crash the server.
  Instead, appropriate error responses (`500` for server errors) are sent to
  the client, enhancing robustness.

- **Validation of ObjectId:**
  The code includes a validation check using
  `mongoose.Types.ObjectId.isValid(jobId)` to ensure the provided job ID is a
  valid MongoDB ObjectId. This prevents unnecessary database queries and
  improves the overall efficiency and error-handling of the application.

- **Asynchronous Operations:**
  All the database operations are handled asynchronously using `async/await`,
  which is essential for non-blocking I/O operations in a Node.js environment.
  This ensures the server remains responsive, even when dealing with large
  datasets or slower database operations.

##### 3. Areas for Improvement
- **User Authorization:**
  While the `createJob` function assigns the job to the authenticated user via
  `user_id`, other functions such as `updateJob` and `deleteJob` do not check
  if the requesting user is the owner of the job. This could lead to
      unauthorized modifications or deletions of job entries.
  - **Improvement**:
    Implement authorization checks in `updateJob` and `deleteJob` to ensure
    only the job's owner can modify or delete it.
    ```js
    const job = await Job.findOneAndUpdate({
      _id: jobId, user_id },
      { ...req.body },
      { new: true }
    );
    ```
- **Inconsistent Response Messages:**
  The error messages returned in various parts of the code are inconsistent.
  For example, some parts use `{ error: "No such job" }`, while others return
  different error structures.
  - **Improvement**: Standardize the error messages across all controller
    functions to maintain consistency in API responses.

- **Duplicate ObjectId Validation:**
  The validation for `ObjectId.isValid(jobId)` is repeated across several
  functions. This results in code duplication.
  - **Improvement**: Create a helper function or middleware to handle ObjectId
    validation, reducing redundancy and improving code maintainability.

- **Lack of Data Validation in `createJob`:**
  The `createJob` function does not validate the incoming job data
  (`req.body`). This can lead to incomplete or malformed data being saved in
  the database.
  - **Improvement**: Add validation for required fields like `title`,
    `description`, etc., before saving the job.
  ```js
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ error: "Title and description are required."
    });
  }
  ```

##### 4. Functionality
  The controller functions perform their respective operations successfully.
  They ensure that jobs can be created, read, updated, and deleted from the
  database, providing full functionality for managing job records through the
  API. However, user-specific operations like `updateJob` and `deleteJob` could
  be improved by implementing authorization checks. Additionally, the overall
  robustness could be enhanced by adding validation and improving error
  messages.

##### 5. Conclusion
  The `jobControllers.js` file is generally well-implemented, handling essential
  CRUD operations with proper error handling and asynchronous operations. By
  addressing areas such as user authorization, consistent error messages, and
  input validation, the codebase could be made more secure, maintainable, and
  user-friendly.

