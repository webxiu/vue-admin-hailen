<template>
  <div ref="three" />
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'Three',
  mounted() {
    // 创建场景
    const scene = new THREE.Scene()
    // 视角, 横纵比, 近面距离, 远面距离
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      100,
      10000
    )
    // 创建一个渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true // 去锯齿
    })

    renderer.setSize(window.innerWidth, window.innerHeight) // 渲染区域大小
    this.$refs.three.appendChild(renderer.domElement) // 将创建好得 canvas 放页面上

    // 创建一个几何体
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    // 几何体使用什么材料
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // 把几何体和材料合起来
    const cube = new THREE.Mesh(geometry, material)
    cube.rotation.x = 0.3
    cube.rotation.y = 0.5
    // 把网格放到场景中
    scene.add(cube)

    // 给相机设置一个位置
    camera.position.z = 500
    renderer.render(scene, camera)

    animate()
    function animate() {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    console.log('scence', scene)
  }
}
</script>

<style></style>
