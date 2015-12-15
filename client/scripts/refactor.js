/////////////////////////////////////////////////////////////////////////////
// This file contains two implementations:
//
//    - a minimal jQuery solution
//    - the refactor to Backbone
//
// A minimal jQuery solution is provided to make it easier to compare
// it to the equivalent Backbone implementation. A minimal version of
// chatterbox-client was used in order to reduce complexity, to make
// the equivalent Backbone app easier to understand. This code will
// be a useful reference as you continue to work with Backbone.
//
// Note: the file, refactor.html, should be used to launch these
// version(s) of the app. It will run only one version -- by default it
// runs the Backbone version.
/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
// Backbone-based Implementation of (minimal) chatterbox client
/////////////////////////////////////////////////////////////////////////////

// var Message = Backbone.Model.extend({
//   url: 'http://127.0.0.1:3000/',
//   defaults: {
//     username: '',
//     text: '',
//     objectId: ''
//   }
// });

// var Messages = Backbone.Collection.extend({

//   model: Message,
//   url: 'http://127.0.0.1:3000/',

//   loadMsgs: function() {
//     this.fetch();
//   },

//   parse: function(response, options) {
//     var results = [];
//     for (var i = response.results.length-1; i >= 0; i--) {
//       results.push(response.results[i]);
//     }
//     return results;
//   }

// });

// var FormView = Backbone.View.extend({

//   initialize: function() {
//     this.collection.on('sync', this.stopSpinner, this);
//   },

//   events: {
//     'submit #send': 'handleSubmit'
//   },

//   handleSubmit: function(e) {
//     e.preventDefault();

//     this.startSpinner();

//     var $text = this.$('#message');
//     this.collection.create({
//       username: window.location.search.substr(10),
//       text: $text.val()
//     });
//     $text.val('');
//   },

//   startSpinner: function() {
//     this.$('.spinner img').show();
//     this.$('form input[type=submit]').attr('disabled', "true");
//   },

//   stopSpinner: function() {
//     this.$('.spinner img').fadeOut('fast');
//     this.$('form input[type=submit]').attr('disabled', null);
//   }

// });

// var MessageView = Backbone.View.extend({

//   initialize: function() {
//     this.model.on('change', this.render, this);
//   },

//   template: _.template('<div class="chat" data-id="<%- objectId %>"> \
//                           <div class="user"><%- username %></div> \
//                           <div class="text"><%- text %></div> \
//                         </div>'),

//   render: function() {
//     this.$el.html(this.template(this.model.attributes));
//     return this.$el;
//   }

// });

// var MessagesView = Backbone.View.extend({

//   initialize: function() {
//     this.collection.on('sync', this.render, this);
//     this.onscreenMessages = {};
//   },

//   render: function() {
//     this.collection.forEach(this.renderMessage, this);
//   },

//   renderMessage: function(message) {
//     if (!this.onscreenMessages[message.get('objectId')]) {
//       var messageView = new MessageView({model: message});
//       this.$el.prepend(messageView.render());
//       this.onscreenMessages[message.get('objectId')] = true;
//     }
//   }

// });


/////////////////////////////////////////////////////////////////////////////
// jQuery-based Implementation of (minimal) chatterbox client
/////////////////////////////////////////////////////////////////////////////

// app = {

//     server: 'http://127.0.0.1:3000/',

//     init: function() {
//       // Get username
//       //app.username = window.location.search.substr(10);
//       app.username = prompt('Enter your name');
//       // app.username = 'Joey';

//       app.onscreenMessages = {};

//       // cache some dom references
//       app.$text = $('#message');

//       app.loadMsgs();
//       setInterval (app.loadMsgs.bind(app), 1000);

//       $('#send').on('submit', app.handleSubmit);
//     },

//     handleSubmit: function(e) {
//       e.preventDefault();

//       var message = {
//         username: app.username,
//         text: app.$text.val()
//       };

//       app.$text.val('');

//       app.sendMsg(message);
//     },

//     renderMessage: function(message) {
//       var $user = $("<div>", {class: 'user'}).text(message.username);
//       var $text = $("<div>", {class: 'text'}).text(message.text);
//       var $message = $("<div>", {class: 'chat', 'data-id': message.objectId }).append($user, $text);
//       return $message;
//     },

