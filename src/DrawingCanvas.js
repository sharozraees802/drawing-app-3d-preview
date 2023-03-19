import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Plane, Text } from '@react-three/drei'

const DrawingApp = () => {
  const [vertices, setVertices] = useState([])
  const [lines, setLines] = useState([])
  const [shapes, setShapes] = useState([])
  const [activeShape, setActiveShape] = useState(null)
  const canvasRef = useRef(null)

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setVertices([...vertices, { x, y }])
  }

  const handlePointerMove = (event) => {
    if (vertices.length === 0) {
      return
    }
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newLines = [...lines]
    newLines[newLines.length - 1] = { ...newLines[newLines.length - 1], end: { x, y } }
    setLines(newLines)
  }

  const handlePointerUp = () => {
    if (vertices.length < 2) {
      setVertices([])
      setLines([])
      return
    }
    setLines([...lines, { start: vertices[vertices.length - 2], end: vertices[vertices.length - 1] }])
  }

  const handleDoubleClick = () => {
    if (vertices.length < 3) {
      setVertices([])
      setLines([])
      return
    }
    setShapes([...shapes, lines])
    setVertices([])
    setLines([])
  }

  const handleAddShape = () => {
    if (lines.length > 0) {
      setShapes([...shapes, lines])
      setVertices([])
      setLines([])
    }
  }

  const handleEditShape = (index) => {
    setActiveShape(index)
  }

  const handleDeleteShape = (index) => {
    const newShapes = [...shapes]
    newShapes.splice(index, 1)
    setShapes(newShapes)
    setActiveShape(null)
  }

  const getShapeGeometry = (lines) => {
    console.log("🚀 ~ file: DrawingCanvas.js:382 ~ getShapeGeometry ~ lines:", lines)
    const points = []
    lines.forEach((line) => {
      points.push(line.start.x, line.start.y, 0)
      points.push(line.end.x, line.end.y, 0)
    })
    return <bufferGeometry attach="geometry" attributes={{ position: new Float32Array(points) }} />
  }

  return (
    <div className="drawing-app">
      <div style={{ flex: 2 }}>
        <h1>shape draw</h1>
        <canvas
          style={{border: '1px solid black', width: '500px', height: '300px'}}
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClick}

          >

        <svg>
        {vertices.length > 0 && (

          <line
          className="current-line"
          x1={vertices[vertices.length - 1].x}
          y1={vertices[vertices.length - 1].y}
          x2={vertices[vertices.length - 1].x}
          y2={vertices[vertices.length - 1].y}
          stroke="black"
          />
          )}
          </svg>
          <svg >

        {lines.map((line, index) => (
          
          <line key={index} x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y} stroke="black" />
          ))}
          </svg>
          </canvas>
        {shapes.map((shape, index) => (
          <div style={{border: '1px solid black', width: '500px', height: '300px'}}>
            <h1>mesh draw</h1>
            <svg>

          <mesh
          
          key={index}
          geometry={getShapeGeometry(shape)}
          onClick={() => handleEditShape(index)}
          onPointerOver={() => (canvasRef.current.style.cursor = 'pointer')}
          onPointerOut={() => (canvasRef.current.style.cursor = 'auto')}
          position={[0, 0, index]}
          material={activeShape === index ? <meshBasicMaterial color="yellow" /> : <meshBasicMaterial color="blue" />}
          />
          </svg>
          </div>
            ))}
        <Canvas style={{height:"300px",width:"500px", border: '1px solid black'}}>

        <OrbitControls />
        {/* <Plane args={[window.innerWidth, window.innerHeight]} position={[0, 0, -1]}> */}
        <Plane position={[0, 0, -0.1]} rotation={[-Math.PI / 2, 0, 0]} args={[1, 1]}>
          <meshBasicMaterial color="red" />
        </Plane>
          <Text position={[0, 0, 0.05]} fontSize={0.1} color="black">
               3D Preview
        </Text>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>
      <div className="vertices">
        <h2>Vertices</h2>
        <ul>
          {vertices.map((vertex, index) => (
            <li key={index}>
              x: {vertex.x}, y: {vertex.y}
            </li>
          ))}
        </ul>
      </div>
      <div className="shapes">
        <h2>Shapes</h2>
        
        <ul>
          {shapes.map((shape, index) => (
            <li key={index}>
              <ul>
              <button style={{display:"block"}} onClick={() => handleEditShape(index)}>Edit</button>
              <button onClick={() => handleDeleteShape(index)}>Delete</button>
                {shape.map((line, index) => (
                  
                  <li key={index}>
                    start: x: {line.start.x}, y: {line.start.y} - end: x: {line.end.x}, y: {line.end.y}
                    
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button onClick={handleAddShape}>Add Shape</button>
      </div>
    </div>
  )
}

export default DrawingApp