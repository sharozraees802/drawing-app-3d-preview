// import React, { useRef, useState } from 'react';
// import { Canvas } from 'react-three-fiber';
// import { OrbitControls, Plane } from 'drei';

// const DrawingCanvas = () => {
//   const [vertices, setVertices] = useState([]);
//   const [selectedShape, setSelectedShape] = useState('');
//   const [selectedColor, setSelectedColor] = useState('#000000');
//   const [selectedThickness, setSelectedThickness] = useState(1);

//   const planeRef = useRef();
// //   const { plane } = usePlane(() => ({ ref: planeRef }));

//   const shapes = [
//     {
//       type: 'line',
//       render: (vertices) => (
//         <line>
//           <geometry attach="geometry" vertices={vertices} />
//           <lineBasicMaterial attach="material" color={selectedColor} linewidth={selectedThickness} />
//         </line>
//       ),
//     },
//     {
//       type: 'rectangle',
//       render: (vertices) => (
//         <mesh>
//           <geometry attach="geometry" vertices={vertices} />
//           <meshBasicMaterial attach="material" color={selectedColor} wireframe />
//         </mesh>
//       ),
//     },
//     {
//       type: 'triangle',
//       render: (vertices) => (
//         <mesh>
//           <geometry attach="geometry" vertices={vertices} />
//           <meshBasicMaterial attach="material" color={selectedColor} wireframe />
//         </mesh>
//       ),
//     },
//     {
//       type: 'curve',
//       render: (vertices) => (
//         <line>
//           <catmullRomCurve3 attach="geometry" points={vertices} />
//           <lineBasicMaterial attach="material" color={selectedColor} linewidth={selectedThickness} />
//         </line>
//       ),
//     },
//   ];

//   const getShapeRender = (type) => {
//     const shape = shapes.find((shape) => shape.type === type);
//     return shape && shape.render;
//   };

//   const handleCanvasClick = (event) => {
//     const rect = event.target.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//     const newVertices = [...vertices, { x, y, z: 0 }];
//     setVertices(newVertices);
//   };

//   const handleShapeSelect = (event) => {
//     setSelectedShape(event.target.value);
//     setVertices([]);
//   };

//   const handleColorSelect = (event) => {
//     setSelectedColor(event.target.value);
// }

// const handleThicknessSelect = (event) => {
//     setSelectedThickness(parseInt(event.target.value));
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="shape-select">Shape:</label>
//         <select id="shape-select" value={selectedShape} onChange={handleShapeSelect}>
//           <option value="">Select a shape</option>
//           <option value="line">Line</option>
//           <option value="rectangle">Rectangle</option>
//           <option value="triangle">Triangle</option>
//           <option value="curve">Curve</option>
//         </select>
//         <label htmlFor="color-select">Color:</label>
//         <select id="color-select" value={selectedColor} onChange={handleColorSelect}>
//           <option value="#000000">Black</option>
//           <option value="#ff0000">Red</option>
//           <option value="#00ff00">Green</option>
//           <option value="#0000ff">Blue</option>
//         </select>
//         <label htmlFor="thickness-select">Thickness:</label>
//         <select id="thickness-select" value={selectedThickness} onChange={handleThicknessSelect}>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>
//       </div>
//       <div style={{ display: 'flex' }}>
//         <div>
//           <svg width="400" height="400" style={{ border: '1px solid black' }}>
//             {vertices.map((vertex, index) => (
//               <circle key={index} cx={vertex.x} cy={vertex.y} r="5" fill="black" />
//             ))}
//             {getShapeRender(selectedShape) && getShapeRender(selectedShape)(vertices)}
//           </svg>
//           <div>
//             <h2>Vertices:</h2>
//             <ul>
//               {vertices.map((vertex, index) => (
//                 <li key={index}>
//                   x: {vertex.x.toFixed(2)}, y: {vertex.y.toFixed(2)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <Canvas>
//           <OrbitControls />
//           <ambientLight />
//           <pointLight position={[10, 10, 10]} />
//           <Plane ref={planeRef} args={[50, 50]} />
//           {getShapeRender(selectedShape) && getShapeRender(selectedShape)(vertices)}
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// export default DrawingCanvas;
























// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls, Plane, Text } from '@react-three/drei'

// const DrawingApp = () => {
//   const [vertices, setVertices] = useState([])
//   const [lines, setLines] = useState([])
//   const [shapes, setShapes] = useState([])
//   const [activeShape, setActiveShape] = useState(null)
//   const canvasRef = useRef()

//   const addVertex = (event) => {
//     const canvas = canvasRef.current
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     const vertex = {
//       x: (x / canvas.width) * 2 - 1,
//       y: -(y / canvas.height) * 2 + 1
//     }
//     setVertices([...vertices, vertex])
//   }

//   const addLine = () => {
//     setLines([...lines, [...vertices]])
//     setVertices([])
//   }

//   const addShape = () => {
//     setShapes([...shapes, [...lines]])
//     setLines([])
//   }

//   const deleteShape = (index) => {
//     const newShapes = [...shapes]
//     newShapes.splice(index, 1)
//     setShapes(newShapes)
//   }

//   const getShapeGeometry = (lines) => {
//     const points = []
//     lines.forEach((line) => {
//       line.forEach((vertex) => {
//         points.push(vertex.x, vertex.y, 0)
//       })
//     })
//     return { points }
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ flex: 1 }}>
//         <canvas
//           ref={canvasRef}
//           width={500}
//           height={500}
//           style={{ border: '1px solid black' }}
//           onMouseDown={addVertex}
//           onDoubleClick={addLine}>
//           {vertices.map((vertex, index) => (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 left: vertex.x * 250 + 250,
//                 top: vertex.y * -250 + 250,
//                 width: 5,
//                 height: 5,
//                 borderRadius: '50%',
//                 backgroundColor: 'black'
//               }}
//             />
//           ))}
//           {lines.map((line, index) => (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 left: ((line[0].x + line[1].x) / 2) * 250 + 250,
//                 top: ((line[0].y + line[1].y) / -2) * 250 + 250,
//                 width: Math.sqrt((line[0].x - line[1].x) ** 2 + (line[0].y - line[1].y) ** 2) * 250,
//                 height: 1,
//                 transform: `rotate(${Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x)}rad)`,
//                 backgroundColor: 'black'
//               }}
//             />
//           ))}
//         </canvas>
//         <button onClick={addLine}>Add Line</button>
//         <button onClick={addShape}>Add Shape</button>
//         <div>
//           {shapes.map((shape, index) => (
//             <div key={index}>
//               <button onClick={() => setActiveShape(index)}>Edit</button>
//               <button onClick={() => deleteShape(index)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ flex: 1 }}>
//         {activeShape !== null && (
//           <Canvas>
//             <OrbitControls />
//             {shapes[activeShape].map((line, index) => (
//               <line key={index} position={[0, 0, 0]} geometry={getShapeGeometry([line])}>
//                 <lineBasicMaterial color="black" />
//               </line>
//             ))}
//             <Plane position={[0, 0, -0.1]} rotation={[-Math.PI / 2, 0, 0]} args={[1, 1]}>
//               <meshBasicMaterial color="white" />
//             </Plane>
//             <Text position={[0, 0, 0.05]} fontSize={0.1} color="black">
//               3D Preview
//             </Text>
//           </Canvas>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DrawingApp



























