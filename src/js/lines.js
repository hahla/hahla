var THREE = require('three');
var $ = require('jQuery');
require('../css/hahla.scss');
require('ng-cache!../partials/lines.html');

var linesController = function($scope, $timeout, $templateCache) {
    var container;
    var camera, scene, raycaster, renderer, parentTransform, sphereInter;
    var mouse = new THREE.Vector2();
    var radius = 100, theta = 0;
    var currentIntersected;

    function init() {
        container = $('#linesbox');
        camera = new THREE.PerspectiveCamera(70,
                                             window.innerWidth / window.innerHeight,
                                             1,
                                             10000);
        scene = new THREE.Scene();

        var geometry = new THREE.SphereGeometry( 5 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

        sphereInter = new THREE.Mesh( geometry, material );
        sphereInter.visible = false;
        scene.add( sphereInter );

        var geometry = new THREE.Geometry();
        var point = new THREE.Vector3();
        var direction = new THREE.Vector3();

        for ( var i = 0; i < 100; i ++ ) {
            direction.x += Math.random() - 0.5;
            direction.y += Math.random() - 0.5;
            direction.z += Math.random() - 0.5;
            direction.normalize().multiplyScalar( 5 );

            point.add( direction );
            geometry.vertices.push( point.clone() );
        }

        parentTransform = new THREE.Object3D();
        parentTransform.position.x = Math.random() * 40 - 20;
        parentTransform.position.y = Math.random() * 40 - 20;
        parentTransform.position.z = Math.random() * 40 - 20;

        parentTransform.rotation.x = Math.random() * 2 * Math.PI;
        parentTransform.rotation.y = Math.random() * 2 * Math.PI;
        parentTransform.rotation.z = Math.random() * 2 * Math.PI;

        parentTransform.scale.x = Math.random() + 0.5;
        parentTransform.scale.y = Math.random() + 0.5;
        parentTransform.scale.z = Math.random() + 0.5;

        for ( var i = 0; i < 50; i ++ ) {
            var type = Math.random() > 0.5 ? THREE.LineStrip : THREE.LinePieces;
            var object = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } ), type );

            object.position.x = Math.random() * 400 - 200;
            object.position.y = Math.random() * 400 - 200;
            object.position.z = Math.random() * 400 - 200;

            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;

            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;

            parentTransform.add( object );

        }
        scene.add( parentTransform );

        raycaster = new THREE.Raycaster();
        raycaster.linePrecision = 3;

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( 0x000000 );
        renderer.setSize(container.width(), container.height());

        container.append(renderer.domElement);

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.width(), container.height());
    }

    function onDocumentMouseMove( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    function render() {
        theta += 0.1;
        camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
        camera.lookAt( scene.position );

        // find intersections
        var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );
        raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
        var intersects = raycaster.intersectObjects( parentTransform.children, true);
        if ( intersects.length > 0 ) {
            if ( currentIntersected !== undefined ) {
                currentIntersected.material.linewidth = 1;
            }
            currentIntersected = intersects[ 0 ].object;
            currentIntersected.material.linewidth = 5;
            sphereInter.visible = true;
            sphereInter.position.copy( intersects[ 0 ].point );
        } else {
            if ( currentIntersected !== undefined ) {
                currentIntersected.material.linewidth = 1;
            }
            currentIntersected = undefined;
            sphereInter.visible = false;
        }
        renderer.render( scene, camera );
    }
    // wait for the rendering of the directive to appear in the dom before loading it
    // alternatively could create the element as a child on linked element
    $timeout(init, 10);
    animate();

    function animate() {
        $timeout(function(){
            requestAnimationFrame( animate );
            render();
        }, 10);
    }
};

define(function(require) {
    return function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'lines.html',
            controller: linesController
        };
    };
});
