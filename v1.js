// -- For now all the comma and semi-colon erros are ignored till the file is compiled


// This section imports all necessary files and libs


import { slider } from "@jashkenas/inputs"

import { colorPicker } from "@shaunlebron/color-picker"

topojson = require("topojson-client@3")


// Original code import it in module 
/*THREE = {
  const THREE = window.THREE = await require('three@0.121.0');
  await require('three/examples/js/controls/OrbitControls.js').catch(() => {});
  await require("three/examples/js/postprocessing/EffectComposer.js").catch(() => {});
  await require("three/examples/js/postprocessing/UnrealBloomPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/GlitchPass.js").catch(() => {});
  await require("three/examples/js/shaders/DigitalGlitch.js").catch(() => {});
  await require("three/examples/js/postprocessing/ShaderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/RenderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/EffectComposer.js").catch(() => {});
  await require("three/examples/js/postprocessing/ShaderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/SSAARenderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/UnrealBloomPass.js").catch(() => {});
  await require("three/examples/js/shaders/LuminosityHighPassShader.js").catch(() => {});
  await require("three/examples/js/shaders/CopyShader.js").catch(() => {});
  await require("three/examples/js/shaders/SobelOperatorShader.js").catch(() => {});
  return THREE;
}/*/
import * as THREE from 'three'; // this line is used instead to completely import three.js
d3 = require('https://d3js.org/d3.v5.min.js', "d3-geo@1", "d3-geo-projection@2")

_ = require("lodash")

colorScale = d3.scaleSequential(d3.interpolateInferno).domain([-3, 3])
THREE.REVISION
// import section ends

//Created wireframe for the landmass.
function wireframe(multilinestring, radius, material) {
    const geometry = new THREE.Geometry();

    for (const P of multilinestring.coordinates) {
        for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
            geometry.vertices.push(p0 = p1, p1 = vertex(P[i], radius));
        }
    }
    return new THREE.LineSegments(geometry, material);
}

tempAnomalyYearlyRaw = await FileAttachment("gst_ann_1891_last.txt").text();  // Yaha data file hain

// Following codee reads data and trims the part useful
tempsAnomalyYearly = {
    let years =[],
    let year =[],
    let date,
    tempAnomalyYearlyRaw.split('\n').forEach((row, i) => {
        const isNewYear = i % 37 === 0;
        if (isNewYear && year.length > 0) {
            years.push([...year]);
            year = [];
            date = +row.split('  ')[1];
        } else {
            const lat = ((i % 37) - 19) * -5;
            row.trim().split(/[ ,]+/).forEach((col, j) => {
                const lon = (j * 5) <= 180 ? (j * 5) : (j * 5) - 360;
                year.push({
                    date,
                    lat,
                    lon,
                    value: col === "-9999.00" ? null : +col,
                })
            })
        }
    })
    return years;
}


// following code decides the extent of plot for an anamoly in a certain year
yearlyAttributes = {
    const latSegmentCount = 180 / degreeSegment;
    const lonSegmentCount = 360 / degreeSegment;
    let color = new THREE.Color(0xffffff);

    let years = tempsAnomalyYearly.map(year => {
        const grid = d3.nest()
            .key(d => d.lat)
            .key(d => d.lon)
            .rollup(d => d[0])
            .object(year)

        const heightScale = d3.scaleLinear()
            //.domain([0,d3.max(selectedMonth, d => d.value)])
            .domain([-3, 3])
            .range([1.2 * radius * 0.7, 1.2 * radius * 1.3])

        let geometry = new THREE.SphereBufferGeometry(1.2 * radius, lonSegmentCount, latSegmentCount);
        let position = geometry.attributes.position;
        let colors = [];
        for (var i = 0; i < position.count; i++) {
            const lat = ((latSegmentCount / 2) - Math.floor(i / (lonSegmentCount + 1))) * degreeSegment;
            const lon = (((i % (lonSegmentCount + 1)) - latSegmentCount) * degreeSegment) !== -180 ? (((i % (lonSegmentCount + 1)) - latSegmentCount) * degreeSegment) : 180;

            const value = grid[lat] && grid[lat][lon] ? grid[lat][lon].value : null;
            const distFromCenter = value ? heightScale(value) : 1.2 * radius;

            const newPos = vertex([lon, lat], distFromCenter)
            position.setXYZ(i, newPos.x, newPos.y, newPos.z);

            color.setStyle(value ? colorScale(value) : '#2a2a2a')//'#0a0a0a');
            colors.push(color.r, color.g, color.b);
        }
        return {
            date: year[0].date,
            position,
            colors: new THREE.Float32BufferAttribute(colors, 3)
        }
    })
    return years.filter(y => y.date);
}


