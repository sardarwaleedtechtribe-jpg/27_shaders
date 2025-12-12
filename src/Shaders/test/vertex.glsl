        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;

        attribute vec3 position;

        uniform vec2 uFrequency;

        uniform float uTime;

        attribute vec2 uv;
        varying vec2 vUv;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position,1.0);

                // Compute wave elevation
            float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
            elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

            modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
            modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

            // modelPosition.y *=0.6;


            // modelPosition.y-= uTime;

            vec4 ViewPosition  = viewMatrix * modelPosition;
            vec4 projectPosition = projectionMatrix * ViewPosition;

            gl_Position = projectPosition;
            vUv = uv; // send UVs to fragment shader

        }
