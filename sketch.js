var database;

var drawing=[];
var currentPath=[];

var isDrawing=false;

var position;

function setup(){
  database=firebase.database();
  var canvas=createCanvas(400,400);
  //canvas.mousePressed(startPath);
  //canvas.mouseReleased(endPath);
  canvas.parent('canvascontainer');
  var clearButton=select('#clearButton');
  clearButton.mousePressed(clearDrawing);
}

function startPath() {
  isDrawing=true;
  currentPath=[];
  drawing.push(currentPath);
}

//function endPath() {
 // isDrawing=false;
//}

function draw(){
  background(0);
  getData();

stroke(255);
strokeWeight(4)
noFill();
beginShape();
  for ( var i = 0; i<drawing.length; i++) {
    vertex(drawing[i].x,drawing[i].y);
    endShape();
  }
 
}

function mouseDragged() {
  var point={
    x:mouseX,
    y:mouseY
  }
  currentPath.push(point);
  var currentPathRef= database.ref('drawings').set({
   'currentPath':currentPath
  });
}

function getData() {
 // console.log("hello");
  //var saveButton=select('#saveButton');
 // saveButton.mousePressed(saveDrawing);
 // saveButton.mousePressed(readPosition);
  var pointPosition = database.ref('drawings');
  pointPosition.on("value", readPosition);
 //  var pointPosition2 = database.ref('drawings');
 // pointPosition2.on("value", readPosition2);
 
  function readPosition(data){
   drawing = data.val().currentPath;
    console.log("Error");
   // pointPosition.x = position.x;
  //  pointPosition.y = position.y;
    }


}

function clearDrawing() {
  drawing=[];
}

/*function saveDrawing() {
 var result= database.ref('drawings').set({
  x:mouseX,
  y:mouseY
});
 console.log(result);
function dataSent(err,status){
console.log(status);
}
}*/