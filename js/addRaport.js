window.onload = function() {
//Get element lateTime and overtime
var lateTime = document.getElementById('lateTime');
var overtime = document.getElementById('overTime');
var timeWorkSummary = document.getElementById('timeWork');
var getFrameWorkTimeVar = getFrameWorkTime();

$(document).ready(function() {
  $('#datepicker-raportDay').datepicker();

  $('#datepicker-dayOff').datepicker();


$('#additionalTimeWork').timepicker({
  icons: {
      up: "oi oi-caret-top",
      down: "oi oi-caret-bottom"
  },
  defaultTime : '00:00',
  showMeridian: false,
  maxHours : '12'
});
});


$('#startWork').timepicker(
  {
    defaultTime : getFrameWorkTimeVar[0],
    icons: {
        up: "oi oi-caret-top",
        down: "oi oi-caret-bottom"
    },
    showMeridian: false

  }
).on('changeTime.timepicker', function(e) {
  $('#startWorkSummary').text(e.time.value);
  filtringTimeModule.compareStartWork(getStartWorkTime(),getEndWorkTime());
  refreshSummary();
});

//getStartWorkTime(),getEndWorkTime())

$('#endWork').timepicker({
  icons: {
      up: "oi oi-caret-top",
      down: "oi oi-caret-bottom"
  },
  showMeridian: false,
  defaultTime : getFrameWorkTimeVar[1]
}).on('changeTime.timepicker', function(e) {
  $('#endWorkSummary').text(e.time.value);
  filtringTimeModule.compareEndWork(getStartWorkTime(),getEndWorkTime());
  refreshSummary();
});

//Get frame work time
function getFrameWorkTime() {
  var elFrameWork = document.getElementById('frameWorkList');
  var startFrameWork = elFrameWork.options[elFrameWork.selectedIndex].dataset.frameWorkStart;
  var endFrameWork = elFrameWork.options[elFrameWork.selectedIndex].dataset.frameWorkEnd;
  return [startFrameWork,endFrameWork];
}


//Get frame work, change on minute
function getFrameWorkInMinute() {
  var elFrameWork = document.getElementById('frameWorkList');
  var startFrameWork = elFrameWork.options[elFrameWork.selectedIndex].dataset.frameWorkStart;
  var endFrameWork = elFrameWork.options[elFrameWork.selectedIndex].dataset.frameWorkEnd;
  //Get frame work - change on minutes
  var splitStartFrameWork = startFrameWork.split(':');
  var splitEndFrameWork = endFrameWork.split(':');
  var startFrameWorkSummary = parseInt((splitStartFrameWork[0])*60) + parseInt(splitStartFrameWork[1]);
  var endFrameWorkSummary = parseInt((splitEndFrameWork[0])*60) + parseInt(splitEndFrameWork[1]);
  return [startFrameWorkSummary,endFrameWorkSummary,startFrameWork,endFrameWork];

}



function updateStartAndEndWorkSummary() {
  document.getElementById('startWorkSummary').innerHTML = document.getElementById('startWork').value;
  document.getElementById('endWorkSummary').innerHTML = document.getElementById('endWork').value;
}

//Get start work time
function getStartWorkTime() {
  var startWorkEl = document.getElementById('startWork').value;
  var splitStartWork = startWorkEl.split(':');
  var startWorkSummary = parseInt((splitStartWork[0]) * 60) + parseInt(splitStartWork[1]);
  return startWorkSummary;

}

//Get end work time
function getEndWorkTime() {
  var endWorkEl = document.getElementById('endWork').value;
  splitEndWork = endWorkEl.split(':');
  var endWorkSummary = parseInt((splitEndWork[0]) * 60) + parseInt(splitEndWork[1]);
  return endWorkSummary;
}


//work Time
function calculateWorkTime(endWork,startWork) {
  var minutes = endWork - startWork;
  var hours = minutes / 60;
  var numbSignsHours = Math.floor(hours) + '';
  numbSignsHours = numbSignsHours.length;
  if (hours % 1 != 0) {
    if(numbSignsHours === 1) {
      var minutesOverOneHour = minutes - (Math.floor(hours)*60);
      var numbSignsMinutes = Math.floor(minutesOverOneHour) + '';
      numbSignsMinutes = numbSignsMinutes.length;
      if(numbSignsMinutes === 1 ) {
        return "0" + Math.floor(hours) + ":" + "0" + minutesOverOneHour;
    } else {
        return "0" + Math.floor(hours) + ":" + minutesOverOneHour;
    }
  }

  if(numbSignsHours === 2) {
    var minutesOverOneHour = minutes - (Math.floor(hours)*60);
    var numbSignsMinutes = Math.floor(minutesOverOneHour) + '';
    numbSignsMinutes = numbSignsMinutes.length;
    if(numbSignsMinutes === 1 ) {
      return Math.floor(hours) + ":" + "0" + minutesOverOneHour;
  } else {
      return Math.floor(hours) + ":" + minutesOverOneHour;
  }
  }

  } else {
    if(numbSignsHours === 1) {
      return "0" + Math.floor(hours) + ":00"; }
    else {
      return Math.floor(hours) + ":00";
      }
  }
  }
//Late and overtime
function calculateLate(timeWork,timeFrameWork) {
  timeSummary = timeWork - timeFrameWork;
  if (timeSummary>=0) {
  if (timeSummary>=60 || timeSummary<0) {
    var hours = timeSummary / 60;
    var minutes = timeSummary - (Math.floor(hours)*60);
    if(minutes<10)
      minutes = "0" + minutes;
    if(Math.floor(hours)<10) {
        return "0" + Math.floor(hours) + ':' + minutes;
    } else {
      return Math.floor(hours) + ':' + minutes;
    }
  } else {
    var numbSigns = timeSummary + '';
    numbSigns = numbSigns.length;
    if(numbSigns===1) {
      return "00:"+"0"+timeSummary;
    } else {
      return "00:" + timeSummary;
    }
  }
} else {
    return timeSummary;
  }
}


//Late and overtime
function calculateOvertime(timeWork,timeFrameWork,timeWorkBeforeWork) {
  timeSummary = (timeWorkBeforeWork + timeWork) - timeFrameWork;
  if (timeSummary>=0) {
  if (timeSummary>=60 || timeSummary<0) {
    var hours = timeSummary / 60;
    var minutes = timeSummary - (Math.floor(hours)*60);
    if(minutes<10)
      minutes = "0" + minutes;
    if(Math.floor(hours)<10) {
        return "0" + Math.floor(hours) + ':' + minutes;
    } else {
      return Math.floor(hours) + ':' + minutes;
    }
  } else {
    var numbSigns = timeSummary + '';
    numbSigns = numbSigns.length;
    if(numbSigns===1) {
      return "00:"+"0"+timeSummary;
    } else {
      return "00:" + timeSummary;
    }
  }
} else {
  return '00:00';
  }
}

var filtringTimeModule = (function() {

  var lastGoodTimeForEnd;
  var lastGoodTimeForStart;

  var object = {}; //public object

  object.compareEndWork = function(startWork,endWork) {
    if(startWork >= endWork) {
      alert('Nieprawidłowa godzina');
      $('#endWork').timepicker('setTime', lastGoodTimeForEnd);
    } else {
      lastGoodTimeForEnd = document.getElementById('endWork').value;
    }
  }

  object.compareStartWork = function(startWork,endWork) {
    if(endWork <= startWork) {
      alert('Zła godzina rozpoczęcia pracy');
      $('#startWork').timepicker('setTime', lastGoodTimeForStart);
    } else {
      lastGoodTimeForStart = document.getElementById('startWork').value;
    }
  }

  return object;
}());

function refreshSummary() {
  updateStartAndEndWorkSummary();
  timeWorkSummary.innerHTML = calculateWorkTime(getEndWorkTime(),getStartWorkTime());
  var getFrameWorkInMinuteVar = getFrameWorkInMinute();
  var calculateLateVar = calculateLate(getStartWorkTime(),getFrameWorkInMinuteVar[0]);
  if(typeof(calculateLateVar) == 'number') {
    calculateLateVar = calculateLateVar * (-1);
    lateTime.innerHTML = '00:00';
    overTime.innerHTML = calculateOvertime(getEndWorkTime(),getFrameWorkInMinuteVar[1],calculateLateVar);
    console.log('getEndWorkTime: ' + getEndWorkTime() + ' getFrameWorkInMinuteVar[1]: ' + getFrameWorkInMinuteVar[1] + ' calculateLateVar: '+ calculateLateVar);
  } else {
    lateTime.innerHTML = calculateLateVar;
    overTime.innerHTML = calculateOvertime(getEndWorkTime(),getFrameWorkInMinuteVar[1],0);
  }
}

function copyAccordion(e) {
  // removeBootstrapToggle();

  e.preventDefault();
  var parent = document.getElementById('container-doneTask');
  var accordion = document.getElementById('accordion');
  var copyAccordion = accordion.cloneNode(true);
  var changeId = copyAccordion.getElementsByClassName('collapse');
  var changeHref = copyAccordion.getElementsByClassName('link-addDoneTask');
  var changeIdBootstrapToggleInput = copyAccordion.getElementsByClassName('bootstrap-toggle-input');
  var changeIdBootstrapToggleForm = copyAccordion.getElementsByClassName('bootstrap-toggle-form');
  var numberDoneTask = document.getElementsByClassName('doneTask-number');
  var removeLink = document.getElementsByClassName('removeDoneTask');
  var addEventTaskType = copyAccordion.getElementsByClassName('form-select-taskType');
  var doneTaskType = copyAccordion.getElementsByClassName('doneTask-type');
  copyAccordion.id = 'accordion' + numberDoneTask.length;
  parent.appendChild(copyAccordion);
  addEventTaskType[0].onchange = function () {
    getTaskType(addEventTaskType[0],doneTaskType[0]);
  }

  changeIdBootstrapToggleForm[0].dataset.formpay = numberDoneTask.length;
  changeIdBootstrapToggleInput[0].dataset.toggleid = numberDoneTask.length;
  changeId[0].id = 'collapse-doneTask' + parent.children.length;
  changeHref[0].href = '#collapse-doneTask' + parent.children.length;
  removeLink[removeLink.length-1].dataset.accordionId = 'accordion' + (numberDoneTask.length - 1);
  updateAccordion();
  showPromptInfoAddTask();
  test();
  // refreshBootstrapToggle();

}

function removeAccordion(e) {
  e.preventDefault();
  var idAccordion = this.dataset.accordionId;
  var deleteAccordion = document.getElementById(idAccordion);
  var parent = deleteAccordion.parentNode;
  parent.removeChild(deleteAccordion);
  updateAccordion();
  showPromptInfoAddTask();
}


function getTaskType(selectedList,selectedSpan) {
  var taskType = selectedList[selectedList.selectedIndex].value;
  var nameGroup = selectedList[selectedList.selectedIndex].parentNode.label;
  if( nameGroup === 'Instalacja') {
    selectedSpan.innerHTML = nameGroup + ' ' + taskType;
} else {
    selectedSpan.innerHTML = taskType;
}
}

function updateAccordion() {
  var removeDoneTask = document.getElementsByClassName('removeDoneTask');
  var addDoneTask = document.getElementsByClassName('addDoneTaskPlus');
  var numberDoneTask = document.getElementsByClassName('doneTask-number');
  for(var i=0; i<addDoneTask.length;i++)
    addDoneTask[i].addEventListener('click',copyAccordion);
  for(var k=0; k<removeDoneTask.length;k++)
    removeDoneTask[k].addEventListener('click',removeAccordion);
  for(var j=0; j<numberDoneTask.length;j++)
    numberDoneTask[j].innerHTML = j;


}

function showPromptInfoAddTask() {
  var parent = document.getElementById('container-doneTask');
  var promptInfo = document.getElementsByClassName('prompt-addTask');
  if(parent.children.length === 2) {
    promptInfo[0].style.display = 'block';
  } else {
    promptInfo[0].style.display = 'none';
  }
}

function removeBootstrapToggle() {
  var oldScript = document.getElementsByTagName('script');
  for(var i=0;i<oldScript.length;i++) {
    var t = oldScript[i].src;
    var s = t.split('/');
    if(s[s.length-1] === 'bootstrap-toggle.min.js') {
      var parent = oldScript[i].parentNode;
      parent.removeChild(oldScript[i]);
    }
  }
}

function refreshBootstrapToggle()
{
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'js/bootstrap-toggle.min.js';
   head.appendChild(script);
}


var selectFrameWork = document.getElementById('frameWorkList');
var selectPayableEvent = document.getElementById('payableEvent');
selectFrameWork.onchange = function() {
  refreshSummary();
}

function test() {
  $('input[data-toggleid]*').change(function(e) {

    var id = $(this).data('toggleid');
    $('[data-formpay=' + id + ']').toggle();
    var el = $('[data-toggleid]*');
    var el2 = '[data-formpay=' + id + ']';


    console.log(el2);
  });

}

$('input[data-toggleid=1]').change(function(e) {
    $('[data-formpay=' + '1' + ']').toggle();
});
$('input[data-toggleid=2]').change(function(e) {
    $('[data-formpay=' + '2' + ']').toggle();
});
test();
refreshSummary();
updateAccordion();

}
