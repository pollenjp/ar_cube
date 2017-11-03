var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,                                         
});
renderer.setClearColor(new THREE.Color("black"), 0);   
renderer.setSize(640, 480);                            
renderer.domElement.style.position = "absolute";       
renderer.domElement.style.top = "0px";                 
renderer.domElement.style.left = "0px";                
document.body.appendChild(renderer.domElement);        
var camera = new THREE.Camera();                       
scene.add(camera);                                     
var light = new THREE.DirectionalLight(0xffffff);      
light.position.set(0, 0, 2);                           
scene.add(light);                                      




var source = new THREEx.ArToolkitSource({              
    sourceType: "webcam",                                
});
source.init(function onReady() {                       
    onResize();                                          
});



var context = new THREEx.ArToolkitContext({            
    debug: false,                                        
    cameraParametersUrl: "./data/camera_para.dat",              
    detectionMode: "mono",                               
    imageSmoothingEnabled: true,                         
    maxDetectionRate: 60,                                
    canvasWidth: source.parameters.sourceWidth,          
    canvasHeight: source.parameters.sourceHeight,        
});
context.init(function onCompleted(){                   
    camera.projectionMatrix.copy(context.getProjectionMatrix());    
});

 
 
 
window.addEventListener("resize", function() {         
    onResize();                                          
});
 
function onResize(){
    source.onResizeElement();                            
    source.copyElementSizeTo(renderer.domElement);       
    if(context.arController !== null){                   
        source.copyElementSizeTo(context.arController.canvas);   
    } 
}



var marker1 = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, marker1, {     
    type: "pattern",                                     
     
    patternUrl: "./patt/ut-virtual.patt",                             
});
scene.add(marker1);                                    
 
var geo = new THREE.CubeGeometry(1, 1, 1);             
var mat = new THREE.MeshNormalMaterial({               
    transparent: true,                                   
    opacity: 0.5,                                        
    side: THREE.DoubleSide,                              
});
var mesh1 = new THREE.Mesh(geo, mat);                  
mesh1.name = "cube";                                   
mesh1.position.set(0, 0.5, 0);                         
marker1.add(mesh1);                                    




function renderScene() {                               
    requestAnimationFrame(renderScene);                  
    if(source.ready === false)    { return; }              
    context.update(source.domElement);                   
    TWEEN.update();                                      
    renderer.render(scene, camera);                      
}
renderScene();                                         

