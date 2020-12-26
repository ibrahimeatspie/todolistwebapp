fetch("/display").then(response => response.json()).then(tasks => {
    console.log(tasks);
    //for each row of information in the array 
    for (i = 0; i < (Object.keys(tasks).length); i++) {

        //Create containing div
        var newList = document.createElement('LI');
        newList.id = (tasks[i]['_id']) + '_list';
        newList.className = "textList"
        //Create delete button and edit button
        var button = document.createElement('button');
        var editButton = document.createElement('button');
        var buttonDiv = document.createElement('DIV');
        buttonDiv.id = (tasks[i]['_id']) + '_buttonDiv';
        //buttonDiv is the div that contains the buttons
        buttonDiv.className = "buttons";
        button.innerHTML = "Delete";
        editButton.innerHTML = "Edit";

        //Set IDs and class names to buttons
        button.id = (tasks[i]['_id']);
        editButton.id = (tasks[i]['_id']) + '_edit';
        editButton.className = 'edit'
        button.className = 'btn';
        //Fetch request for delete button
        button.onclick = function() {
            var id = this.id;
            var div = this.id + '_list';
            document.getElementById(div).style.display = "none";

            fetch("/delete?id=" + id).then(response => response.json()).then(removal => {
                console.log('item deleted');

            });

        }

        //Store task as variable "textNode"
        var textNode = document.createTextNode(tasks[i]["task"]);
        //Create span, the element that the text will be list
        var span = document.createElement('SPAN');
        let text = '_text';
        //Set span id, append textNode to span
        span.id = (tasks[i]['_id'] + text);
        //Append the text to the span  
        span.appendChild(textNode);

        var divArea = document.getElementById('divArea');
        //Append span to the list element
        newList.appendChild(span);
        //Append buttons to button class
        buttonDiv.appendChild(button);
        buttonDiv.appendChild(editButton);
        //Append buttonDiv button to newList
        newList.appendChild(buttonDiv);
        //Append newList to div
        divArea.appendChild(newList);

        editButton.onclick = function() {

            //Find ID of task's text
            id = this.id.substring(0, this.id.length - 5);
            let previousTask = document.getElementById(id + '_text').innerHTML;
            console.log(id);
            var textId = id + '_text';

            //Remove task text element from DOM
            var textDiv = document.getElementById(textId);
            textDiv.parentNode.removeChild(textDiv);
            //Create input element
            var input = document.createElement('INPUT');
            input.className = "editField";
            input.id = id + '_inputEdit';
            var listId = id + '_list';
            var list = document.getElementById(listId);
            list.appendChild(input);
            //Create submitEdit button
            var submitEdit = document.createElement('BUTTON');
            submitEdit.className = "submitButton";
            submitEdit.innerHTML = "Submit";
            submitEdit.id = id + '_submitEdit';
            //Delete previous edit button
            var editId = id + '_edit';
            var editButton = document.getElementById(editId);
            editButton.style.display = "none";
            //Append submitEdit buttons
            document.getElementById(id + "_buttonDiv").appendChild(submitEdit);

            submitEdit.onclick = function() {
                //Read text from the edit box
                inputVal = document.getElementById(input.id).value;
                //If value is empty
                if (inputVal == "") {
                    alert('Please enter a value for which you would like the previous task to be edited to');
                    //Reset editButton to default styling
                    editButton.style.display = "initial";
                    //Create a span tag to contain text and buttons of the task before it was blank edited
                    var previousTaskList = document.createElement('SPAN');
                    previousTaskList.id = id + '_text';
                    //Create variable with information of blank edited task
                    var previousTaskInfo = document.createTextNode(previousTask);
                    var tempButtonDiv = document.getElementById(id + "_buttonDiv");



                    //Remove input
                    input.parentNode.removeChild(input);
                    //Remove submit button
                    submitEdit.parentNode.removeChild(submitEdit);
                    //reverse button to initial style
                    //remove button div
                    tempButtonDiv.parentNode.removeChild(tempButtonDiv);
                    //create a span element containing text and button that holds the tasks information before it was blank edited
                    previousTaskList.appendChild(previousTaskInfo);
                    //append the span tag to the list
                    list.appendChild(previousTaskList);
                    list.appendChild(tempButtonDiv);




                } else {

                    var tempButtonDiv = document.getElementById(id + "_buttonDiv");

                    editButton.style.display = "initial";

                    //Remove submit button
                    submitEdit.parentNode.removeChild(submitEdit);
                    tempButtonDiv.parentNode.removeChild(tempButtonDiv);

                    //Remove input

                    input.parentNode.removeChild(input);
                    //Find the entry, define as entry
                    var entry = document.getElementById(id + '_list');
                    //Create Span tag
                    var text = document.createElement("SPAN");
                    text.id = id + "_text";
                    //Create Text for span tag
                    var string = document.createTextNode(inputVal);
                    text.appendChild(string);
                    list.appendChild(text);
                    list.appendChild(tempButtonDiv);
                    fetch("/edit?id=" + id + "&task=" + inputVal).then(response => response.json()).then(data => {
                        console.log('Item edited');

                    });
                }



            }




        }


    }


});


