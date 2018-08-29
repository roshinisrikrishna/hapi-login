var aws = require("aws-sdk");
aws.config.update({
    accessKeyId: "AKIAIDD5YNH4DYYD4K5Q",
    secretAccessKey: "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",
    region: 'us-east-1'
});
var docClient = new aws.DynamoDB.DocumentClient();
module.exports = {
    getUser: function (request, response) {//function for retrieving user details
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "user",
                Key: {
                    id: request.query.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    console.log("errror at get", err);
                    resolve({ Item: undefined });
                }
                else {
                    resolve(data);
                }
            }
            );
        })
    },
    createUser: function (request, response) {//function for creating a new user
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "user",
                Item: {
                    name: request.query.name,
                    password: request.query.password,
                    dob: request.query.birthyear,
                    createdAt: (Date.now()).toString(),
                    id: request.query.id,
                    email: request.query.email,
                    updatedAt: '0'
                }
            };
            docClient.put(params, err => {
                if (err) {
                    console.log("errror at post", err);
                    resolve({ message: 'FAILED' })
                }
                else {
                    resolve({ message: 'SUCCESS' });
                }
            })
        })
    },
    updateUser: function (request, response) {
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "user",
                Key: {
                    id: request.query.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    console.log("errror at put", err);
                    resolve({ message: 'FAILED' });
                }
                else {
                    if (data.Item) {
                        var params1 = {
                            TableName: "user",
                            Key: {
                                id: request.query.id

                            },
                            UpdateExpression: "set name=:e,password=:a,dob=:b,email=:c,updatedAt=:d",
                            ExpressionAttributeValues: {
                                ":a": request.query.password,
                                ":b": request.query.birthyear,
                                ":c": request.query.email,
                                ":d": (Date.now()).toString(),
                                ":e": request.query.name
                            },
                            ReturnValues: "UPDATED_NEW"
                        };
                        docClient.update(params1, function (err, data) {
                            if (err) {
                                resolve({ message: 'FAILED' });
                            }
                            else {
                                resolve({ message: 'SUCCESS' });
                            }
                        });
                    }
                    else {
                        resolve({ message: 'FAILED' });
                    }
                }
            }
            );
        })
    },
    deleteUser: function (request, response) {
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "user",
                Key: {
                    id: request.query.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    resolve({ user: {} });
                }
                else {
                    if (data.Item) {
                        var params1 = {
                            TableName: "user",
                            Key: {
                                id: request.query.id
                            }
                        };
                        docClient.delete(params1, function (err, data) {
                            if (err) {
                                console.log(err);
                                resolve({ message: 'FAILED' });
                            }
                            else {
                                resolve({ message: 'SUCCESS' });
                            }
                        });
                    }
                    else {
                        resolve({ message: 'FAILED' });
                    }
                }
            }
            );

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
