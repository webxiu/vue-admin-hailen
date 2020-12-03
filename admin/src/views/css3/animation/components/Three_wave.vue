<template>
  <div ref="three"></div>
</template>

<script>
import * as THREE from "three";
import { Camera } from "three";
export default {
  name: "Three",

  mounted() {
    let scene, camera, renderer;
    let countX = 100,
      countY = 100,
      space = 120;

    let w = window.innerWidth,
      h = window.innerHeight;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, w / h, 100, 10000);
      camera.position.z = 1000;
      let nums = countX * countY; // 一共有多少点数
      let positions = new Float32Array(nums * 3); //记录每一个点的位置
      let scales = new Float32Array(nums); //记录每个店得缩放

      let i = 0,
        j = 0;
      for (let x = 0; x < countX; x++) {
        for (let y = 0; y < countY; y++) {
          positions[i] = x * space - (countY * space) / 2;
          positions[i + 1] = 100;
          positions[i + 2] = y * space - (countY * space) / 2;
          // 因为每个点都有3个坐标(x,y,z) 所以 positions 中的个数是点个数的3倍: 数组中每三个值是一个点的坐标
          scales[j] = 30;
          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { vlue: new THREE.Color(0x00ff00), type: "c" }
        },
        vertexShader: "",
        fragmentShader: ""
      });

      points = new THREE.Pionts(geometry, material);
      scene.add(points);

      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(w, h);
      this.$refs.three.appendChild(renderer.domElement);
      renderer.render(scene, camera);
    }

    init();

    // function animate() {
    //   requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // }

    console.log("scence", scene);
  }
};
</script>

<style></style>
