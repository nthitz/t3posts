import React from 'react'

var THREE = require('threejs')

import ThreePost from '../components/ThreePost.jsx'

export default class HelloWorldScene extends React.Component {
  constructor(props) {
    super(props)

    this.sceneObjects = []

    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)
  }
  componentDidMount() {
    this.refs.scene.init()
  }
  init() {
    var sphereMaterial = new THREE.MeshNormalMaterial({
      wireframe: true
    });

    this.sceneObjects.sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(100, 2),
      sphereMaterial
    );

    this.refs.scene.scene.add(this.sceneObjects.sphere);


  }

  animate() {
    this.sceneObjects.sphere.rotation.x += 0.01 * this.props.spinSpeedX;
    this.sceneObjects.sphere.rotation.y += 0.01 * this.props.spinSpeedY;
  }
  render() {
    return <div>
      <ThreePost ref="scene" init={this.init} animate={this.animate} {...this.props} title="Hello World" />
    </div>
  }
}
HelloWorldScene.propTypes = {
  spinSpeedX: React.PropTypes.number,
  spinSpeedY: React.PropTypes.number
}
HelloWorldScene.defaultProps = {
  spinSpeedX: 1,
  spinSpeedY: 1
};