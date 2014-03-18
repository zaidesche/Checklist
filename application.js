$(document).ready(function () {

    /*var nameChecklist = prompt("What would you like to name your checklist?");

    $('h1').text(nameChecklist);

    if (nameChecklist === "") {
        var x = "Bread Objectives";
        $('h1').text(x);
    }

    if (nameChecklist === null) {
        var x = "Bread Objectives";
        $('h1').text(x);
    }*/

    $('#rename').on('click', function () {
        var currentName = $('h1').text();
        var rename = prompt("What would you like to rename your checklist?", currentName);
        $('h1').text(rename);

        if (rename === "") {
            var x = "Checklist";
            $('h1').text(x);
        }

        if (rename === null) {
            var x = "Checklist";
            $('h1').text(x);
        }
    });

    function count() {
        var incompleteHeader = $('h2').first();
        var completeHeader = $('h2').last();

        var countIncomplete = function () {
            var count = $('#incomplete').children().length;
            return count;
        }
        $('span', incompleteHeader).text(countIncomplete);

        var countComplete = function() {
            var count = $('#complete').children().length;
            return count;
        }
        $('span', completeHeader).text(countComplete);
    }

    count();

    var incompleteClear = $('.clearitems').first();
    var completeClear = $('.clearitems').last();

    $('#clearList').on('click', function () {
        $('ul li').remove();
        $('.clearitems').addClass('hide');
        count();
    });

    $(incompleteClear).on('click', function () {
        var incompleteList = $('#incomplete');
        $('li', incompleteList).remove();
        count();
    });

    $(completeClear).on('click', function () {
        var completeList = $('#complete');
        $('li', completeList).remove();
        count();
    });

    var incompleteList = $("#incomplete");
    var incompleteListItem = $('li', incompleteList);

    var completeList = $("#complete");
    var completeListItem = $('li', completeList);


    function removeThis() {
        var removeButton = $('.remove');
        removeButton.on('click', function () {
            $(this).closest('li').remove();
            console.log("list item has been removed.");
            count();
        });
    }

    removeThis();

    function moveItem() {
        var checkBox = $('.psuedoCheckBox', incompleteListItem);
        checkBox.click( function() {
            $(this).css({backgroundColor:"#F38630"});
            $(this).fadeOut('slow', function(){
                var parent = $(this).parent();
                parent.closest('li').prependTo(completeList);
                parent.closest('div').addClass('checkComplete');
                var checkboxdiv = parent.closest('div');
                checkboxdiv.siblings('.listContain').addClass('listComplete');
                checkboxdiv.siblings('.remove').remove();
                count();
            });
        });
    }

    moveItem();

    // User Adds a New Checklist Item    


    $("#userEntry").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#add").click();
        }
    });

    // Change List Item

    $('.listContain', incompleteListItem).on('click', function(){
        var current = $(this).children('p');
        var currentText = current.text();
        console.log(current);
        var correction = prompt("Change list item to:", currentText);
        current.text(correction);

        if (correction == "") {
            current.text(currentText);
        } else if (correction == null) {
            current.text(currentText);
        }

    });

    /*$('.listContain', incompleteListItem).on('click', function(){
        var current = $(this).children('p')
        current.hide();
        $(this).append('<input class="change" input[type="text"] placeholder="' + current.text() + '">');
    });*/



    //

    function enter() {

        var add = $('#add');

        add.on('click', function (event) {
            event.preventDefault();
            //var incompleteClear = $('.clearitems').first();
            //incompleteClear.removeClass('hide');
            $('.clearitems').removeClass('hide');

            var value = $("#userEntry").val();

            var newListItem = $("<li><div class='checkContain'><div class='psuedoCheckBox'></div></div><div class='remove'>Remove</div><div class='listContain'><p></p></div></li>");

            $('p', newListItem).text(value);
            incompleteList.append(newListItem);
            $('#userEntry').val('');

            $('.psuedoCheckBox', newListItem).on('click', function () {
                $(this).css({backgroundColor:"#F38630"});
                $(this).fadeOut('slow', function(){
                    var parent = $(this).parent();
                    parent.closest('li').prependTo(completeList);
                    parent.closest('div').addClass('checkComplete');
                    var checkboxdiv = parent.closest('div');
                    checkboxdiv.siblings('.listContain').addClass('listComplete');
                    checkboxdiv.siblings('.remove').remove();
                    count();
                });
                //var completeClear = $('.clearitems').last();
                //completeClear.removeClass('hide');
            });

            removeThis();
            count();

            


        });
    }

    enter();

});