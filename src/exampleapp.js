// // import React, { useState, useCallback, useEffect } from 'react';
// // import * as THREE from 'three';
// // import { Canvas } from '@react-three/fiber';
// // import { OrbitControls } from '@react-three/drei';

// // function DrawingCanvas() {
// //   const [points, setPoints] = useState([]);

// //   const handleMouseMove = useCallback((event) => {
// //     const x = event.clientX;
// //     const y = event.clientY;
// //     setPoints((points) => [...points, { x, y }]);
// //   }, []);

// //   useEffect(() => {
// //     const canvas = document.querySelector('canvas');
// //     const ctx = canvas.getContext('2d');
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     ctx.beginPath();
// //     points.forEach(({ x, y }, i) => {
// //       if (i === 0) {
// //         ctx.moveTo(x, y);
// //       } else {
// //         ctx.lineTo(x, y);
// //       }
// //     });
// //     ctx.stroke();
// //   }, [points]);

// //   return (
// //     <Canvas onMouseMove={handleMouseMove}>
// //       <OrbitControls />
// //       <mesh>
// //         <lineSegments>
// //           <bufferGeometry>
// //             <bufferAttribute
// //               attachObject={['attributes', 'position']}
// //               count={points.length}
// //               array={new Float32Array(points.flatMap((p) => [p.x, p.y, 0]))}
// //               itemSize={3}
// //             />
// //           </bufferGeometry>
// //           <lineBasicMaterial color="white" />
// //         </lineSegments>
// //       </mesh>
// //       <mesh position={[2, 0, 0]}>
// //         <boxBufferGeometry args={[1, 1, 1]} />
// //         <meshStandardMaterial color="lightblue" />
// //       </mesh>
// //       <mesh position={[0, 2, 0]}>
// //         <planeBufferGeometry args={[2, 2]} />
// //         <meshStandardMaterial color="hotpink" />
// //       </mesh>
// //       <mesh position={[-2, 0, 0]}>
// //         <geometry vertices={[new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0), new THREE.Vector3(0, -1, 0)]} faces={[new THREE.Vector3(0, 1, 2)]} />
// //         <meshStandardMaterial color="yellow" />
// //       </mesh>
// //       <mesh position={[0, -2, 0]}>
// //         <geometry vertices={points.map((p) => new THREE.Vector3(p.x, p.y, 0))} />
// //         <meshStandardMaterial color="green" />
// //       </mesh>
// //     </Canvas>
// //   );
// // }

// // function VertexList({ points }) {
// //   return (
// //     <div>
// //       <h2>Vertices:</h2>
// //       <ul>
// //         {points.map(({ x, y }, i) => (
// //           <li key={i}>
// //             {i + 1}. ({x}, {y})
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // function App() {
// //   const [points, setPoints] = useState([]);

// //   return (
// //     <div>
// //       <DrawingCanvas />
// //       <VertexList points={points} />
// //     </div>
// //   );
// // }

// // export default App;


// // import React, { useRef, useState } from 'react';
// // import { Canvas } from 'react-three-fiber';
// // import { Line, Mesh, Vector3, CatmullRomCurve3 } from 'three';
// // import { OrbitControls, PerspectiveCamera  } from '@react-three/drei';

// // function App() {
// //   const [points, setPoints] = useState([]);
// //   const [currentShape, setCurrentShape] = useState(null);
// //   const [shapes, setShapes] = useState([]);

// //   const canvasRef = useRef();
// //   const meshRef = useRef();

// //   const handlePointerDown = (event) => {
// //     const { x, y } = event.point;
// //     const newPoint = new Vector3(x, y, 0);

// //     if (!currentShape) {
// //       setCurrentShape([newPoint]);
// //       setPoints([newPoint]);
// //     } else {
// //       setCurrentShape([...currentShape, newPoint]);
// //       setPoints([...points, newPoint]);
// //     }
// //   };

// //   const handlePointerUp = () => {
// //     if (currentShape) {
// //       if (currentShape.length > 1) {
// //         if (currentShape.length === 2) {
// //           setShapes([...shapes, <Line points={currentShape} key={shapes.length} />]);
// //         } else {
// //           const curve = new CatmullRomCurve3(currentShape);
// //           const points = curve.getPoints(50);
// //           setShapes([
// //             ...shapes,
// //             <PerspectiveCamera curve={curve} key={shapes.length}>
// //               <Mesh ref={meshRef}>
// //                 <geometry attach="geometry" vertices={points} />
// //                 <lineBasicMaterial attach="material" color="#000" />
// //               </Mesh>
// //             </PerspectiveCamera >,
// //           ]);
// //         }
// //       }

