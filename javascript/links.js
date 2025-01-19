var scene = new THREE.Scene(); //Three.js background
        var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('threeBG')});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        
        var light = new THREE.PointLight(0xffffff);
        light.position.set(-100,200,100);
        scene.add(light); 
        
        var light2 = new THREE.PointLight(0xffffdd);
        light2.position.set(100,-2000,-100);
        scene.add(light2); 
        
        var geometry = new THREE.BoxGeometry( 4,4,4 );
        var material = new THREE.MeshLambertMaterial({color:0x009900}); 
        var cube = new THREE.Mesh( geometry, material );    
        scene.add( cube );
        
        cube.position.z = -30;
        
        var render = function () {
            requestAnimationFrame(render);
        
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        
            // Camera smoothing
            var distFromTargetX = targetX - camera.rotation.x;
            var distFromTargetY = targetY - camera.rotation.y;
        
            motionRateX = motionRateX * 0.7 + distFromTargetX * 0.003; // damping
            motionRateY = motionRateY * 0.7 + distFromTargetY * 0.003; // damping
        
            camera.rotation.x += motionRateX;
            camera.rotation.y += motionRateY;
        
            renderer.render(scene, camera);
        };
        
        //Mouse movement 
        var mouseTolerance = 0.0003;
        var targetX = 0;
        var targetY = 0;
        var motionRateX = 0;
        var motionRateY = 0;
        
        document.onmousemove = function (e) {
            var centerX = window.innerWidth * 0.5;
            var centerY = window.innerHeight * 0.5;
        
            targetY = -(e.clientX - centerX) * mouseTolerance;
            targetX = -(e.clientY - centerY) * mouseTolerance;
        };
        
        render();
