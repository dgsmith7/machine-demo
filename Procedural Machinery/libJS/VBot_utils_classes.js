const GeometryDetail = {
    TRI: 3,
    QUAD: 4,
    PENT: 5,
    HEX: 6,
    HEP: 7,
    OCT: 8,
    DEC: 10,
    DODEC: 12,
    TETRA: 13,
    CUBE: 14,
    OCTA: 15,
    ICOSA: 16,
    DODECA: 17,
    SPHERE_LOW: 18,
    SPHERE_MED: 19,
    SPHERE_HIGH: 20,
    SPHERE_SUPERHIGH: 21,
    SPHERE_SUPERDUPERHIGH: 22
}


class VerletNode extends THREE.Mesh {



    constructor(pos, radius, color, geomDetail, isNodeVisible) {
        let geom;
        let mat;
        switch (geomDetail) {
            case GeometryDetail.TRI:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.TRI);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.QUAD:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.QUAD);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.PENT:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.PENT);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.HEX:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.HEX);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.HEP:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.HEP);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.OCT:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.OCT);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.DEC:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.DEC);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.DODEC:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.DODEC);
                mat = new THREE.MeshBasicMaterial({ color: color });
                break;
            case GeometryDetail.TETRA:
                geom = new THREE.TetrahedronBufferGeometry(radius);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.CUBE:
                geom = new THREE.BoxBufferGeometry(radius, radius, radius);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.OCTA:
                geom = new THREE.OctahedronBufferGeometry(radius);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.ICOSA:
                geom = new THREE.IcosahedronBufferGeometry(radius);
                mat = new THREE.MeshPhongMaterial({ color: color, wireframe: true });
                // mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.DODECA:
                geom = new THREE.DodecahedronBufferGeometry(radius);
                break;
            case GeometryDetail.SPHERE_LOW:
                geom = new THREE.SphereBufferGeometry(radius, 8, 8);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.SPHERE_MED:
                geom = new THREE.SphereBufferGeometry(radius, 12, 12);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.SPHERE_HIGH:
                geom = new THREE.SphereBufferGeometry(radius, 18, 18);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.SPHERE_SUPERHIGH:
                geom = new THREE.SphereBufferGeometry(radius, 24, 24);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            case GeometryDetail.SPHERE_SUPERDUPERHIGH:
                geom = new THREE.SphereBufferGeometry(radius, 32, 32);
                mat = new THREE.MeshPhongMaterial({ color: color });
                break;
            default:
                geom = new THREE.CircleBufferGeometry(radius, GeometryDetail.TRI);
                mat = new THREE.MeshBasicMaterial({ color: color });
        }

        super(geom, mat); // needs to be called prior to using 'this'

        // console.log(geomDetail);
        if (geomDetail < 13) { // show backs of poly nodes
            let mat = this.material;// as THREE.MeshBasicMaterial;
            mat.side = THREE.DoubleSide;
        }
        this.radius = radius;
        this.color = color;
        this.isNodeVisible = isNodeVisible;
        this.position.set(pos.x, pos.y, pos.z);
        this.posOld = this.position.clone();
        this.isVerletable = true;
    }

    // Start motion with node offset
    moveNode(vec) {
        this.position.add(vec);
    }

    // Motion determined by position comparison between current and previus frames
    verlet() {
        if (this.isVerletable) {
            let posTemp1 = new THREE.Vector3(this.position.x, this.position.y, this.position.z);
            this.position.x += (this.position.x - this.posOld.x);
            this.position.y += (this.position.y - this.posOld.y);
            this.position.z += (this.position.z - this.posOld.z);
            this.posOld.copy(posTemp1);
        }
    }

    resetVerlet() {
        this.posOld = this.position.clone();
    }

    constrainBounds(bounds) {
        if (this.position.x > bounds.x / 2 - this.radius) {
            this.position.x = bounds.x / 2 - this.radius;
        } else if (this.position.x < -bounds.x / 2 + this.radius) {
            this.position.x = -bounds.x / 2 + this.radius;
        }

        if (this.position.y > bounds.y / 2 - this.radius) {
            this.position.y = bounds.y / 2 - this.radius;
        } else if (this.position.y < -bounds.y / 2 + this.radius) {
            this.position.y = -bounds.y / 2 + this.radius;
        }

        if (this.position.z > bounds.z / 2 - this.radius) {
            this.position.z = bounds.z / 2 - this.radius;
        } else if (this.position.z < -bounds.z / 2 + this.radius) {
            this.position.z = -bounds.z / 2 + this.radius;
        }

    }

    setIsVerletable(isVerletable) {
        this.isVerletable = isVerletable;
    }

    setNodeColor(color) {
        let mat = this.material;// as THREE.MeshBasicMaterial;
        mat.color = color;
    }

    setNodeAlpha(alpha) {
        let mat = this.material;// as THREE.MeshBasicMaterial;
        mat.transparent = true;
        mat.opacity = alpha;
    }

    // redundant and should probably be changed not adding/removing nodes to/from scene
    setNodeVisible(isNodeVisible) {
        let mat = this.material;// as THREE.MeshBasicMaterial;
        if (isNodeVisible) {
            mat.transparent = false;
            mat.opacity = 1.0;
        } else {
            mat.transparent = true;
            mat.opacity = 0.0;
        }

    }

}


