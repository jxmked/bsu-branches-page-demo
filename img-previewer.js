// This object will create a canvas element that display the specific img but enlarged.
// The enlarge image will occupy the entire or desired screen size and overlay other elements.
// It can also do zoom in or out and also a close button and/or use esc key to close.
// May also able to download the image but I would think it well about it...

function rescaleDim(oldDim, newDim) {
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
  constructor(src, parent_node) {
    this.img_src = src;
    this.target_parent_node = parent_node;

    this.load_src_img().then(function (result) {
      console.log(result.width, result.height);
    });

    this.CANVAS = document.createElement("canvas");
    this.CANVAS.width = this.CANVAS.width * 2;
    this.CANVAS.height = this.CANVAS.height * 2;

    this.CANVAS.classList.add("_img_previewer_element_xio");

    this.CTX = this.CANVAS.getContext("2d");
  }

  open_canvas(img) {
    const ctx = this.CTX;
    const canvas = this.CANVAS;

    const reso = { w: canvas.width, h: canvas.height };

    ctx.clearRect(0, 0, reso.w, reso.h);

    ctx.drawImage();
  }

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