function vertex([longitude, latitude], radius) {
    const lambda = longitude * Math.PI / 180;
    const phi = latitude * Math.PI / 180;
    return new THREE.Vector3(
        radius * Math.cos(phi) * Math.cos(lambda),
        radius * Math.sin(phi),
        -radius * Math.cos(phi) * Math.sin(lambda)
    );
}

height = 1152;

speed = 0.01;

totalAnimationTime = 20000;

radius = 10;

degreeSegment = 5;

// keeps track of the rotaions and rendering ? : no idea here
globeTemperatureMesh = {
    const latSegmentCount = 180 / degreeSegment;
    const lonSegmentCount = 360 / degreeSegment;
    let geometry = new THREE.SphereBufferGeometry(radius, lonSegmentCount, latSegmentCount);
    let position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;
    var colors = [];

    for( var i = 0; i<position.count; i++ ) {
    colors.push(1, 1, 1);
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

let material = new THREE.MeshBasicMaterial({
    color: 0xF5F5F5,
    vertexColors: true,
    flatShading: false
});

let mesh = new THREE.Mesh(geometry, material);
return mesh;
  }

world = (await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json")).json(); // loads the  globe point data from the json

landGeometry = topojson.feature(world, world.objects.land).features[0].geometry

land = {
    const mesh = topojson.mesh(world, world.objects.land);
    return wireframe(mesh, radius * 1.2, new THREE.LineBasicMaterial({
        color: 0x333333,
        opacity: 0.2,
    }));
}
legendMeshes = {
    const count = 100
    const legendScale = d3.scaleLinear()
        .range([-3, 3])
        .domain([0, count - 1])
    
    return d3.range(count).map(i => {
            const latSegmentCount = 180 / degreeSegment;
            const lonSegmentCount = 360 / degreeSegment;
            const geometry = new THREE.SphereBufferGeometry(radius, lonSegmentCount, latSegmentCount);
            let material = new THREE.MeshBasicMaterial({ color: colorScale(legendScale(i)) });

            return new THREE.Mesh(geometry, material);
        })
}

world = (await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json")).json();

landGeometry = topojson.feature(world, world.objects.land).features[0].geometry

land = {
    const mesh = topojson.mesh(world, world.objects.land);
    return wireframe(mesh, radius * 1.2, new THREE.LineBasicMaterial({
        color: 0x333333,
        opacity: 0.2,
    }));
}



yearlyTemparatureMesh = yearlyAttributes.map(year => {
    const latSegmentCount = 180 / degreeSegment;
    const lonSegmentCount = 360 / degreeSegment;
    let geometry = new THREE.SphereBufferGeometry(radius, lonSegmentCount, latSegmentCount);
    let position = geometry.getAttribute('position');
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(position, 3));

    let colors = geometry.attributes.color;
    let color = new THREE.Color(0xffffff);

    for (var i = 0; i < position.count * 3; i++) {
        position.array[i] = year.position.array[i]
        colors.array[i] = year.colors.array[i]
    }

    let material = new THREE.MeshBasicMaterial({
        color: 0xF5F5F5,
        vertexColors: true,
        flatShading: false,
    });

    let mesh = new THREE.Mesh(geometry, material);

    return {
        date: year.date,
        mesh
    };
})

scene = {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#212121');
    scene.add(land);
    scene.add(globeTemperatureMesh);
    legendMeshes.forEach((mesh, i) => {
        mesh.scale.set(0.1, 0.1, 0.1)
        mesh.position.set((i - (legendMeshes.length / 2)) * radius / legendMeshes.length * 1.8, -2 * radius, 0)
        scene.add(mesh);
    });
    yearlyTemparatureMesh.forEach((year, i) => {
        scene.add(year.mesh);
    });
    return scene
}

// Moves with the scene and cmaera and maintaine relative camera angle
camera = {
    const fov = 45;
    const aspect = width / height;
    const near = 10;
    const far = 200000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 60)
    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    return camera;
}

x = d3.scaleTime().domain([1890, 2020].map(year => new Date(`01-01-${year}`))).range([-3 / 4 * Math.PI, 3 / 4 * Math.PI])
yearAxis = g => g.attr("font-family", "sans-serif").attr("font-size", 10).call(g => g.selectAll("g").data(x.ticks()).join("g").each((d, i) => d.id = DOM.uid("year")).call(g => g.append("path").attr("stroke", "white").attr("stroke-opacity", 0.8).attr("d", d => `M${d3.pointRadial(x(d), innerRadius)}L${d3.pointRadial(x(d), innerRadius + 8)}`))
    .call(g => g.append("path")
        .attr("id", d => d.id.id)
        .datum(d => [d, d3.utcYear.offset(d, 10)])
        .attr("fill", "none")
        .attr("d", ([a, b]) => `
              M${d3.pointRadial(x(a), innerRadius)}
              A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
            `))
    .call(g => g.append("text")
        .append("textPath")
        .attr("startOffset", 6)
        .attr("xlink:href", d => d.id.href)
        .attr("fill", "white")
        .text(d => d.getFullYear())))

innerRadius = width * 0.44

// Following function animates everything and throws it on the page
function animate(progress) {
    const time = progress * totalAnimationTime
    const yearIndex = Math.floor(progress * yearlyAttributes.length);
    const yearProgress = (progress * yearlyAttributes.length) % 1;

    //console.log(progress, yearIndex, yearProgress)

    //updating middle mesh
    let position = globeTemperatureMesh.geometry.getAttribute('position');
    let colors = globeTemperatureMesh.geometry.attributes.color;
    let color = new THREE.Color(0xffffff);

    const selectedYearAttributes = yearlyAttributes[Math.min(yearlyAttributes.length - 1, yearIndex)]

    var te = d3.easeCubic(yearProgress);
    for (var i = 0; i < position.count * 3; i++) {
        position.array[i] = ((1 - te) * (position.array[i] || 0)) + (te * selectedYearAttributes.position.array[i])
        colors.array[i] = ((1 - te) * (colors.array[i] || 0)) + (te * selectedYearAttributes.colors.array[i])
    }

    land.rotation.y = -time * speed
    globeTemperatureMesh.rotation.y = -time * speed

    // updating small multiples
    const angleScale = d3.scaleLinear()
        .range([- 3 / 4 * Math.PI, 3 / 4 * Math.PI])
        .domain([0, yearlyTemparatureMesh.length])

    yearlyTemparatureMesh.forEach((year, i) => {
        const historyProgress = i >= (1.05 * progress * yearlyTemparatureMesh.length) ? 0 : Math.min(1, (1.05 * progress - (i * 1 / (yearlyTemparatureMesh.length))) / (5 / yearlyTemparatureMesh.length));
        const t = d3.easeCubic(historyProgress)
        const tScale = d3.easeLinear(historyProgress)
        year.mesh.scale.set(0.6 - (tScale * 0.5), 0.6 - (tScale * 0.5), 0.6 - (tScale * 0.5))
        year.mesh.rotation.y = -time * speed
        year.mesh.position.set(t * 2 * radius * Math.sin(angleScale(i)), t * 2 * radius * Math.cos(angleScale(i)), 0)
    })

    colors.needsUpdate = true;
    position.needsUpdate = true;
}


// Used to show scale and author's info on the site 
function legend(progress) {
    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .call(yearAxis);

    const yearIndex = Math.min(yearlyAttributes.length - 1, Math.floor(progress * yearlyAttributes.length));
    const year = yearlyTemparatureMesh[yearIndex].date;
    svg.append("text")
        .attr('class', 'year')
        .attr('x', 0)
        .attr('y', height * 0.35)
        .attr('font-size', 50)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(year)

    const degreeScale = d3.scaleLinear()
        .domain([-3, 3])
        .range([0, width * 0.36]);
    const degreeAxis = d3.axisBottom()
        .scale(degreeScale)
        .ticks(6)
        .tickFormat(d => d <= 0 ? `${d}°` : `+${d}°`);

    svg.append("g")
        .attr("transform", `translate(${-width * 0.18},${height * 0.43})`)
        .call(degreeAxis)
        .call(g => g.select(".domain").remove())
        .selectAll(".tick text")
        .style('fill', 'white')
        .style("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 10);

    svg.append("image")
        .attr("xlink:href", twitterLogo)
        .attr("x", width * 0.3)
        .attr("y", height * 0.45)
        .attr("width", 20)

    svg.append("text")
        .attr('x', width * 0.34)
        .attr('y', height * 0.465)
        .attr('font-size', 14)
        .attr('text-anchor', 'start')
        .attr('fill', 'white')
        .text('@karim_douieb')

    return svg.node();
}


// the following code renders the code on site maybe on the site too not sure here
renderer = {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    /*const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 100000;
    controls.enablePan = false;*/

    // postprocessing

    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    const params = {
        exposure: 1,
        bloomStrength: 0.4,
        bloomThreshold: 0.4,
        bloomRadius: 0.5
    };

    let bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    composer.addPass(bloomPass)
    let time = 0;
    const ease = d3.easeQuadInOut
    while(true) {
        const progress = ease((time % totalAnimationTime) / totalAnimationTime) * 1.03
        animate(progress)
        composer.render();
        await Promises.delay(10, time += 10);
        let html_render = html`
        <div style="position: relative; overflow: hidden;">
          ${composer.renderer.domElement}
          <div style="position: absolute; pointer-events: none; top: 0; left: 0; color: white;"> 
            ${legend(progress)}
          </div>
            </div>`
        yield html_render;
    }
}
