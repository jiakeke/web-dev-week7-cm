# Coding Marathon 3

- **Group #: 7**
- **Link to the backend repositories:**
  - [Backend repo for API V1](https://github.com/jiakeke/web-dev-cm3-g7-backend-no-auth)
  - [Backend repo for API V2](https://github.com/jiakeke/web-dev-cm3-g7-backend-auth)
- **Link to the frontend repository:**
  - [Frontend repo for API V1](https://github.com/jiakeke/web-dev-cm3-g7-frontend-no-auth)
  - [Frontend repo for API V2](https://github.com/jiakeke/web-dev-cm3-g7-frontend-auth)
- **URLs for the deployed APIs:**
  - [URL for API V1]
  - [URL for API V2]

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
functions (login, logout) to modify this state. It ensures that the user’s
login status is persistent across sessions and provides a clear structure for
other components to access authentication data.

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
This code defines a `RouteGuard` component that uses React's `useContext` hook to access authentication state from `AuthContext`. It conditionally renders its children based on the user's login status, redirecting unauthenticated users to the login page.

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

```js
// File name or function
// Your code part A
```

```js
// File name or function
// Your code part B
```