//     displayMessage: function(message) {
//       if (!app.onscreenMessages[message.objectId]) {
//         var $html = app.renderMessage(message);
//         $('#chats').prepend($html);
//         app.onscreenMessages[message.objectId] = true;
//       }
//     },

//     displayMessages: function(messages) {
//       for (var i = messages.length; i > 0; i--) {
//         app.displayMessage(messages[i-1]);
//       }
//     },

//     loadMsgs: function() {
//       $.ajax({
//         type: 'GET',
//         url: app.server,
//         // data: { order: '-createdAt' },
//         contentType: 'application/json',
//         success: function(json) {
//           console.log(json) 
//           json = JSON.parse(json); 
//           app.displayMessages(json.results);
//         },
//         complete: function() {

//         }
//       });
//     },

//     sendMsg: function(message) {

//       $.ajax({
//         type: 'POST',
//         url: app.server,
//         data: JSON.stringify(message),
//         contentType: 'application/json',
//         success: function(json) {
//           message.objectId = json.objectId;
//           app.displayMessage(message);
//         },
//         complete: function() {

//         }
//       });
//     },

//     // startSpinner: function() {
//     //   $('.spinner img').show();
//     //   $('form input[type=submit]').attr('disabled', "true");
//     // },

//     // stopSpinner: function() {
//     //   $('.spinner img').fadeOut('fast');
//     //   $('form input[type=submit]').attr('disabled', null);
//     // }
// };


var app = {};

app.init = function () {
  app.fetch();
}


app.addMessage = function (item){
  console.log(item);
  var message = item.text ? escapeHtml(item.text) : "";
  var name = item.username ? escapeHtml(item.username) : "";
  $('#chats').append('<div class="chatMessage"> <p class="userName">' 
  + name  + '</p> <p class="messageContent">' 
  + message + '</p> </div>');
}


app.server = 'http://127.0.0.1:3000/';
var messageStore = [];
app.send = function (message) { 
  $.ajax({
    url: 'http://127.0.0.1:3000/',
    type: 'POST',
    data: JSON.stringify(message),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      app.fetch();
    },
    error: function (data, error) {
      console.log(error);
      throw 'chatterbox: Failed to send message';
    }

  });
};

app.fetch = function () {
    $.ajax({
    url: 'http://127.0.0.1:3000/',
    type: 'GET',
    data: JSON.stringify(message),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {

    // check value of room name drop down
    var room = $('#roomSelect').val();
    var totalMessages = 0;
    var j = 0;
    // if default, load all messages
    if(room === 'home'){
      app.clearMessages();
      for (var i=0; i<data.results.length; i++) {
        console.log(data.results); 
          app.addMessage(data.results[i]);
        if(!_.contains(app.room,data.results[i].roomname)){
          app.addRoom(data.results[i].roomname);
        }
      }
    } else {
      while (totalMessages <= 20 || data.results[j]===undefined) {
        if(data.results[j].roomname === room){
          app.addMessage(data.results[j]);
          totalMessages++;
        }
        j++;
      }
    }

    // if not default, filter to show only one room     


      
    },
    error: function (data) {
      throw 'chatterbox: Failed to send message';
    }
  });
};

app.rooms = [];

app.addRoom = function (val) {
  // body...
  // populate 10 most recent posts
    if(!_.contains(app.rooms, val)){
      $('#roomSelect').append('<option value="'+ val + '">' + val + '</option>');
      app.rooms.push(val);
    }
};

app.clearMessages = function () {
  $('#chats').children().remove();
}

var message = {
  username: 'purple platypus',
  text: '<div>test</div>',
  roomname: '4chan'
};

function escapeHtml(text) {
 var map = {
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#039;'
 };

 return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

app.addFriend = function () {
  console.log('test');
};

app.handleSubmit = function () {
    var messageObj = {
      username: $('#username').val(),
      text : $('#message').val(),
      roomname: $('#roomname').val()||$('#roomSelect').val()
    }
    console.log(messageObj);
    app.send(messageObj);
};

$(document).ready(function(){
  app.init();
  setInterval(app.fetch,1500);
  $('#chats').on('click', 'p.userName', function () {
    app.addFriend($(this).text());
  });

  $('#main').on('click', '.submit', function (event) {
    event.preventDefault();
    app.handleSubmit();
    $('#message').val('');
  });

  $('#main').on('change', '#roomSelect', function(){
      app.clearMessages();
      app.fetch();
  })

});




