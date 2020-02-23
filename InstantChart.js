
function init(height, width){
    // initilizes the canvas first with the initial height and width if the canvas to be made.
    let canvas;
    canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'instantchart');
    canvas.setAttribute('height', height);
    canvas.setAttribute('width', width);
    document.getElementById('test').appendChild(canvas);
    return canvas.getContext("2d");
}
function init_grid(height,width){
    let canvas = init(height, width);
    canvas.translate(0,height); canvas.scale(1,-1);
    // make the vertical grid lines
    for(let i=0;i<=width;i+=10){
        canvas.moveTo(i,0);
        canvas.lineTo(i,height);
    }
    // make the horizontal lines
    for(let i=0;i<=height;i+=10){
        canvas.moveTo(0,i);
        canvas.lineTo(width,i);
    } 
    // set the grid lines color
    canvas.strokeStyle = "#eee";
    canvas.stroke(); 
    return canvas;
}
window.plot_point = (x,y, canvas, color)=>{
    canvas.beginPath();
    canvas.arc(x,y,2,0,2*Math.PI,true);
    canvas.fillStyle = color;
    canvas.fill();
}
// the object that is being used must have following body
//  var obj = {
//      "height": 100,
//      "width": 100,
//      "coordinates": [{"x":1,"y":1},{"x":1,"y":3}]
//  }
function instantchart(obj){
    // first validate the object that is being used by the use of the custom exceptions
    this.validateObject(obj);
    let canvas = init_grid(obj.height,obj.width);
    // x is the array that consists of the x-cordinate of the object
    let x = [];
    // y is the array that consists of the y-cordinate of the object
    let y = [];
    for(point of obj.coordinates){
        x.push(point.x);
        y.push(point.y);
    }
    let x_max = x.reduce((a,b)=>{return Math.max(a,b)});
    let y_max = y.reduce((a,b)=>{return Math.max(a,b)});
    let x_scale = (x_max + 100) / obj.width;
    let y_scale = (y_max + 100) / obj.height;
    canvas.beginPath();
    canvas.moveTo(x[0]/x_scale , y[0]/y_scale);
    for(let i=1;i<x.length;i++){
        canvas.lineTo(x[i]/x_scale,y[i]/y_scale);
    }
    canvas.strokeStyle = '#FF0066'
    canvas.stroke();
    for(let i=0;i<x.length;i++){
        window.plot_point(x[i]/x_scale,y[i]/y_scale,canvas,'#FF0066');
    }

}
function validateObject(obj) {
    if(!obj.height){
        throw {"error": "Please enter the height of canvas"}
    }
}
class InstantChartException{
    
}

