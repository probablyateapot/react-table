
const {
    REACT_APP_SM_DATASET_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
    REACT_APP_LG_DATASET_URL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
    REACT_APP_BUILD_DESCRIBE = null,
    REACT_APP_REPO_URL = null,
} = process.env;

export const smDatasetUrl = REACT_APP_SM_DATASET_URL;
export const lgDatasetUrl = REACT_APP_LG_DATASET_URL;

export const repoUrl = REACT_APP_REPO_URL;
export const buildDesc = REACT_APP_BUILD_DESCRIBE;

export const fuseOptions = {
    shouldSort: true,
    tokenize: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 24,
    minMatchCharLength: 2,
    keys: [
        { weight: 0.9, name: "firstName" },
        { weight: 0.9, name: "lastName" },
        { weight: 0.7, name: "email" },
        { weight: 0.2, name: "description" }
    ]
};

