const { v4: uuidv4 } = require('uuid');
const { v5: uuidv5 } = require('uuid');

const userId = (username, namespace) => {
    const uid = uuidv5(username, namespace)
    return uid
}

const recordId = () => {
    const id = uuidv4()
    return id
}

module.exports = {
    userId,
    recordId
}