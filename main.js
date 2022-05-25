Status = "";
object_name = "";
objects = [];
object_lower_case_convert = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input");
    object_lower_case_convert = object_name.toLowerCase();
    console.log(object_lower_case_convert);
}

function modelLoaded(){
    console.log("Cococssd is Initialized");
    console.log(object_name);
    Status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (Status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_lower_case_convert){
                document.getElementById("number_of_objects").innerHTML = "Object found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_lower_case_convert + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Object not found";
            }
        }
    }
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
        console.log(results);
        objects = results;
}