        precision mediump float;

        uniform vec3 uColor;      
       
       uniform sampler2D uTexture;
        varying vec2 vUv;   
        

        void main()
        {
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                                  //r,   g,   b,   alpha
            // vec4 textureColor = texture2D(uTexture,1.0);
            vec4 textureColor = texture2D(uTexture, vUv); // pick color from texture
            gl_FragColor = textureColor;
        }
