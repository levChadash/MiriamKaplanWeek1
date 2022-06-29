class Patient {
    reports = [];
    constructor(id, reports) {
        this.id = id;
        this.reports = reports;

    }
}
class Report {
    constructor(startDate, endDate, city, location) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.location = location;
    }

}
window.onload = function () {
    var MypatientList = [];
    if (!JSON.parse(sessionStorage.getItem(`MypatientList`))) {
        const patientList = JSON.stringify(MypatientList);
        sessionStorage.setItem('MypatientList', patientList);
    }
    document.getElementById('Add').addEventListener('click', () => add())
    document.getElementById('id').addEventListener('change', () => getMyReports())
}
function getMyReports() {
    clearList();

    const id = document.getElementById("id").value;
    if (isValidIsraeliID(id)) {
        const index = findMyReports(id);

        if (id) {
            if (index == null) {
                const v = document.getElementById('cistGroup').hidden = false;
                return;
            } else {

                let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));
                MyReports = MypatientList[index]["reports"];
                var reportTemp = document.getElementById("temp-row");
                MyReports.forEach(reportObj => {
                    drawReport(reportObj, reportTemp);

                });
            }
        }
    }
}
function findMyReports(id) {
    let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));
    for (let i = 0; i < MypatientList.length; i++) {
        if (MypatientList[i].id == id) {
            const v = document.getElementById('cistGroup')
            v.hidden = false;
            return i;
        }
    }

    return null;

}
function clearList() {
    const v = document.getElementById('cistGroup').hidden = true

    document.getElementById("reports").innerHTML = " ";
}
function drawReport(reportObj, reportTemp) {
    let clonProduct = reportTemp.content.cloneNode(true);
    clonProduct.querySelector(".startDate").innerHTML = new Date(reportObj.startDate).toLocaleString('en-US');
    clonProduct.querySelector(".endDate").innerHTML = new Date(reportObj.endDate).toLocaleString('en-US');
    clonProduct.querySelector(".city").innerHTML = reportObj.city;
    clonProduct.querySelector(".location").innerHTML = reportObj.location;
    clonProduct.getElementById("deleteReport").addEventListener('click', () => deleteItem(reportObj))

    document.getElementById("reports").appendChild(clonProduct);
}
function deleteItem(reportObj) {
    let id = document.getElementById('id').value;
    let index = findMyReports(id);
    let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));
    reports = MypatientList[index]['reports']
    let i = -1;
    for (let report of reports) {
        i++;
        let check = equal(reportObj, report)
        if (check) {
            reports.splice(i, 1);
            MypatientList[index]['reports'] = reports;
            sessionStorage.setItem('MypatientList', JSON.stringify(MypatientList));
            getMyReports();
            break;
        }
        console.log(check);
    }


}
function equal(reportObj, report) {
    if (reportObj.startDate === report.startDate && reportObj.endDate == report.endDate &&
        reportObj.city == report.city && reportObj.location == report.location) {
        return true;
    }
    return false;
}
function add() {
    const id = document.getElementById("id").value;
    const index = findMyReports(id);
    const startDate = document.getElementById('sDate').value;
    const endDate = document.getElementById('eDate').value;
    const city = document.getElementById('Icity').value;
    const location = document.getElementById('Ilocation').value;
    let r = new Report(startDate, endDate, city, location)
    let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));
    if (index == null) {
        let p = new Patient(id, [r]);
        MypatientList.push(p);

    }
    else {
        reports = MypatientList[index]['reports'];
        reports.push(r);
        MypatientList[index]['reports'] = reports;

    }
    sessionStorage.setItem('MypatientList', JSON.stringify(MypatientList));
    getMyReports();

}
function isValidIsraeliID(id) {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) {
        alert("ther was a mastake in your input enter the id again");
        return false;
    }
    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
}

