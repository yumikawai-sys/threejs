// page loading
window.addEventListener("load", init);

function init() {
  // specify the size of the earth
  const width = 960;
  const height = 500;
  let rot = 0;

  // create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0x00008B));

  // create a scene
  const scene = new THREE.Scene();

  // create a camera
  const camera = new THREE.PerspectiveCamera(45, width / height);
  //   camera.position.z = 2000;

  // create a ball
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // create a material
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("images/water.jpg"),
    side: THREE.DoubleSide,
  });
  // create an Earth mesh
  const earth = new THREE.Mesh(geometry, material);
  // add the mesh to 3D
  scene.add(earth);

  // light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.9);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // point light
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  // scene.add(pointLightHelper);

  // /* star dust */
  //createStarField();

  // /* star dust */
  // function createStarField() {
    
  //   const vertices = [];
  //   for (let i = 0; i < 500; i++) {
  //     const x = 3000 * (Math.random() - 0.5);
  //     const y = 3000 * (Math.random() - 0.5);
  //     const z = 3000 * (Math.random() - 0.5);

  //     vertices.push(x, y, z);
  //   }

    
  //   const geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute(
  //     "position",
  //     new THREE.Float32BufferAttribute(vertices, 3)
  //   );

    
  //   const material = new THREE.PointsMaterial({
  //     size: 8,
  //     color: 0xffffff,
  //   });

    
  //   const stars = new THREE.Points(geometry, material);
  //   scene.add(stars);
  // }

  /* when mouse is moved */
  document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
  });

  // loop event (each frame)
  function tick() {
    //rot += 0.5; /* degree */

    const radian = (rot * Math.PI) / 180; 

    /* change the camera position */
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 2000 * Math.cos(radian);

    /* original point */
    camera.lookAt(new THREE.Vector3(0, 0, -400));

    // rotate the light
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );

    // rendering
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
  window.addEventListener("resize", onWindowResize);

  /* keep the size */
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x00008B));
  }
}