// //       setCurrentShape(null);
// //       setPoints([]);
// //     }
// //   };

// //   return (
// //     <div style={{ width: '100vw', height: '100vh' }}>
// //       <Canvas
// //         ref={canvasRef}
// //         onPointerDown={handlePointerDown}
// //         onPointerUp={handlePointerUp}
// //         camera={{ position: [0, 0, 50], fov: 70 }}
// //         resize={{ scroll: false }}
// //         style={{ background: '#fff' }}
// //         gl={{ alpha: false }}
// //         colorManagement={true}
// //         concurrent
// //         dpr={[1, 2]}>
// //         {shapes}
// //         {currentShape && <Line points={currentShape} />}
// //         <OrbitControls />
// //       </Canvas>
// //     </div>
// //   );
// // }

// // export default App;



// // import React, { useRef, useState, useEffect } from 'react';
// // import { Canvas } from 'react-three-fiber';
// // import { Line, Mesh, Vector3, CatmullRomCurve3, Shape } from 'three';
// // import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// // function App() {
// //   const [points, setPoints] = useState([]);
// //   const [currentShape, setCurrentShape] = useState(null);
// //   const [shapes, setShapes] = useState([]);
// //   const [shape3D, setShape3D] = useState(null);
// //   const [vertices, setVertices] = useState([]);

// //   const canvasRef = useRef();
// //   const meshRef = useRef();

// //   const handlePointerDown = (event) => {
// //     const { x, y } = event.point;
// //     const newPoint = new Vector3(x, y, 0);

// //     if (!currentShape) {
// //       setCurrentShape([newPoint]);
// //       setPoints([newPoint]);
// //     } else {
// //       setCurrentShape([...currentShape, newPoint]);
// //       setPoints([...points, newPoint]);
// //     }
// //   };

// //   const handlePointerUp = () => {
// //     if (currentShape) {
// //       if (currentShape.length > 1) {
// //         if (currentShape.length === 2) {
// //           setShapes([...shapes, <Line points={currentShape} key={shapes.length} />]);
// //         } else {
// //           const curve = new CatmullRomCurve3(currentShape);
// //           const points = curve.getPoints(50);
// //           const shape = new Shape(currentShape);
// //           setShape3D(
// //             <mesh position={[0, 0, -5]}>
// //               <extrudeGeometry args={[shape, { depth: 10 }]} attach="geometry" />
// //               <meshStandardMaterial attach="material" color="#555" />
// //             </mesh>
// //           );
// //           setShapes([
// //             ...shapes,
// //             <PerspectiveCamera curve={curve} key={shapes.length}>
// //               <Mesh ref={meshRef}>
// //                 <geometry attach="geometry" vertices={points} />
// //                 <lineBasicMaterial attach="material" color="#000" />
// //               </Mesh>
// //             </PerspectiveCamera>,
// //           ]);
// //           setVertices(currentShape.map((point) => `(${point.x}, ${point.y})`));
// //         }
// //       }

// //       setCurrentShape(null);
// //       setPoints([]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (shape3D) {
// //       canvasRef.current.scene.children = [shape3D];
// //     }
// //   }, [shape3D]);

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'row' }}>
// //       <div style={{ width: '50vw', height: '100vh' }}>
// //         <Canvas
// //           onPointerDown={handlePointerDown}
// //           onPointerUp={handlePointerUp}
// //           style={{ background: 'red' }}>
// //           {shapes}
// //           {currentShape && <Line points={currentShape} />}
// //           <OrbitControls />
// //         </Canvas>
// //         <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
// // <h3>Vertices:</h3>
// // <ul>
// // {vertices.map((vertex, index) => (
// // <li key={index}>{vertex}</li>
// // ))}
// // </ul>
// // </div>
// // </div>
// // <div style={{ width: '1000px', height: '1000px', position: 'relative' }}>
// // <Canvas

// // >
// // <OrbitControls />
// // {shape3D}
// // </Canvas>
// // </div>
// // </div>
// // );
// // }

// // export default App;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { Canvas } from '@react-three/fiber';
// // import { OrbitControls, Dotted } from '@react-three/drei';
// // import * as THREE from 'three';

