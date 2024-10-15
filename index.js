(function (w, feed_url) {
  async function load_feed(feed_url) {
    const res = await fetch(`./${feed_url}`, {
      method: "GET",
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("Unable to read feed right now. :(");
  }

  function create_campus_item(feed_data_item, click_callback) {
    const li = document.createElement("li");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");

    h5.innerText = feed_data_item.branch_name;
    p.innerText = feed_data_item.address;

    li.appendChild(h5);
    li.appendChild(p);

    li.addEventListener("click", click_callback);
    li.classList.add("on-animate");

    return li;
  }

  function list_item_click_event() {}

  w.addEventListener("DOMContentLoaded", async function () {
    const feed_data = await load_feed(feed_url);

    const campus_container = document.getElementById("campus-prev-container");

    let index = 0;

    const list_items = [];

    const frag = new DocumentFragment();
    const prev_selection_list = new Array(feed_data.length);

    let ival = setInterval(function () {
      if (index >= feed_data.length) {
        clearInterval(ival);
        campus_container.appendChild(frag);

        return;
      }

      let cur_index = index;

      const data = feed_data[cur_index];

      const item = create_campus_item(data);
      list_items[cur_index] = item;

      const createPrev = new CreatePreview(data).render();
      createPrev.hero_prev_callback = function () {
        const imgPrevr = new ImagePreviewer(`./assets/branches-img/${data.branch_hero}`, document.body);
        
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
