function sendNotification({type, company, role}) {
    console.log(`NOTIFICATION: ${type} for ${company} - ${role}`

    );
}

module.exports = {
    sendNotification,
};