// // function App() {
// //   const [vertices, setVertices] = useState([]);
// //   const [shapes, setShapes] = useState([]);
// //   const [currentShape, setCurrentShape] = useState([]);
// //   const shapeRef = useRef(null);

// //   const handlePointerDown = (event) => {
// //     const point = new THREE.Vector3(
// //       event.point.x,
// //       event.point.y,
// //       0
// //     );
// //     setCurrentShape((prev) => [...prev, point]);
// //   };

// //   const handlePointerUp = () => {
// //     if (currentShape.length > 1) {
// //       setShapes((prev) => [        ...prev,        currentShape.map((vertex) => [vertex.x, vertex.y])
// //       ]);
// //       setCurrentShape([]);
// //     }
// //   };

// //   useEffect(() => {
// //     const shape2D = new THREE.Shape();
// //     shape2D.moveTo(vertices[0]?.x || 0, vertices[0]?.y || 0);
// //     vertices.slice(1).forEach((vertex) => {
// //       shape2D.lineTo(vertex.x, vertex.y);
// //     });
// //     if (vertices.length > 1) {
// //       shape2D.lineTo(vertices[0].x, vertices[0].y);
// //     }
// //     const extrudeSettings = { depth: 5, bevelEnabled: false };
// //     const shape3D = new THREE.ExtrudeGeometry(shape2D, extrudeSettings);
// //     shapeRef.current.geometry = shape3D;
// //   }, [vertices]);

// //   const shape3D = (
// //     <mesh position={[0, 0, -2]}>
// //       <extrudeGeometry ref={shapeRef} />
// //       <meshStandardMaterial color="#222" />
// //     </mesh>
// //   );

// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <div style={{ width: '50vw', height: '100vh', padding: '2rem' }}>
// //         <h3>Canvas:</h3>
// //         <Canvas
// //           camera={{ position: [0, 0, 50], fov: 70 }}
// //           resize={{ scroll: false }}
// //           style={{ background: '#fff' }}
// //           gl={{ alpha: false }}
// //           colorManagement={false}
// //           concurrent
// //           dpr={[1, 2]}
// //           onMouseDown={handlePointerDown}
// //           onMouseUp={handlePointerUp}
// //         >
// //           {shapes.map((shape) => (
// //             <Dotted
// //               points={shape.map((vertex) => new THREE.Vector3(vertex[0], vertex[1], 0))}
// //               dashed={false}
// //               gapSize={0.1}
// //               dashSize={0.1}
// //               key={JSON.stringify(shape)}
// //             />
// //           ))}
// //           {currentShape.length > 1 && (
// //             <Dotted
// //               points={currentShape.map((vertex) => new THREE.Vector3(vertex.x, vertex.y, 0))}
// //               dashed={false}
// //               gapSize={0.1}
// //               dashSize={0.1}
// //             />
// //           )}
// //           <OrbitControls />
// //         </Canvas>
// //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //           <h3>Vertices:</h3>
// //           <ul>
// //             {vertices.map((vertex, index) => (
// //               <li key={index}>{vertex.x}, {vertex.y}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //       <div style={{ width: '50vw', height:'100vh', padding: '2rem' }}>
// //         <h3>3D preview:</h3>
// //         <Canvas
// //           camera={{ position: [0, 0, 20], fov: 70 }}
// //           resize={{ scroll: false }}
// //           style={{ background: '#fff' }}
// //           gl={{ alpha: false }}
// //           colorManagement={false}
// //           concurrent
// //           dpr={[1, 2]}
// //         >
// //           {shape3D}
// //           <OrbitControls />
// //         </Canvas>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// function App() {
//   const [points, setPoints] = useState([]);
//   const [shape, setShape] = useState([]);
//   const [shape3D, setShape3D] = useState([]);
//   const [vertices, setVertices] = useState([]);

//   const canvasRef = useRef(null);
//   const planeRef = useRef();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.addEventListener("mousedown", handleMouseDown);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//     };
//   }, [shape]);

//   useEffect(() => {
//     if (shape.length) {
//       const shapePoints = shape.map((point) => [point.x, point.y, 0]);
//       const shapeVertices = shapePoints.flat();
//       const shapeGeometry = new THREE.BufferGeometry();
//       shapeGeometry.setAttribute(
//         "position",
//         new THREE.Float32BufferAttribute(shapeVertices, 3)
//       );
//       const shapeMaterial = new THREE.LineBasicMaterial({
//         color: "#000",
//         linewidth: 2
//       });
//       const shapeObject = new THREE.LineLoop(shapeGeometry, shapeMaterial);

