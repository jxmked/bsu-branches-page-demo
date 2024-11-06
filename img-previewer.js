// This object will create a canvas element that display the specific img but enlarged.
// The enlarge image will occupy the entire or desired screen size and overlay other elements.
// It can also do zoom in or out and also a close button and/or use esc key to close.
// May also able to download the image but I would think it well about it...

/**
 *
 * @param {Dim2} oldDim
 * @param {Object.<string, Number>} newDim
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
    this.img_src = src;
    this.target_parent_node = parent_node;

    this.load_src_img().then(function (result) {
      console.log(result.width, result.height);
    });

    /**
     * @readonly
     * @type {HTMLCanvasElement}
     */
    this.CANVAS = document.createElement("canvas");
    this.CANVAS.width = this.CANVAS.width * 2;
    this.CANVAS.height = this.CANVAS.height * 2;

    this.CANVAS.classList.add("_img_previewer_element_xio");

    /**
     * @readonly
     * @type {CanvasRenderingContext2D}
     */
    this.CTX = this.CANVAS.getContext("2d");

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
  }

  loop() {
    const ctx = this.CTX;
    const canvas = this.CANVAS;

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
