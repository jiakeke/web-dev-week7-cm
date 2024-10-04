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

```js
...
// src/Context/AuthContext.jsx
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

#### Self-Assessment for AuthContext Code

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


```js
// File name or function
// Your code part B
```

### Backend

```js
// File name or function
// Your code part A
```

```js
// File name or function
// Your code part B
```
