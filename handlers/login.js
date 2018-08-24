var fileserver = require('fs');
module.exports = {
    getUser: function (request, response) {//function for retrieving user details
        return new Promise(function (resolve, reject) {
            fileserver.readFile('./usr.json', 'utf8', function (err, data) {
                if (err) {//if file not exists
                    resolve({ user: undefined })
                }
                else {
                    if (!data) {//if no data is there in the file
                        resolve({ user: {} })
                    }
                    else {//if file exists and check data existing in file
                        let savedUsers = JSON.parse(data);
                        if (isUserFound(savedUsers, request.query.id)) {
                            var id = isUserFound(savedUsers, request.query.id);
                            resolve({ user: id })
                        }
                        else {
                            resolve({ user: {} })
                        }
                    }
                }
            });
        })
    },
    createUser: function (request, response) {//function for creating a new user
        return new Promise(function (resolve, reject) {
            var users = [];
            fileserver.readFile('./usr.json', 'utf8', function (err, data) {
                var b = false;
                if (err) {//if file not exists create a new file
                    var cs = fileserver.createWriteStream("usr.json");
                    resolve({ message: 'SUCCESS' });
                }
                if (data) {//if file is already created
                    let parsedat = JSON.parse(data);
                    let id = request.query.id;
                    for (let ele of parsedat) {
                        if (ele) {
                            if (ele.id === id) {
                                b = true;
                            }
                            else {
                                users.push(ele);
                            }
                        }
                    }
                }
                users.push(request.query);
                fileserver.writeFile("./usr.json", JSON.stringify(users), function (err) {
                    if (err) throw err;//if file not exists
                    if (b === true) {
                        resolve({ message: 'FAILED' });//if user already exists
                    }
                    resolve({ message: 'SUCCESS' });//if user is created
                });
            });
        })
    },
    updateUser: function (request, response) {
        return new Promise(function (resolve, reject) {
            fileserver.readFile('./usr.json', 'utf8', function (err, data) {
                if (err) { resolve({ message: 'FAILED' }); }//if file not exists
                var users = [];
                if (data) {
                    let parsedat = JSON.parse(data);
                    var b = false;
                    let id = request.query.id;
                    for (let ele of parsedat) {
                        if (ele) {//finding the user based on user id
                            if (ele.id === id) {
                                ele.name = request.query.name;
                                ele.password = request.query.password;
                                ele.birthyear = request.query.birthyear;
                                ele.email = request.query.email;
                                b = true;
                            }
                        }
                        users.push(ele);
                    }
                    fileserver.writeFile("./usr.json", JSON.stringify(users), function (err) {
                        if (err) throw err;//if file not exists
                        if (b === false) {
                            resolve({ message: 'FAILED' });//if user does not exists
                        }
                        resolve({ message: 'SUCCESS' });//when successfully updated user details
                    });
                }
                else {
                    resolve({ message: 'FAILED' });//if user dataabse is not created
                }
            });
        })
    },
    deleteUser: function (request, response) {
        return new Promise(function (resolve, reject) {
            fileserver.readFile('./usr.json', 'utf8', function (err, data) {
                if (err) { resolve({ message: 'FAILED' }); }//if file not exists
                var users = [];
                if (data) {
                    let parsedat = JSON.parse(data);
                    var b = false;
                    let id = request.query.id;
                    for (let ele of parsedat) {
                        if (ele) {//finding the user based on id
                            if (ele.id == id) {
                                b = true;
                            }
                            if (ele.id !== id) {//push all the users other than the given user 
                                users.push(ele);
                            }
                        }
                    }
                    fileserver.writeFile("./usr.json", JSON.stringify(users), function (err) {
                        if (err) throw err;//if file not exists
                        if (b !== true) {
                            resolve({ message: 'FAILED' });//if user does'nt exist
                        }
                        resolve({ message: 'SUCCESS' });//when successfully deleted
                    });
                }
                else {
                    resolve({ message: 'FAILED' });//if no user is entered
                }
            });
        });
    }
}
function isUserFound(users, id) {//function for retrieving the user from file based on given user id
    for (let user of users) {
        if (user.id === id) {
            return user;
        }
    }
    return false;
}