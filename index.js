var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" })

var dynamoDB = new AWS.DynamoDB.DocumentClient()
var response = { statusCode: 200 }
    
exports.handler = async (event) => {
    
    var message = JSON.parse(event.Records[0].Sns.Message)
    var table = event.Records[0].Sns.MessageAttributes.Table.Value
    
    var params = { TableName: table, Item: message }

    await saveData(params).catch(e => response = { statusCode: 500, message: e.message })
    
    return response;
}


const saveData = (params) => {
    return new Promise((resolve, reject) => {
       dynamoDB.put(params, (err, data) => {
            if (err) { reject(new Error(err.message)) }
            else resolve(data)
        });
    });    
}