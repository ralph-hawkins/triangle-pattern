const segmentTag = document.querySelectorAll('div.segment')
const groupTag = document.querySelectorAll('div.group')
const rowTag = document.querySelectorAll('div.row')
let removedSegmentsTag = document.querySelectorAll('div.hidden')

let randomInt = 0

let rotationDegrees = 0
let groupPosition = 0

let maxColouredSegments = 100
let currentColouredSegments = 0

const delayInMilliseconds = 10

let marginFix = 0

function rotateSegment() {
  segmentTag.forEach (function(currentValue) {
    currentValue.style.transform = 'rotate('+rotationDegrees+'deg)' 
    rotationDegrees = rotationDegrees + 90
  })
}

function moveGroup() {
  groupTag.forEach (function(currentValue) {
    currentValue.style.transform = 'translateX('+groupPosition+'vw)'
    groupPosition = groupPosition + 12.5
  })
}


function pickRandomSegment() {
  if (currentColouredSegments != maxColouredSegments) {
    setTimeout(function() {
      getRandomInt(0, segmentTag.length)
      makeSegmentColour()
      pickRandomSegment()
    }, delayInMilliseconds)
  }
}

function makeSegmentColour() {
  if (segmentTag[randomInt].classList.contains('colour') == false) {
     segmentTag[randomInt].classList.add('colour')
     currentColouredSegments = currentColouredSegments + 1
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  randomInt = Math.floor(Math.random() * (max - min)) + min
}

function positionRows() {
  rowTag.forEach (function(currentValue) {
    currentValue.style.marginLeft = '-'+marginFix+'%'
    marginFix = marginFix + 100
  })
}

function removeOverflowRows() {
    rowTag.forEach (function(currentValue) {
      if ((currentValue.offsetTop + currentValue.offsetHeight) > window.innerHeight) {
        currentValue.classList.add('removed')
        currentValue.remove()
    }
  })
}

removeOverflowRows()
positionRows()
pickRandomSegment()
rotateSegment()
moveGroup()