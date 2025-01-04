(function (w, feed_url) {
  /**
   * Load campuses to be display
   *
   * @param {string} feed_url
   * @returns {Promise.<Array.<FeedData>>}
   * @throws {Error}
   */
  async function load_feed(feed_url) {
    /**
     * @type {fetch}
     */
    const res = await fetch(`./${feed_url}`, {
      method: "GET",
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("Unable to read feed right now. :(");
  }

  /**
   *
   * @param {FeedData} feed_data_item
   * @param {Function} click_callback
   * @returns {HTMLLIElement}
   */
  function create_campus_item(feed_data_item, click_callback) {
    /**
     * We're placing all things as a list item
     *
     * @type {HTMLLIElement}
     */
    const li = document.createElement("li");

    /**
     * This will be the title of the item. The campus name
     *
     * @type {HTMLHeadingElement}
     */
    const h5 = document.createElement("h5");

    /**
     * This will be the address of the campus
     *
     * @type {HTMLParagraphElement}
     */
    const p = document.createElement("p");

    h5.innerText = feed_data_item.branch_name;
    p.innerText = feed_data_item.address;

    li.appendChild(h5);
    li.appendChild(p);

    // If we have ready callback, why not all it when needed
    if (click_callback) li.addEventListener("click", click_callback);

    li.classList.add("on-animate");

    return li;
  }

  function getBoundedPosition(canvas, { x, y }) {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const dx = ((x - left) / width) * canvas.width;
    const dy = ((y - top) / height) * canvas.height;

    return { x: dx, y: dy };
  }

  w.addEventListener("DOMContentLoaded", async function () {
    /**
     * @type {Array.<FeedData>}
     */
    const feed_data = await load_feed(feed_url);

    /**
     * @type {HTMLDivElement}
     */
    const campus_container = document.getElementById("campus-prev-container");

    /**
     * @type {Number}
     */
    let index = 0;

    /**
     * @type {Array.<ReturnType.<create_campus_item>>}
     */
    const list_items = [];

    /**
     * We will storing campus data here to be use later
     *
     * @type {DocumentFragment}
     */
    const frag = new DocumentFragment();

    /**
     * Here we're storing list item for selection
     *
     * @type {Array.<ReturnType.<CreatePreview.element>>}
     */
    const prev_selection_list = new Array(feed_data.length);

    /**
     * We use interval instead of single thread loop
     * to allow us to display the current created list item
     *
     * @type {ReturnType.<setInterval>}
     */
    let ival = setInterval(function () {
      if (index >= feed_data.length) {
        clearInterval(ival);
        campus_container.appendChild(frag);

        return;
      }

      /**
       * We keep the current index with its item.
       * If we use the index variable outside this
       * function it cause to use the updated and wrong index
       * instead of the index we used for each element.
       *
       * @type {typeof index}
       */
      let cur_index = index;

      /**
       * @type {FeedData}
       */
      const data = feed_data[cur_index];

      /**
       * @type {ReturnType.<create_campus_item>}
       */
      const item = create_campus_item(data);
      list_items[cur_index] = item;

      /**
       * @type {CreatePreview}
       */
      const createPrev = new CreatePreview(data).render();

      createPrev.hero_prev_callback = function () {
        const img_prev = new ImagePreviewer(
          `./assets/branches-img/${data.branch_hero}`,
          document.body
        );

        img_prev.display();

        /**
         *
         * @param {MouseEvent} evt
         */
        function close_image_viewer_up(evt) {
          const { clientX, clientY } = evt;

          const actual_mouse_position = getBoundedPosition(img_prev.img_canvas, {
            x: clientX,
            y: clientY,
          });
          if (
            img_prev.is_close_checked(actual_mouse_position.x, actual_mouse_position.y)
          ) {
            img_prev.clear();
          }

          w.removeEventListener("keyup", close_image_viewer_up);
        }
        w.addEventListener("mouseup", close_image_viewer_up);

        const touch_movement = { clientX: 0, clientY: 0 };

        /**
         * @function
         * @inner
         * @param {TouchEvent} evt
         */
        w.addEventListener("touchstart", function (evt) {
          Object.assign(touch_movement, evt.touches[0]);
        });

        /**
         * @function
         * @inner
         * @param {TouchEvent} evt
         */
        w.addEventListener("touchmove", function (evt) {
          if (evt.touches[0] !== void 0) {
            Object.assign(touch_movement, evt.touches[0]);
            return;
          }
        });

        w.addEventListener("touchend", function (evt) {
          close_image_viewer_up(touch_movement);
        });
      };

      prev_selection_list[cur_index] = createPrev.element;

      prev_selection_list[cur_index].classList.add("hidden");
      frag.appendChild(prev_selection_list[cur_index]);

      setTimeout(() => {
        item.classList.add("visible-now");

        // Set the click event if we can see it...
        item.addEventListener("click", function () {
          // Skip already selected
          if (item.classList.contains("selected")) return;

          // Reset all
          list_items.forEach((i, y) => {
            i.classList.remove("selected");
            prev_selection_list[y].classList.add("hidden");
          });

          campus_container.classList.remove("campus-prev-idle");
          prev_selection_list[cur_index].classList.remove("hidden");

          item.classList.add("selected");
        });
      }, 200);

      document.querySelector("#campus-list-selection").appendChild(item);

      index++;
    }, 100);
  });
})(window, "feed.json");
