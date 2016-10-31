function Calendar() {
  var self = this;
  self.events = [];
  self.fullHeight = 720;
  self.fullWidth = 600;
  self.maxEventsSize = 1;

  
  this.init = function(events) {
    self.events = events.sort(function(a, b){return a.id - b.id;});
    var timeslots = getTimeSlots();
    updateEventByTimeSlots(timeslots);
    setEventPosition();
    self.render();   
  };

  this.render = function() {
    var html = '';
    var width = self.fullWidth / self.maxEventsSize;
    self.events.forEach(function(event) {
      var horizontal = event.end - event.start;
      var startPos = (event.position * width);
      var color = getRandomColour();
      html += createEventHTMLString(event.id, event.start, startPos, width, horizontal, color);
    });
    document.getElementById("calander").innerHTML = html;
  }

  function createEventHTMLString(text, top, left, width, height, background) {
    var style =  'top: ' + top + 'px; left: ' + left + 'px; width: ' + width + 'px; height: ' + height + 'px; background-color:' + background + ';';
    return '<div class="eventItem" style="' + style + '"><span>' + text + '</span></div>';
  }

  function getRandomColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getTimeSlots() {
    var timeslots = [];
    for (i=0; i < self.fullHeight; i++) {
      timeslots[i] = [];
    }

    self.events.forEach(function(event) {
      if (event.start > event.end) {
        var temp = event.start;
        event.start = event.end;
        event.end = temp;
      }

      for (var i = event.start; i <= event.end - 1; i++) {
        timeslots[i].push(event.id);
      }
    });
    return timeslots;
  }

  function updateEventByTimeSlots(timeslots) {
    timeslots.forEach(function (timeslot) {
      var timeSlotLength = timeslot.length;
      if(timeslot.length > 0) {
        timeslot.forEach(function (eventId) {
          var eventNode = self.events[eventId-1];

          timeslot.forEach(function (targetEventId) {
            var targetNode = self.events[targetEventId-1];
            if (eventId != targetEventId) {
              if (eventNode.neighbours != null) {
                eventNode.neighbours[targetEventId] = targetNode;
              } else {
                eventNode.neighbours = {};
              }
            }
          });

          if (!eventNode.count || eventNode.count < timeSlotLength) {
            eventNode.count = timeSlotLength;
          }       
        });
      }
    });
    
  }

  function setEventPosition() {
    self.events.forEach(function(node) {
      var positionArray = new Array(node.count);
      self.maxEventsSize = Math.max(self.maxEventsSize, node.count);
      for (var neighbourId in node.neighbours) {
        var neighbour = node.neighbours[neighbourId];
        if (neighbour.position != null) {
            positionArray[neighbour.position] = true;
        }
      }

      for (var i = 0; i < positionArray.length; i++) {
        if (!positionArray[i]) {
            node.position = i;
            break;
        }
      }
    });
  }

}

window.onload = function() {
  /*var events = [
   {id : 1, start : 30, end : 150},
   {id : 2, start : 540, end : 600},
   {id : 3, start : 560, end : 620},
   {id : 4, start : 610, end : 670}
  ]; */

  var events = [
    {
    "id": 1,
        "start": 36,
        "end": 108
    },
    {
    "id": 2,
        "start": 67,
        "end": 139
    },
    {
    "id": 3,
        "start": 110,
        "end": 182
    },
    {
    "id": 4,
        "start": 156,
        "end": 230
    },
    {
    "id": 5,
        "start": 205,
        "end": 285
    },
    {
    "id": 6,
        "start": 255,
        "end": 333
    },
    {
    "id": 7,
        "start": 278,
        "end": 362
    },
    {
    "id": 8,
        "start": 342,
        "end": 424
    },
    {
    "id": 9,
        "start": 392,
        "end": 445
    },
    {
    "id": 10,
        "start": 426,
        "end": 511
    },
    {
    "id": 11,
        "start": 484,
        "end": 547
    },
    {
    "id": 12,
        "start": 512,
        "end": 563
    },
    {
    "id": 13,
        "start": 525,
        "end": 580
    },
    {
    "id": 14,
        "start": 548,
        "end": 604
    },
    {
    "id": 15,
        "start": 569,
        "end": 625
    },
    {
    "id": 16,
        "start": 580,
        "end": 647
    },
    {
    "id": 17,
        "start": 607,
        "end": 659
    },
    {
    "id": 18,
        "start": 630,
        "end": 685
    }
  ];

  var cal = new Calendar();
  cal.init(events);
}

