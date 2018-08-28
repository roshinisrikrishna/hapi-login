var aws = require("aws-sdk");
aws.config.update({
    accessKeyId: "AKIAIYGB6EDK4BTFNEYQ",
    secretAccessKey: "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", region: 'us-east-1'
});
var docClient = new aws.DynamoDB.DocumentClient();
module.exports = {
    getUser: function (request, response) {//function for retrieving user details
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "userdetails_test",
                Key: {
                    userId: request.query.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    console.log("errror at get", err);
                    resolve({ Item: undefined });
                }
                else {

                    //var reid = JSON.stringify(data, null, 1);
                    //console.log("item", data.accnt);

                    resolve(data);
                }
            }
            );
        })
    },
    createUser: function (request, response) {//function for creating a new user
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: "userdetails_test",
                Item: {
                    userName: request.query.name,
                    userPassword: request.query.password,
                    userDOB: request.query.birthyear,
                    createdAt: (Date.now()).toString(),
                    userId: request.query.id,
                    userEmail: request.query.email,
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
                TableName: "userdetails_test",
                Key: {
                    userId: request.query.id
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
                            TableName: "userdetails_test",
                            Key: {
                                userId: request.query.id

                            },
                            UpdateExpression: "set userName=:e,userPassword=:a,userDOB=:b,userEmail=:c,updatedAt=:d",
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
                TableName: "userdetails_test",
                Key: {
                    userId: request.query.id
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    resolve({ user: {} });
                }
                else {
                    if (data.Item) {
                        var params1 = {
                            TableName: "userdetails_test",
                            Key: {
                                userId: request.query.id
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
