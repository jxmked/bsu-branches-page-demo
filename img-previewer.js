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
   * @type {{width: Number,height: Number}}}
   */
  static btn_dimension = { width: 100, height: 100 };

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
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  get img_canvas() {
    return this.canvas;
  }

  /**
   * This function creates an X button to be display.
   * Instead of using an actual picture, We have created\
   * the image using SVG path.
   */
  show_close_btn() {
    const { canvas, ctx } = this;

    const btn_dimension = ImagePreviewer.btn_dimension;

    const { width, height } = canvas;
    const pos_x = width * 0.9 - btn_dimension.width / 2;
    const pos_y = height * 0.1 - btn_dimension.height / 2;

    const close_btn_container = new Path2D(
      "M20 0h60q20 0 20 20v60q0 20-20 20H20Q0 100 0 80V20Q0 0 20 0z"
    );
    const close_btn_cross = new Path2D("m15 15 70 70m0-70L15 85");

    ctx.save();

    ctx.translate(pos_x, pos_y);
    ctx.scale(0.32, 0.32);

    ctx.fillStyle = "rgb(199, 199, 204)";
    ctx.fill(close_btn_container);

    ctx.strokeStyle = "rgb(44, 44, 46)";
    ctx.lineWidth = 1;
    ctx.stroke(close_btn_container);

    ctx.strokeStyle = "rgb(44, 44, 46)";
    ctx.lineWidth = "7";
    ctx.stroke(close_btn_cross);

    ctx.restore();
  }

  /**
   * This function check whether the clicks where done inside of
   * an X image and return boolean if does.
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Boolean}
   */
  is_close_checked(x, y) {
    const { canvas } = this;
    const btn_dimension = ImagePreviewer.btn_dimension;

    const { width, height } = canvas;

    const pos_x = width * 0.9 - btn_dimension.width / 2;
    const pos_y = height * 0.1 - btn_dimension.height / 2;

    if (!(x >= pos_x && x <= pos_x + btn_dimension.width / 2)) {
      return false;
    }

    if (!(y >= pos_y && y <= pos_y + btn_dimension.height / 2)) {
      return false;
    }

    return true;
  }

  clear() {
    this.canvas.remove();
  }

  /**
   * This function performs getting the image from source
   * and rendering it into canvas.
   */
  display() {
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

      self.place_image(
        img,
        image_vec,
        {
          x: w / 2,
          y: h / 2,
        },
        1
      );

      // ctx.save();

      // const half_iw = image_vec.width / 2;
      // const half_ih = image_vec.height / 2;
      // const half_cw = w / 2;
      // const half_ch = h / 2;

      // ctx.drawImage(
      //   img,
      //   half_cw - half_iw,
      //   half_ch - half_ih,
      //   image_vec.width,
      //   image_vec.height
      // );

      // ctx.restore();

      self.target_parent_node.appendChild(self.canvas);

      self.show_close_btn();
    });
  }

  /**
   *
   * @param {Image} img
   * @param {Dim2} size
   * @param {Vec2} pos
   * @param {Vec2} scale
   */
  place_image(img, size, pos, scale) {
    const ctx = this.ctx;

    const half_size = {
      width: size.width * 0.5,
      height: size.height * 0.5,
    };

    ctx.save();

    ctx.translate(pos.x - half_size.width, pos.y - half_size.height);

    ctx.scale(scale, scale);

    ctx.drawImage(img, 0, 0, size.width, size.height);

    ctx.restore();
  }

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
