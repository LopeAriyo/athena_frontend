const baseURL = "http://localhost:3000/";
// const baseURL = "http://10.218.3.249:3000/";

const signUpURL = baseURL + "signup";
const signInURL = baseURL + "signin/";
const validateURL = baseURL + "validate/";

const cyclesURL = baseURL + "/cycles/";
const currentCycleURL = cyclesURL + "/current";

const cycleJournalURL = baseURL + "/cycle_journals/";
const entriesURL = baseURL + "/entries/";

const journalsURL = baseURL + "/journals/";

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
            Accept: "application/json",
            Authorization: localStorage.token
        },
        body: JSON.stringify(configObj)
    }).then(response => response.json());
};

const patch = (url, id, configObj) => {
    return fetch(`${url}${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.token
        },
        body: JSON.stringify(configObj)
    }).then(response => response.json());
};

const destroy = (url, id) => {
    return fetch(`${url}${id}`, {
        method: "DELETE"
    });
};

const signUp = user => {
    return post(signUpURL, { user });
};

const signIn = (email, password) => {
    return post(signInURL, { email, password });
};

const validate = () => get(validateURL);

const cycles = () => get(cyclesURL);
const currentCycle = () => get(currentCycleURL);
const getCycleJournal = id => get(`${cycleJournalURL}/${id}`);
const journals = () => get(journalsURL);

const formatToday = () => {
    const today = new Date(); // 2009-11-10
    var day = today.getDate(); //numerical day
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    return month + "/" + day + "/" + year;
};

const postEntry = (id, responses) =>
    post(entriesURL, { date: formatToday(), cycle_journal_id: id, responses });

const patchEntry = (id, responses) => patch(entriesURL, id, { responses });

const postCycleJournal = id => post(cycleJournalURL, { journal_id: id });

const destroyCycleJournal = id => destroy(cycleJournalURL, id);

const patchCycle = (id, cycle) => patch(cyclesURL, id, cycle);

export default {
    signIn,
    signUp,
    validate,
    cycles,
    currentCycle,
    getCycleJournal,
    postCycleJournal,
    destroyCycleJournal,
    journals,
    postEntry,
    patchEntry,
    patchCycle
};
