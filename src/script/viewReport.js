window.onload = function () {
  var MypatientList = [];
  if (!JSON.parse(sessionStorage.getItem(`MypatientList`))) {
      const patientList = JSON.stringify(MypatientList);
      sessionStorage.setItem('MypatientList', patientList);
  }
  document.getElementById('rsearch').addEventListener('input', () => getReportsByCity());
};

function get() {
  clearList();
  let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));

  MypatientList.forEach(patient => {
    var reportTemp = document.getElementById("report-row");
    patient.reports.forEach(reportObj => {
      drawReport2(reportObj, reportTemp);
    })
  })
}

function clearList() {
  document.getElementById("list").innerHTML = " ";
}

function drawReport2(reportObj, reportTemp) {
  let clonProduct = reportTemp.content.cloneNode(true);
  clonProduct.querySelector(".list").innerHTML = new Date(reportObj.startDate).toLocaleString('en-US')
    + " - " + new Date(reportObj.endDate).toLocaleString('en-US')
    + " |  " + reportObj.location;

  document.getElementById("list").appendChild(clonProduct);
}



function getReportsByCity() {
  clearList()
  let MypatientList = JSON.parse(sessionStorage.getItem('MypatientList'));

  MypatientList.forEach(patient => {
    var reportTemp = document.getElementById("report-row");
    patient.reports.forEach(reportObj => {
      let cheack = contain(reportObj)
      if (cheack == true) {
        drawReport2(reportObj, reportTemp);
      }
    })
  })
  sortList()

}
function contain(reportObj) {
  let search = (document.getElementById('rsearch').value).toLowerCase();

  const city = (reportObj.city).toLowerCase();
  if (city.indexOf(search) > -1) {
    return true;
  } else {
    return false;
  }

}
function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("list");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("startDate");
    // Loop through all list items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}
get();