var jsonObj = [{"id":"0", "src":"gallery1_robo.jpg", "name":"gallery1_robo", "info":"gallery image", "update":"08/06/2021"},
{"id":"1", "src":"gallery2_space.jpeg", "name":"gallery2_space", "info":"gallery image", "update":"08/06/2021"},
{"id":"2", "src":"gallery3_sports.jpeg", "name":"gallery3_sports", "info":"gallery image", "update":"08/06/2021"},
{"id":"3", "src":"gallery1_robo.jpg", "name":"gallery1_robo", "info":"gallery image", "update":"08/06/2021"},
{"id":"4", "src":"gallery2_space.jpeg", "name":"gallery2_space", "info":"gallery image", "update":"08/06/2021"},
{"id":"5", "src":"gallery3_sports.jpeg", "name":"gallery3_sports", "info":"gallery image", "update":"08/06/2021"}];

var gallery = document.getElementById("galleryCollection");

displayImages();

var add_button = document.getElementById("add_button");

add_button.addEventListener('click', function addButton(){
     var popup = document.getElementById("AddImagePopup");
    var span = document.getElementsByClassName("close")[0];

    popup.style.display = "block";
    span.onclick = function() {
        popup.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});


var add_image_button = document.getElementById('AddImageButton');

if(add_image_button){
    add_image_button.addEventListener("click", function(){
        var inputImage = document.forms["addImageForm"]["imgName"].value;
        var inputUrl = document.forms["addImageForm"]["url"].value;
        var inputInfo = document.forms["addImageForm"]["info"].value;
        var inputUpdate = document.forms["addImageForm"]["update"].value;

        var dateSplit = inputUpdate.split('/');
        var updateDate = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0]);
        var presentDate = new Date();
        var updateDateTimestamp = (new Date(updateDate)).getTime();
        var presentDateTimestamp = presentDate.getTime();
        var regexpDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;

        if(inputImage===""||inputUrl===""||inputInfo===""||inputUpdate===""||
            updateDateTimestamp>presentDateTimestamp||!regexpDate.test(inputUpdate))
        {
            alert("Please enter valid details");
            return;
        }

        var newJsonObjString = "{\"id\":\""+jsonObj.length+"\",\"name\":\""+inputImage+"\",\"src\":\""+inputUrl+"\",\"info\":\""+inputInfo+"\",\"update\":\""+inputUpdate+"\"}";
        var newJsonObj = JSON.parse(newJsonObjString);
        jsonObj.push(newJsonObj);
        gallery.innerHTML="";
        displayImages();

        var popup = document.getElementById("AddImagePopup");
        popup.style.display = "none";
        return;
    });
}

function displayImages(){
	for(var eachJson in jsonObj){
		var innerObj = jsonObj[eachJson];
		var img = document.createElement("img");
		img.src = innerObj.src;
		img.alt = innerObj.id;
		img.addEventListener('click', function(eventImg){
			var popup1 = document.getElementById('EditImagePopup');
			var span1 = document.getElementsByClassName("close1")[0];

			var index=0;
			for(index=0; index<jsonObj.length; index++){
				if(jsonObj[index].id === eventImg.target.alt){
					break;
				}
			}

			popup1.getElementsByTagName('input')[0].value = jsonObj[index].name;
			popup1.getElementsByTagName('input')[1].value = jsonObj[index].src;
			popup1.getElementsByTagName('input')[2].value = jsonObj[index].info;
			popup1.getElementsByTagName('input')[3].value = jsonObj[index].update;

			var dynamicUpdateButton = document.getElementById('EditImageButton');
			var dynamicRemoveButton = document.getElementById('DeleteImageButton');
			dynamicUpdateButton.value=eventImg.target.alt;
			dynamicRemoveButton.value=eventImg.target.alt;
			dynamicUpdateButton.addEventListener('click', function(eventUpdate){
				var inputImage1 = popup1.getElementsByTagName('input')[0].value;
				var inputUrl1 = popup1.getElementsByTagName('input')[1].value;
				var inputInfo1 = popup1.getElementsByTagName('input')[2].value;
				var inputUpdate1 = popup1.getElementsByTagName('input')[3].value;

				var dateSplit1 = inputUpdate1.split('/');
                var updateDate1 = new Date(dateSplit1[2],dateSplit1[1]-1,dateSplit1[0]);
                var presentDate1 = new Date();
                var updateDateTimestamp1 = (new Date(updateDate1)).getTime();
                var presentDateTimestamp1 = presentDate1.getTime();
                var regexpDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;

                if(inputImage1===""||inputUrl1===""||inputInfo1===""||inputUpdate1===""||
                    updateDateTimestamp1>presentDateTimestamp1||!regexpDate.test(inputUpdate1))
                {
                    alert("Please enter valid details");
                    return;
                }
                else{
					var q=0;
					for(var q=0; q<jsonObj.length; q++){
						if(jsonObj[q].id === eventUpdate.target.value){
							break;
						}
				}
//                console.log(eventUpdate.target.value);
//                console.log(jsonObj[q]);
                jsonObj[q].name = popup1.getElementsByTagName('input')[0].value;
                jsonObj[q].src = popup1.getElementsByTagName('input')[1].value;
                jsonObj[q].info = popup1.getElementsByTagName('input')[2].value;
                jsonObj[q].update = popup1.getElementsByTagName('input')[3].value;
                gallery.innerHTML = "";
                displayImages();

				popup1.style.display = "none";

				}
			});


			dynamicRemoveButton.addEventListener('click', function(eventRemove){
				for(var y=0; y<jsonObj.length; y++){
					if(jsonObj[y].id === eventRemove.target.value){
						jsonObj.splice(y,1);
						break;
					}
				}
				popup1.style.display = "none";

				gallery.innerHTML = "";
				displayImages();
			});

			popup1.style.display = "block";
			span1.onclick = function() {
				popup1.style.display = "none";

			}
			window.onclick = function(event) {
				if (event.target == popup1) {
					popup1.style.display = "none";

				} event.stopPropagation();
			}
		});

		gallery.appendChild(img);
	}
}