//       const shapePoints3D = shapePoints.map(
//         (point) => new THREE.Vector3(point[0], point[1], point[2])
//       );
//       const shapeGeometry3D = new THREE.ExtrudeGeometry(
//         new THREE.Shape(shapeObject.geometry),
//         { depth: 5, bevelEnabled: false }
//       );
//       const shapeMaterial3D = new THREE.MeshBasicMaterial({ color: "#ddd" });
//       const shapeObject3D = new THREE.Mesh(shapeGeometry3D, shapeMaterial3D);
//       shapeObject3D.position.set(0, 0, -2.5);
//       setShape3D(shapeObject3D);

//       setVertices(shapePoints);
//     } else {
//       setShape3D([]);
//       setVertices([]);
//     }
//   }, [shape]);

//   function handleMouseDown(event) {
//     event.preventDefault();
//     const { clientX, clientY } = event;
//     setShape((prevShape) => [ ...prevShape,{ x: clientX, y: clientY }]);
//   }
//   // const handleMouseDown = (event) => {
//   //   const mouse = new THREE.Vector2();
//   //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   //   const raycaster = new THREE.Raycaster(mouse, camera);
//   //   raycaster.setFromCamera(mouse, camera);
//   //   const intersects = raycaster.intersectObjects(planeRef.current);
//   //   if (intersects.length > 0) {
//   //   const newVertex = intersects[0].point;
//   //   setVertices((prevVertices) => [...prevVertices, newVertex]);
//   //   }
//   //   };
//   // function handleMouseMove(event) {
//   //   event.preventDefault();
//   //   const { clientX, clientY } = event;
    
//   //   if (shape.length) {
//   //     const newShape = [...shape];
//   //     newShape[newShape.length - 1] = { x: clientX, y: clientY };
//   //     setShape(newShape);
//   //   }
//   // }
//   // const handleMouseMove = (event) => {
//   //   if (vertices.length > 0) {
//   //     const mouse = new THREE.Vector2();
//   //     const camera =  THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);;
//   //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   //     const raycaster = new THREE.Raycaster(mouse, camera);
//   //   raycaster.setFromCamera(mouse, camera);
//   //   const intersects = raycaster.intersectObjects(planeRef.current);
//   //   if (intersects.length > 0) {
//   //   const updatedVertices = [...vertices];
//   //   updatedVertices[updatedVertices.length - 1] = intersects[0].point;
//   //   setVertices(updatedVertices);
//   //   }
//   //   }
//   //   };
//   const handleMouseMove = useCallback((event) => {
//     const x = event?.clientX;
//     const y = event?.clientY;
//     setPoints((points) => [...points, { x, y }]);
//   }, []);

//   function handleMouseUp(event) {
//     event.preventDefault();
//     if (shape.length > 2) {
//       const newShape = [...shape];
//       newShape[newShape.length - 1] = newShape[0];
//       setShape(newShape);
//     }
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         padding: "2rem"
//       }}
//     >
//       <div style={{ marginRight: "2rem" }}>
//         <h3>2D view:</h3>
//         <canvas
//           ref={canvasRef}
//           width={600}
//           height={400}
//           style={{ border: "1px solid #ccc" }}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         />
//         <ul>
//           {vertices.map((vertex, index) => (
//             <li key={index}>
//               ({vertex[0]}, {vertex[1]})
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div
//        style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "1000px",
//         width:"1000px",
//         padding: "2rem"
//       }}
//       >
//         <div style={{ marginRight: "3rem",marginTop:"5rem", border: "1px solid #ccc" }}>

        
//         <h3>3D view:</h3>
//         <Canvas>
//           <ambientLight />
//           <pointLight position={[10, 10, 10]} />
//           <OrbitControls />
//           <mesh>
//             <shapeBufferGeometry attach="geometry" args={[shape3D]}>
//               <extrudeBufferGeometry
//                 attach="geometry"
//                 args={[shape3D.geometry]}
//               />
//             </shapeBufferGeometry>
//             <meshBasicMaterial attach="material" color="#ddd" />
//           </mesh>
//         </Canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;