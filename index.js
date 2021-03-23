function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(array) {
   return array.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    };
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    };
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    // find timeIn and timeOut and substract to get difference
    let timeIn = employeeRecord.timeInEvents.find((event) => event.date === date).hour
    let timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date).hour

    return (timeOut - timeIn) / 100
}


function wagesEarnedOnDate(employeeRecord, date) {
    // find hours worked on a date and multiply by hourly rate
    return (hoursWorkedOnDate(employeeRecord, date)) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    // find all dates
    // reduce wages earned for all dates
    let dates = employeeRecord.timeInEvents.map((event) => event.date);
    let allWages = dates.reduce(function (totalWages, date) { 
        return wagesEarnedOnDate(employeeRecord, date) + totalWages
    }, 0);
    return allWages
}

function findEmployeeByFirstName(employeeRecord, firstName) {
    return employeeRecord.find((name) => name.firstName === firstName);
}

function calculatePayroll(srcArray) {
    // map over all employees and return total wages
    // combine together and reduce for total
    let allEmployeeWages = srcArray.map((emp) => allWagesFor(emp));
    return allEmployeeWages.reduce(function (wages, e) {
        return (wages + e);
    });
}