class VerletStick extends THREE.Group {

    constructor(start, end, stickTension, anchorTerminal, isVisible) {
        super();
        this.start = start;
        this.end = end;
        this.len = this.start.position.distanceTo(this.end.position);
        this.stickTension = stickTension;
        this.anchorTerminal = anchorTerminal;
        this.isVisible = isVisible;

        this.lineGeometry = new THREE.BufferGeometry();
        this.lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(6, 3));

        this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xEEEEEE });
        this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
        this.lineMaterial.transparent = true;
        // this.lineMaterial.opacity = .65;
        this.add(this.line);
    }

    constrainLen() {
        // accuracy factor
        let accuracyCount = 1; //TO DO: make externally controllable eventually
        for (var i = 0; i < accuracyCount; i++) {
            let delta = new THREE.Vector3(
                this.end.position.x - this.start.position.x,
                this.end.position.y - this.start.position.y,
                this.end.position.z - this.start.position.z);
            let deltaLength = delta.length();

            // nodeConstrainFactors optionally anchor stick on one side
            let node1ConstrainFactor = 0.5;
            let node2ConstrainFactor = 0.5;

            if (this.anchorTerminal === 1) {
                node1ConstrainFactor = 0.0;
                node2ConstrainFactor = 1.0;
            }
            if (this.anchorTerminal === 2) {
                node1ConstrainFactor = 1.0;
                node2ConstrainFactor = 0.0;
            }
            if (this.anchorTerminal === 3) {
                node1ConstrainFactor = 0.0;
                node2ConstrainFactor = 0.0;
            }
            if (this.anchorTerminal === 4) {
                node1ConstrainFactor = .1;
                node2ConstrainFactor = .1;
            }
            let difference = ((deltaLength - this.len) / deltaLength);
            this.start.position.x += delta.x * (node1ConstrainFactor * this.stickTension * difference);
            this.start.position.y += delta.y * (node1ConstrainFactor * this.stickTension * difference);
            this.start.position.z += delta.z * (node1ConstrainFactor * this.stickTension * difference);
            this.end.position.x -= delta.x * (node2ConstrainFactor * this.stickTension * difference);
            this.end.position.y -= delta.y * (node2ConstrainFactor * this.stickTension * difference);
            this.end.position.z -= delta.z * (node2ConstrainFactor * this.stickTension * difference);
        }

        //update verlet stick
        this.lineGeometry.attributes.position.needsUpdate = true;
        this.lineGeometry.attributes.position.setXYZ(0, this.start.position.x, this.start.position.y, this.start.position.z);
        this.lineGeometry.attributes.position.setXYZ(1, this.end.position.x, this.end.position.y, this.end.position.z);

        if (!this.isVisible) {
            // this.line.visible = false;
        }
    }

    setColor(color) {
        this.lineMaterial.color = color;
    }

    setOpacity(alpha) {
        this.lineMaterial.opacity = alpha;
    }

    setVisibility(isVisible) {
        this.isVisible = isVisible;
    }
    reinitializeLen() {
        this.len = this.start.position.distanceTo(this.end.position);
    }
}

//utils
// reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}