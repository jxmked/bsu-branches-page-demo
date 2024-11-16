// This object will create a canvas element that display the specific img but enlarged.
// The enlarge image will occupy the entire or desired screen size and overlay other elements.
// It can also do zoom in or out and also a close button and/or use esc key to close.
// May also able to download the image but I would think it well about it...

/**
 *
 * @param {Dim2} oldDim
 * @param {Object.<String, Number>} newDim
 * @returns {Dim2}
 */
function rescaleDim(oldDim, newDim) {
  /**
   * @type {Dim2}
   */
  const filledDim = {
    width: 0,
    height: 0,
  };

  if ("width" in newDim) {
    filledDim.width = newDim.width;
    filledDim.height = (oldDim.height / oldDim.width) * newDim.width;
  } else if ("height" in newDim) {
    filledDim.height = newDim.height;
    filledDim.width = (oldDim.width * newDim.height) / oldDim.height;
  }

  return filledDim;
}

class ImagePreviewer {
  /**
   *
   * @param {string} src
   * @param {HTMLElement} parent_node
   */
  constructor(src, parent_node) {
    /**
     * @readonly
     * @type {typeof src}
     */
    this.img_src = src;

    /**
     * @readonly
     * @type {typeof parent_node}
     */
    this.target_parent_node = parent_node;

    /**
     * @readonly
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;

    this.canvas.classList.add("_img_previewer_element_xio");

    /**
     * @readonly
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext("2d");

    /**
     * @type {{size: Number,pos: Vec2}}
     */
    this.img_props = {
      size: 1,
      pos: {
        // From center
        x: 0,
        y: 0,
      },
    };

    /**
     * @readonly
     * @type {ImagePreviewer}
     */
    const self = this;

    this.load_src_img().then(function (img) {
      const { width, height } = img;
      const { width: cw, height: ch } = self.canvas;

      /**
       * @type {Dim2}
       */
      const image_vec = Object.assign({}, { width, height });

      if (cw > ch) {
        Object.assign(image_vec, rescaleDim(image_vec, { height: ch * 0.9 }));
      } else {
        Object.assign(image_vec, rescaleDim(image_vec, { width: cw * 0.9 }));
      }

      const ctx = self.ctx;

      const { ch: h, cw: w } = { ch, cw };

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, w, h);

      ctx.save();

      const half_iw = image_vec.width / 2;
      const half_ih = image_vec.height / 2;
      const half_cw = w / 2;
      const half_ch = h / 2;

      console.log(half_ch - half_ih, half_cw, half_ih, half_iw);

      ctx.fillStyle = "red";
      ctx.arc(half_cw - half_iw, half_ch, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.drawImage(
        img,
        half_cw - half_iw,
        half_ch - half_ih,
        image_vec.width,
        image_vec.height
      );

      ctx.restore();

      self.target_parent_node.appendChild(self.canvas);
    });
  }

  loop() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   *
   * @param {Image} img
   * @param {Number} size
   * @param {Vec2} pos
   * @param {Vec2} scale
   */
  place_image(img, size, pos, scale) {
    const ctx = this.ctx;

    const half_size = {
      x: size.x * 0.5,
      y: size.y * 0.5,
    };

    ctx.save();

    ctx.translate(pos.x - half_size.x, pos.y - half_size.y);

    ctx.scale(scale, scale);

    ctx.drawImage(img, 0, 0, size.x, size.y);

    ctx.restore();
  }

  open_canvas(img) {}

  /**
   *
   * @returns {Promise.<Image>}
   */
  load_src_img() {
    const self = this;

    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = self.img_src;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = reject;
    });
  }
}
