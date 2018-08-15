var cells=[] ;
var rows,cols;
var cellDimention=25;
var current ,start ,end;
var stack=[];

function setup (){
  createCanvas(500,500);
  rows = floor(500/cellDimention);
  cols = floor(500/cellDimention);
  console.log(`Columns: ${cols}`);
  console.log(`Rows: ${rows}`);
//  frameRate(5); 
 
  for (var j=0 ;j<rows ;j++){
    for (var i=0 ; i<cols ;i++){
      var cell =new Cell (i,j);
      cells.push(cell);
    }
  }

  start=floor((random(0,19)));
  end=floor((random(380,399)));
  current=cells[0];

  first = true;
  while (first || next || stack.length >0){
    first = false;
    console.log(`At ${current.i}, ${current.j}`);
    current.visited=true;
    //current.highlight();
    //1.
    var next= current.checkNeighbors();
    if (next) {
      next.visited=true;
      
      //2.
      stack.push(current);

      //3.
      removeWalls(current,next);
      

      //4.
      current=next;
    }
    else if (stack.length > 0) {
      current = stack.pop();
    }
  }
}



function draw(){

  background(30);
  for (var i=0 ;i<cells.length ;i++){
    cells[i].show();
  }
  
  cells[start].highlight();
  cells[end].highlight();
}


function Cell(i, j){
  this.j= j;
  this.i=i;
            //top - right - bottom - left
  this.walls=[true , true , true , true];
  this.visited=false;  
this.highlight=function(){
  var x= this.i * cellDimention;
  var y=this.j*cellDimention;
  noStroke();
  fill(255, 153, 153);
  rect(x,y,cellDimention,cellDimention, 15 ,15);
}

  this.show=function(){
   var x=this.i*cellDimention;
   var y= this.j*cellDimention;

   
   if (this.visited){
    noStroke();
    fill(0);
    rect(x ,y,cellDimention,cellDimention);
  }

   //fill(204, 101, 192, 127);
   stroke(200,67,100);
   
   //top
  if (this.walls[0]){
   line ( x , y , x + cellDimention , y);
  }
   //right
   if (this.walls[1]){
   line ( x + cellDimention , y , x + cellDimention , y + cellDimention);
   }
   //bottom
   if (this.walls[2]){
   line ( x + cellDimention , y + cellDimention , x , y + cellDimention);
   }
   //left
   if (this.walls[3]){
   line ( x , y + cellDimention , x , y);
   }

}

 this.checkNeighbors =function(){
  var Neighbors=[];

  var top=cells[cellIndex( i, j-1 )];

  if (top && !top.visited){
    Neighbors.push(top);
  }
  var right=cells[cellIndex( i+1 ,j )];
  
  if (right && !right.visited){
    Neighbors.push(right);
  }
  var bottom=cells[cellIndex( i, j+1 )];

  if (bottom && !bottom.visited){
    Neighbors.push(bottom);
  }
  var left=cells[cellIndex( i-1 , j)];

  if (left && !left.visited){
    Neighbors.push(left);
  }

  if (Neighbors.length>0){
    var r=floor(random(0,Neighbors.length));
    return Neighbors[r];
  } else {
    return undefined ;
  }
  }
  
 }
 

function removeWalls(a,b){
  console.log(`Removing walls between (${a.i}, ${a.j}) and (${b.i}, ${b.j})`);
  var x= a.i - b.i;
 //b-a
  if (x===1){
    a.walls[3]=false;
    b.walls[1]=false;
  }
  //a-b
  else if(x===-1){
    a.walls[1]=false;
    b.walls[3]=false;
  }

  var y= a.j - b.j;
  //a/b
  if (y=== -1){
    a.walls[2]=false;
    b.walls[0]=false;
  }
  //b/a
  else if(y===1){
    a.walls[0]=false;
    b.walls[2]=false;
  }
}
function cellIndex(i,j){

  if (i<0 || j<0 || j>rows-1 || i>cols-1){
     return undefined;
  }
  return i + j * cols;
}