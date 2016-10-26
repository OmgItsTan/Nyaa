;
jQuery(function($) {
    'use strict';
    $("body").hide().show("slow");


    var App = {
        init: function () {

            App.showInitScreen();
        },
        cacheElements: function () {
            App.$doc = $(document);
            App.$gameArea = $('#gameArea');
            App.$templateIntroScreen = $('#showthis').html();
        },
        bindEvents: function () {
            // Host
            App.$doc.on('click', '#btnCreateGame', App.Host.onCreateClick);

            // Player
            App.$doc.on('click', '#btnJoinGame', App.Player.onJoinClick);

        },

        showInitScreen: function() {
            App.$gameArea.html(App.$templateIntroScreen);
            App.doTextFit('.title');
        },

        onCreateClick: function () {
            // console.log('Clicked "Create A Game"');
            IO.socket.emit('hostCreateNewGame');
        }
    };
    App.init();



});