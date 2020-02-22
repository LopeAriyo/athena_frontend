const baseURL = "http://localhost:3000/";
// const baseURL = "http://10.218.3.249:3000/";

// const signUpURL = baseURL + "signup";
const signInURL = baseURL + "signin";
const validateURL = baseURL + "validate";

//API Functions

const get = url => {
    return fetch(url, {
        headers: {
            Authorization: localStorage.token
        }
    }).then(response => response.json());
};

const post = (url, configObj) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(configObj)
    }).then(response => response.json());
};

// const signUp = (firstName, lastName, email, password, passwordConfirmation) => {
//     return post(signUpURL, { firstName, lastName, email, password, passwordConfirmation});
// };

const signIn = (email, password) => {
    return post(signInURL, { email, password });
};

const validate = () => get(validateURL);

export default { signIn, validate };

// export default { signIn, signUp, validate};