function returnTask() {
    let taskInit = document.getElementById('input');
    let task = taskInit.value;
    document.getElementById('input').value = "";

    if (task == "") {

    } else {
        fetch("/tasks?task=" + task).then(response => response.json()).then(data => {
            var id = data[((Object.keys(data).length) - 1)]['_id'];
            var buttonDiv = document.createElement('DIV');
            buttonDiv.className = 'buttons';
            buttonDiv.id = id + "_buttonDiv"
            var button = document.createElement('button');
            var editButton = document.createElement('button');
            editButton.className = 'edit';
            button.className = 'btn';

            button.id = id;
            editButton.innerHTML = 'Edit';
            editButton.id = id + "_edit";
            button.innerHTML = "Delete";


            var newList = document.createElement('LI');
            newList.className = 'textList';
            newList.id = id + '_list';
            var span = document.createElement('SPAN');
            span.id = id + '_text';
            var textNode = document.createTextNode(data[((Object.keys(data).length) - 1)]["task"]);
            var div = document.getElementById('divArea');
            span.appendChild(textNode);
            newList.appendChild(span);
            buttonDiv.appendChild(button);
            buttonDiv.appendChild(editButton);
            newList.appendChild(buttonDiv);
            div.appendChild(newList);
            button.onclick = function() {
                var id = newList.id;
                var buttonId = button.id;
                document.getElementById(id).style.display = "none";

                fetch("/delete?id=" + buttonId).then(response => response.json()).then(removal => {
                    console.log("Task with id: " + buttonId + " has succesfully been deleted");




                });




            }


            editButton.onclick = function() {
                //Find ID of task's text
                id = this.id.substring(0, this.id.length - 5);
                let previousTask = document.getElementById(id + '_text').innerHTML;

                var textId = id + '_text';

                //Remove task text element from DOM
                var textDiv = document.getElementById(textId);
                textDiv.parentNode.removeChild(textDiv);
                //Create input element
                var input = document.createElement('INPUT');
                input.className = "editField";
                input.id = id + '_inputEdit';
                var listId = id + '_list';
                var list = document.getElementById(listId);
                list.appendChild(input);
                //Create submitEdit button
                var submitEdit = document.createElement('BUTTON');
                submitEdit.className = "submitButton";
                submitEdit.innerHTML = "Submit";
                submitEdit.id = id + '_submitEdit';
                //Delete previous edit button
                var editId = id + '_edit';
                var editButton = document.getElementById(editId);
                editButton.style.display = "none";

                var buttonDiv = document.getElementById(id + "_buttonDiv")
                //Append submitEdit buttons
                buttonDiv.appendChild(submitEdit);

                submitEdit.onclick = function() {

                    var buttonDiv = document.getElementById(id + "_buttonDiv");
                    console.log(buttonDiv.id);
                    //Read text from the edit box

                    inputVal = document.getElementById(input.id).value;
                    if (inputVal == "") {

                        alert("put in a real value ");
                        //Remove input box

                        input.parentNode.removeChild(input);
                        //Remove button to submit edits

                        submitEdit.parentNode.removeChild(submitEdit);
                        //Reset the edit button back to normal
                        editButton.style.display = "initial";
                        //Remove the edit and delete buttons
                        buttonDiv.remove();
                        //Create span tag with text in it
                        var previousTaskList = document.createElement('SPAN');
                        previousTaskList.id = id + '_text';
                        var previousTaskInfo = document.createTextNode(previousTask);
                        previousTaskList.appendChild(previousTaskInfo);
                        list.appendChild(previousTaskList);
                        //Add button div
                        list.appendChild(buttonDiv);

                    } else {
                        //Remove submit button
                        submitEdit.parentNode.removeChild(submitEdit);
                        buttonDiv.parentNode.removeChild(buttonDiv);
                        //Create standard edit button
                        editButton.style.display = "initial";

                        //Remove input
                        input.parentNode.removeChild(input);
                        //Find the entry, define as entry
                        var entry = document.getElementById(id + '_list');
                        //Create Span tag
                        var text = document.createElement("SPAN");
                        text.id = id + "_text";
                        //Create Text for span tag
                        var string = document.createTextNode(inputVal);
                        text.appendChild(string);
                        list.appendChild(text);
                        list.appendChild(buttonDiv);

                        fetch("/edit?id=" + id + "&task=" + inputVal).then(response => response.json()).then(data => {
                            console.log('Item edited');

                        });
                    }



                }




            }


        });
    }



}