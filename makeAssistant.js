// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC5d01014322632b47006b8f6b9379cf4f';
const authToken = require('../private/authToken');
const client = require('twilio')(accountSid, authToken);

// create actions for the assistant
const hello = {
    actions: [
	{ say: "I'm the draft assistant. What can I do for you?" },
	{ listen: true }
    ]
};

function createTask( sid, taskName, taskActions ) {
    client.autopilot.assistants( sid )
	.tasks
	.create({
	    uniqueName: taskName,
	    actions: taskActions,
	})
	.then(assistant => console.log(assistant.sid))
	.done();
}

client.autopilot.assistants
    .create({
	friendlyName: 'Tammy Draft',
	uniqueName: 'TammyDraft'
    })
    .then(assistant => createTask(assistant.sid, "hello", hello))
    .done();
