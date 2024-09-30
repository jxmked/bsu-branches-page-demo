(async function (w, feed_url) {
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

  w.addEventListener("DOMContentLoaded", async function () {
    const feed_data = await load_feed(feed_url);

    const frag = new DocumentFragment();
    let index = 0;

    let ival = setInterval(function () {
      if (index >= feed_data.length) {
        clearInterval(ival);
        return;
      }

      const data = feed_data[index];
      const item = create_campus_item(data);

      setTimeout(() => {
        item.classList.add("visible-now");
      }, 200);

      document.querySelector("#campus-list-selection").appendChild(item);

      index++;
    }, 100);
  });
})(window, "feed.json");
